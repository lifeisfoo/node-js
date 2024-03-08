const types = {
    "text/html": ["html", "htm"],
    "text/plain": ["txt", "text"],
    "text/css": ["css"],
    "application/javascript": ["js", "mjs"],
    "application/json": ["json"],
    "image/jpeg": ["jpeg", "jpg"],
    "image/x-icon": ["ico"],
    "image/avif": ["avif"],
    "audio/mpeg": ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"],
    "video/mp4": ["mp4", "mp4v", "mpg4"],
    "video/mpeg": ["mpeg", "mpg", "mpe", "m1v", "m2v"],
    "video/ogg": ["ogv"],
    "video/quicktime": ["qt", "mov"],
    "video/x-matroska": ["mkv", "mk3d", "mks"],
    "video/x-msvideo": ["avi"],
};
const extMap = new Map();

for (let [type, extensions] of Object.entries(types)) {
    for (let extension of extensions) {
        extMap.set(`.${extension}`, type);
    }
}

export default extMap;
