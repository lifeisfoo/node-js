import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

export default async function (prompt = "Insert a number") {
    const rl = readline.createInterface({ input, output });
    const answer = await rl.question(prompt);
    rl.close();
    return parseInt(answer);
}
