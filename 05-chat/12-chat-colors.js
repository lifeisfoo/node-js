const net = require("net");
const {
    broadcastMessage,
    getSocketsExcluding,
    removeCRLF,
    socketToId,
    colorGrey,
} = require("./chat-utils");
const port = 5050;
const host = "127.0.0.1";

const server = net.createServer();
server.listen(port, host, () => {
    console.log("TCP Server is running on port " + port + ".");
});

let sockets = [];
let namesMap = {};

function setName(sock, name) {
    namesMap[socketToId(sock)] = name;
}
function getName(sock) {
    return namesMap[socketToId(sock)];
}

function processMessage(sock, message) {
    const cleanMsg = removeCRLF(message);

    if (cleanMsg.startsWith("/nick ") /* space intended*/) {
        const oldName = getName(sock);
        const [_, name] = cleanMsg.split(" ");
        setName(sock, name);
        broadcastMessage(
            sockets,
            `${colorGrey(`${oldName} is now ${name}`)}\n`
        );
    } else {
        broadcastMessage(
            getSocketsExcluding(sockets, sock),
            `<${getName(sock)}> ${cleanMsg}\n`
        );
    }
}

server.on("connection", function (sock) {
    console.log(`CONNECTED:  ${socketToId(sock)}`);

    sockets.push(sock);
    setName(sock, socketToId(sock));

    sock.on("data", function (data) {
        processMessage(sock, data.toString());
    });
});
