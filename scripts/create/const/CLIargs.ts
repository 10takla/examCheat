import path from 'path';
import fs from 'fs';
import { type CLIArgs, type ValidateArg } from '../types/args';
import mutateFirsLetter from '../lib/mutateFirsLetter';
import { type Template } from '../types/templates/shared';
import { templatePacks } from './templates';

const getCliName = () => {
    const name = process.argv[4]
        ?? (process.argv[3]
        && path.resolve(process.argv[3])
            .split('\\').pop());

    return mutateFirsLetter(name);
};

const srcPath = path.resolve(process.cwd(), 'src');
export const CLIargsValues: CLIArgs = {
    template: process.argv[2] as Template,
    pathToDir: !process.argv[3]
    || path.isAbsolute(process.argv[3])
        ? process.argv[3]
        : path.resolve(srcPath, process.argv[3]),
    name: getCliName(),
    isRootDir: !!process.argv[4],
};
export const CLIargsValidates: ValidateArg[] = [
    {
        propName: 'template',
        baseErrorMessage: 'тип: ',
        checks: [
            {
                check: Boolean(CLIargsValues.template),
                nextCheck: {
                    check: [...Object.keys(templatePacks)]
                        .includes(CLIargsValues.template),
                    errorMessage: `Не то выбери из ${Object.keys(templatePacks).join(', ')}`,
                },
            },
        ],
    },
    {
        propName: 'pathToDir',
        baseErrorMessage: 'путь к директории компанента',
        checks: [
            {
                check: Boolean(CLIargsValues.pathToDir),
                nextCheck: {
                    check: CLIargsValues.pathToDir.startsWith(srcPath),
                    errorMessage: 'Нельзя создать за пределами папки src проекта',
                    nextCheck: {
                        check: fs.existsSync(CLIargsValues.pathToDir),
                        errorMessage: `Нет директории по пути: ${CLIargsValues.pathToDir}`,
                    },
                },
            },
        ],
    },
];
