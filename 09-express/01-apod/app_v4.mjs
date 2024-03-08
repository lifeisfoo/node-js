import express from "express";
const app = express();
const port = 3000;

app.set("views", "./views2");
app.set("view engine", "hbs");

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("home", {
        title: "Astronomy Picture of the Day",
        pic_url: "/saturn-voyager.jpg",
    });
});
app.get("/about", (req, res) => {
    res.render("about", {
        title: "About APOD",
    });
});

app.listen(port, () => {
    console.log(`APOD app listening on port ${port}`);
});
