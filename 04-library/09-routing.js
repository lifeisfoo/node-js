const http = require("http");
const { getAcceptedTypes, resJson, resText } = require("./utils");

const host = "127.0.0.1";
const port = 3000;

const library = {
    message: "Benvenuto nella biblioteca HTTP",
    books: [
        { author: "Naomi Klein", title: "Shock economy" },
        { author: "Serge Latouche", title: "L'invenzione dell'economia" },
        {
            author: "Yanis Varoufakis",
            title: "È l'economia che cambia il mondo",
        },
    ],
};

const routes = {
    "/": {
        getText: () => library.message,
        getJson: function () {
            return JSON.stringify({ message: library.message });
        },
    },
    "/books": {
        getText: () =>
            library.books.reduce((acc, cur) => {
                acc += `${cur.author} - ${cur.title}\n`;
                return acc;
            }, ""),
        getJson: function () {
            return JSON.stringify(library.books);
        },
    },
};

const server = http.createServer((req, res) => {
    const route = routes[req.url];
    if (!route) {
        res.statusCode = 404;
        res.end();
        return;
    }

    const accepts = getAcceptedTypes(req);
    if (accepts.json) {
        resJson(res, route.getJson());
    } else if (accepts.textPlain || accepts.text || accepts.any) {
        resText(res, route.getText());
    } else {
        res.statusCode = 406;
        res.end();
    }
});

server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
});
