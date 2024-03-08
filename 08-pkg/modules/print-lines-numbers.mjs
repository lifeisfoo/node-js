function print(lines = [], countFrom = 0) {
    for (let idx = 0; idx < lines.length; idx++) {
        const line = lines[idx];
        console.log(`[${countFrom + idx}] ${line}`);
    }
}
export default print;
