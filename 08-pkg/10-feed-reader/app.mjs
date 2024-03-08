import printLines from "../modules/print-lines-numbers.mjs";
import readNumber from "../modules/read-number.mjs";
import open from "../modules/open/open.js";
import getFeedEntries from "./get-feeds.mjs";

const countFrom = 1;
const feedUrl = process.argv[2];
const entries = await getFeedEntries(feedUrl);
const titles = entries.map((e) => e.title);

printLines(titles, countFrom);
const num = await readNumber("Digit a number and press Enter to open it: ");
const selectedEntry = entries[num - countFrom];
open(selectedEntry.link);
