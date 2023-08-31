import {CLIArgs, ValidateArg} from "../types/args";
import mutateFirsLetter from "../lib/mutateFirsLetter";
import path from "path";
import {Template} from "../types/templates";
import {templateCombines, templatePacks} from "./templates";

const srcPath = path.resolve(process.cwd(), 'src')
export const argsValues: CLIArgs = {
    template: process.argv[2] as Template,
    pathToDir: path.isAbsolute(process.argv[3]) ? process.argv[3]
        : path.resolve(srcPath, process.argv[3]),
    name: mutateFirsLetter(
        process.argv[4] ? process.argv[4]
            : process.argv[3].split('/').pop()
    )
}
export const argsValidates: ValidateArg[] = [
    {
        propName: 'template',
        baseErrorMessage: `тип: `,
        checks: [
            {
                check: Boolean(argsValues.template),
                nextCheck: {
                    check: [...Object.keys(templatePacks), ...Object.keys(templateCombines)]
                        .includes(argsValues.template),
                    errorMessage: `Не то выбери из ${[...Object.keys(templatePacks), ...Object.keys(templateCombines)].join(', ')}`
                }
            },
        ],
    },
    {
        propName: 'pathToDir',
        baseErrorMessage: 'путь к директории компанента',
        checks: [
            {
                check: Boolean(argsValues.pathToDir),
                nextCheck: {
                    check: argsValues.pathToDir.startsWith(srcPath),
                    errorMessage: 'Нельзя создать за пределами папки src проекта'
                }
            }
        ]
    },
]
