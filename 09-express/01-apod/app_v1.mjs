import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("Hello APOD!");
});
app.get("/about", (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
        <head><title>About APOD</title></head>
        <body>
            <h1>Astronomy Picture of the Day</h1>
            <p>
Astronomy Picture of the Day (APOD) is originated, written, coordinated,
and edited since 1995 by Robert Nemiroff and Jerry Bonnell.
The APOD archive contains the largest collection of annotated
astronomical images on the internet. 
            </p>
        </body>
    </html>`);
});

app.listen(port, () => {
    console.log(`APOD app listening on port ${port}`);
});
