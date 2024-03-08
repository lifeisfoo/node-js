import { hrtime } from "process";

function generateLogString(req, res, pathname, startTime) {
    const endTime = hrtime.bigint();
    const duration = (endTime - startTime) / BigInt(1e6);
    const timestamp = new Date().toISOString();
    const ip = req.socket.remoteAddress;
    const httpDetails = `"${req.method} ${pathname}" ${res.statusCode}`;
    return `${ip} - ${timestamp} ${httpDetails} - ${duration}ms`;
}

export { generateLogString };
