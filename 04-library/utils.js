function resJson(res, data) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(data);
}
function resText(res, data) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end(data);
    res.end();
}
function resHtml(res, data) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.end(data);
}
function getAcceptedTypes(req) {
    const acceptHeaderVal = req.headers.accept || "*/*";
    // ["text/html", "application/xml;q=0.9", ...]
    const acceptList = acceptHeaderVal.split(",");
    // ["text/html", "application/xml", ...]
    const acceptedTypes = acceptList.map((a) => a.split(";")[0]);

    const json = acceptedTypes.includes("application/json");
    const textPlain = acceptedTypes.includes("text/plain");
    const textHtml = acceptedTypes.includes("text/html");
    const text = acceptedTypes.includes("text/*");
    const any = acceptedTypes.includes("*/*");
    return { json, textPlain, textHtml, text, any };
}
module.exports = { resJson, resText, resHtml, getAcceptedTypes };
