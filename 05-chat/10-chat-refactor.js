const net = require("net");
const {
    broadcastMessage,
    getSocketsExcluding,
    removeCRLF,
} = require("./chat-utils");
const port = 5050;
const host = "127.0.0.1";

const server = net.createServer();
server.listen(port, host, () => {
    console.log("TCP Server is running on port " + port + ".");
});

let sockets = [];

function processMessage(sock, message) {
    const cleanMsg = removeCRLF(message);
    const sender = `${sock.remoteAddress}:${sock.remotePort}`;
    broadcastMessage(
        getSocketsExcluding(sockets, sock),
        `<${sender}> ${cleanMsg}\n`
    );
}

server.on("connection", function (sock) {
    console.log(`CONNECTED:  ${sock.remoteAddress}:${sock.remotePort}`);
    sockets.push(sock);
    sock.on("data", function (data) {
        processMessage(sock, data.toString());
    });
});
