const net = require("net");
const {
    broadcastMessage,
    getSocketsExcluding,
    removeCRLF,
    socketToId,
    colorGrey,
    colorGreen,
    parseNickMessage,
    parsePvtMessage,
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
function getSocketByName(sockets, name) {
    return sockets.find((s) => getName(s) === name);
}

function processMessage(sock, message) {
    const cleanMsg = removeCRLF(message);

    if (cleanMsg.startsWith("/nick ") /* space intended*/) {
        const oldName = getName(sock);
        const name = parseNickMessage(cleanMsg);
        setName(sock, name);
        broadcastMessage(
            sockets,
            `${colorGrey(`${oldName} is now ${name}`)}\n`
        );
    } else if (cleanMsg.startsWith("/pvt ") /* space intended*/) {
        const [receiver, pvtMsg] = parsePvtMessage(cleanMsg);
        const receiverSock = getSocketByName(sockets, receiver);
        const preMsg = colorGreen(`(pvt msg from ${getName(sock)})`);
        receiverSock.write(`${preMsg} ${pvtMsg}\n`);
    } else if (cleanMsg === "/list") {
        const preMsg = colorGrey(`(only visible to you)`);
        const usersString = sockets.map(getName).join(",");
        sock.write(`${preMsg} Users are: ${usersString}\n`);
    } else {
        broadcastMessage(
            getSocketsExcluding(sockets, sock),
            `<${getName(sock)}> ${cleanMsg}\n`
        );
    }
}
const joinedMessage = (sock) =>
    `${colorGrey(`${getName(sock)} joined the chat`)}\n`;
const leftMessage = (sock) =>
    `${colorGrey(`${getName(sock)} left the chat`)}\n`;

server.on("connection", function (sock) {
    console.log(`CONNECTED:  ${socketToId(sock)}`);

    sockets.push(sock);
    setName(sock, socketToId(sock));
    broadcastMessage(sockets, joinedMessage(sock));

    sock.on("data", function (data) {
        processMessage(sock, data.toString());
    });

    sock.on("close", function () {
        sockets = getSocketsExcluding(sockets, sock);
        broadcastMessage(sockets, leftMessage(sock));
        console.log("CLOSED: " + socketToId(sock));
    });
});
