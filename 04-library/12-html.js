const http = require("http");
const { getAcceptedTypes, resJson, resText, resHtml } = require("./utils");

const host = "127.0.0.1";
const port = 3000;

const library = {
    message: "Benvenuto nella biblioteca HTTP",
    books: [
        { author: "Felix Martin", title: "Denaro" },
        {
            author: "Yanis Varoufakis",
            title: "È l'economia che cambia il mondo",
        },
        { author: "Yanis Varoufakis", title: "Adulti nella stanza" },
        { author: "Naomi Klein", title: "Shock economy" },
        { author: "Serge Latouche", title: "L'invenzione dell'economia" },
        { author: "Thomas Piketty", title: "Il capitale nel XXI secolo" },
    ],
};

function findBooks(q) {
    if (q) {
        return library.books.filter(
            (b) => b.author.includes(q) || b.title.includes(q)
        );
    } else {
        return library.books;
    }
}

function htmlLayout(title, body) {
    return `
<!doctype html>
<html lang="it">
  <head>
    <meta charset="utf-8">
    <title>${title}</title>
  </head>
  <body>
    ${body}
  </body>
</html>`;
}

const routes = {
    "/": {
        getText: () => library.message,
        getJson: () => {
            return JSON.stringify({ message: library.message });
        },
        getHtml: function () {
            return htmlLayout(
                library.message,
                `<h1>${library.message}</h1><a href="/books">Libri</a>`
            );
        },
    },
    "/books": {
        getText: (q) => {
            return findBooks(q).reduce((acc, cur) => {
                acc += `${cur.author} - ${cur.title}\n`;
                return acc;
            }, "");
        },
        getJson: (q) => {
            return JSON.stringify(findBooks(q));
        },
        getHtml: function (q) {
            const booksLi = findBooks(q)
                .map((b) => `<li>${b.author} - ${b.title}</li>`)
                .join(" ");
            return htmlLayout(
                "Libri",
                `<ul>${booksLi}</ul>
        <a href="/">Home</a>`
            );
        },
    },
};

const server = http.createServer((req, res) => {
    const { pathname, searchParams } = new URL(
        req.url,
        `http://${req.headers.host}`
    );

    const route = routes[pathname];
    if (!route) {
        res.statusCode = 404;
        res.end();
        return;
    }

    if (req.method === "HEAD") {
        res.statusCode = 204;
        res.end();
    } else if (req.method === "GET") {
        const accepts = getAcceptedTypes(req);
        const q = searchParams.get("q");

        if (accepts.textHtml || accepts.any) {
            resHtml(res, route.getHtml(q));
        } else if (accepts.json) {
            resJson(res, route.getJson(q));
        } else if (accepts.textPlain || accepts.text) {
            resText(res, route.getText(q));
        } else {
            res.statusCode = 406;
            res.end();
        }
    } else {
        res.statusCode = 405;
        res.end();
    }
});

server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
});
