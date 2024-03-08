const net = require("net");
const { inspect } = require("util");
const { Buffer } = require("buffer");

const port = 5050;
const host = "127.0.0.1";

const server = net.createServer();

server.listen(port, host, () => {
    console.log(`TCP server running at ${host} on port ${port}`);
});

server.on("connection", function (sock) {
    sock.on("data", function (data) {
        sock.write(`Received ${inspect(data)}\n`);
        if (data.equals(Buffer.from("ping\x0d\x0a", "utf-8"))) {
            sock.write("data matches ping\\x0d\\x0a\n");
        }
        if (data.equals(Buffer.from("ping\r\n", "utf-8"))) {
            sock.write("data matches ping\\r\\n\n");
        }
    });
});
