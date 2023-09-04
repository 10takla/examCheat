import path from 'path';
import { type CLIArgs, type ValidateArg } from '../types/args';
import mutateFirsLetter from '../lib/mutateFirsLetter';
import { type Template } from '../types/templates/shared';
import { templateCombines, templatePacks } from './templates';

const srcPath = path.resolve(process.cwd(), 'src');
export const CLIargsValues: CLIArgs = {
    template: process.argv[2] as Template,
    pathToDir: path.isAbsolute(process.argv[3])
        ? process.argv[3]
        : path.resolve(srcPath, process.argv[3]),
    name: mutateFirsLetter(
        ((name) => name ?? path.resolve(process.argv[3]).split('\\').pop())(process.argv[4]),
    ),
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
                    check: [...Object.keys(templatePacks), ...Object.keys(templateCombines)]
                        .includes(CLIargsValues.template),
                    errorMessage: `Не то выбери из ${[...Object.keys(templatePacks),
                        ...Object.keys(templateCombines)].join(', ')}`,
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
                },
            },
        ],
    },
];
