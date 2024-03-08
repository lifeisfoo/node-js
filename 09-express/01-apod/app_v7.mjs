import express from "express";
import { parse, isBefore, isFuture, isValid, format } from "date-fns";
import { getApodByDate } from "./apod-api.mjs";

const app = express();
const port = 3000;

app.set("views", "./views2");
app.set("view engine", "hbs");

app.use(express.static("public"));

app.get("/", (req, res) => {
    const today = format(new Date(), "yyyy-MM-dd");
    getApodByDate(today).then((apodInfo) => {
        res.render("apod", {
            title: `${apodInfo.title} | Astronomy Picture of the Day`,
            date: today,
            url: apodInfo.url,
            description: apodInfo.explanation,
        });
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
    getApodByDate(req.params.date).then((apodInfo) => {
        res.render("apod", {
            title: `${apodInfo.title} | Astronomy Picture of the Day`,
            date: req.params.date,
            url: apodInfo.url,
            description: apodInfo.explanation,
        });
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
