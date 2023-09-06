import * as process from 'process';
import fs from 'fs';
import path from 'path';
import validateArguments from './lib/validateArguments/validateArguments';
import { CLIargsValidates, CLIargsValues } from './const/CLIargs';
import { templatePacks } from './const/templates';
import createTemplates from './lib/createTemplates/createTemplates/createTemplates';

validateArguments(CLIargsValidates);
const {
    template, pathToDir, name, isRootDir,
} = CLIargsValues;

const newDir = isRootDir ? path.resolve(pathToDir, process.argv[4]) : pathToDir;
if (isRootDir) {
    fs.mkdirSync(newDir);
}
createTemplates({
    template: templatePacks[template],
    pathToDir: newDir,
    name,
}, false);
