import express from "express";
import { parse, isBefore, isFuture, isValid } from "date-fns";

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

const firstApodDate = new Date("1995-06-16");
function validateDate(req, res, next) {
    const date = parse(req.params.date, "yyyy-MM-dd", new Date());
    if (!isValid(date) || isBefore(date, firstApodDate) || isFuture(date)) {
        res.status(404);
        res.render("apod-not-found");
    } else {
        next();
    }
}
app.get("/apod/:date", validateDate, (req, res) => {
    res.render("apod-pic", {
        title: "Astronomy Picture of the Day",
        date: req.params.date,
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
