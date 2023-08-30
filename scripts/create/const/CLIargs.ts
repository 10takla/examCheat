import {CLIArgs, Name, ValidateArg} from "../types/args";
import {TypeTemplate} from "./templates";
import mutateFirsLetter from "../lib/mutateFirsLetter";
import path from "path";

const srcPath = path.resolve(process.cwd(), 'src')
export const argsValues: CLIArgs = {
    typeTemplate: process.argv[2] as TypeTemplate,
    pathToDir: path.isAbsolute(process.argv[3]) ? process.argv[3]
        : path.resolve(srcPath, process.argv[3]),
    name: mutateFirsLetter(
        process.argv[4] ? process.argv[4]
            : process.argv[3].split('/').pop()
    )
}
export const argsValidates: ValidateArg[] = [
    {
        propName: 'typeTemplate',
        baseErrorMessage: `тип: `,
        checks: [
            {
                check: Boolean(argsValues.typeTemplate),
                nextCheck: {
                    check: Object.values(TypeTemplate).includes(argsValues.typeTemplate),
                    errorMessage: 'Не то выбери из rc, pc'
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
