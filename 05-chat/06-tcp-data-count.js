const net = require("net");

const port = 5050;
const host = "127.0.0.1";

const server = net.createServer();

server.listen(port, host, () => {
    console.log(`TCP server running at ${host} on port ${port}`);
});

let dataCount = 0;
server.on("connection", function (sock) {
    sock.on("data", function (data) {
        dataCount++;
        console.log(
            `dataCount is ${dataCount} and data contains ${data.byteLength} bytes`
        );
    });
});
