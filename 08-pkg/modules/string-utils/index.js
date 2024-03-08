function isString(str) {
    return typeof str === "string";
}

function toUrl(str) {
    if (!isString(str)) {
        throw new TypeError("A string is required");
    }
    return str.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

exports.isString = isString;
exports.urlify = toUrl;
