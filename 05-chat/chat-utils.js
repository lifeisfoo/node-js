function isSameSocket(s1, s2) {
    return (
        s1.remoteAddress === s2.remoteAddress && s1.remotePort === s2.remotePort
    );
}
function broadcastMessage(sockets, message) {
    sockets.forEach((sock) => sock.write(message));
}
function getSocketsExcluding(sockets, sock) {
    return sockets.filter((s) => !isSameSocket(s, sock));
}
function removeCRLF(str) {
    return str.replace(/[\r\n]+$/, "");
}
function socketToId(sock) {
    return `${sock.remoteAddress}:${sock.remotePort}`;
}
function colorGrey(str) {
    return `\x1b[97;100m${str}\x1b[0m`;
}
function colorGreen(str) {
    return `\x1b[97;42m${str}\x1b[0m`;
}
function parsePvtMessage(msg) {
    const [_, receiver, ...rest] = msg.split(" ");
    const pvtMsg = rest.join(" ");
    return [receiver, pvtMsg];
}
function parseNickMessage(msg) {
    const [_, name] = msg.split(" ");
    return name;
}

module.exports = {
    isSameSocket,
    broadcastMessage,
    getSocketsExcluding,
    removeCRLF,
    socketToId,
    colorGrey,
    colorGreen,
    parseNickMessage,
    parsePvtMessage,
};
