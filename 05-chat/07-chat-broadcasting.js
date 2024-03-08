const net = require("net");
const port = 5050;
const host = "127.0.0.1";

const server = net.createServer();
server.listen(port, host, () => {
    console.log("TCP Server is running on port " + port + ".");
});

let sockets = [];
server.on("connection", function (sock) {
    sockets.push(sock);
    sock.on("data", function (data) {
        sockets.forEach((sock) => sock.write(data));
    });
});
