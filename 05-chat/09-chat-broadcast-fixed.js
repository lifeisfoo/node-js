const net = require("net");
const { isSameSocket } = require("./chat-utils");
const port = 5050;
const host = "127.0.0.1";

const server = net.createServer();
server.listen(port, host, () => {
    console.log("TCP Server is running on port " + port + ".");
});

let sockets = [];
server.on("connection", function (sock) {
    console.log(`CONNECTED:  ${sock.remoteAddress}:${sock.remotePort}`);
    sockets.push(sock);
    sock.on("data", function (data) {
        const sender = `${sock.remoteAddress}:${sock.remotePort}`;
        sockets.forEach((s) => {
            if (!isSameSocket(s, sock)) {
                s.write(`<${sender}> ${data}`);
            }
        });
    });
});
