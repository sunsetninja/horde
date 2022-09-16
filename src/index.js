import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

const absolutePath = (filePath) => path.resolve(process.cwd(), filePath);
const readDataFromFile = (filePath) => readFileSync(absolutePath(filePath), 'UTF-8');

const formatLogs = (logs, {day,prefix}) => {
    return Object.entries(logs.idb)
        .map(([level, logs]) => logs.map(log => ({ ...log, level, tsz: new Date(log.tsz) })))
        .flat()
        .filter(log => !day || log.tsz.getUTCDay() === new Date(day).getUTCDay())
        .filter(log => !prefix || log.prefix === prefix)
        .sort((a, b) => a.tsz - b.tsz)
}

export default (filePath, { day, prefix }) => {
    const options = [day, prefix].filter(Boolean);
    if (options.length) {
        console.log(`Options: ${options.join(',')}`)
    }
    const resultFilename = path.basename(path.basename(filePath, path.extname(filePath)) + `_${options.join('_')}_formatted.json`);
    const result = formatLogs(JSON.parse(readDataFromFile(filePath)), {day,prefix});
    writeFileSync(resultFilename, JSON.stringify(result));
    console.log(`Successfullly formatted and saved to ${resultFilename}`);
};