import printLines from "./modules/print-lines-numbers.mjs";
import { readFileLines as readLinks } from "./modules/read-file-lines.mjs";
import readNumber from "./modules/read-number.mjs";
import open from "./modules/open/open.js";

const linksFile = "./links.txt";
const countFrom = 1;

const links = await readLinks(linksFile);
printLines(links, countFrom);
const num = await readNumber("Digit a number and press Enter to open it: ");
open(links[num - countFrom]);
