import net from "net";

const server = net.createServer();

server.listen(5050, "127.0.0.1");

server.on("connection", function (sock) {
    sock.on("data", function (data) {
        console.log("Received data event with: " + data);
    });
});
