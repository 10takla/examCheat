import validateArguments from "./lib/validateArguments/validateArguments";
import {argsValidates, argsValues} from "./const/CLIargs";
import {typeTemplateFiles} from "./const/templates";
import fs from "fs/promises";
import path from "path";

try {
    validateArguments(argsValidates)
    const {typeTemplate, name, pathToDir} = argsValues

    new Promise<string[]>(resolve => {
        if (process.argv[4]) {
            fs.mkdir(path.resolve(pathToDir, name.upper), {})
                .then(() => {
                    resolve([pathToDir, name.upper])
                })
        } else {
            resolve([pathToDir])
        }
    })
        .then((startPath) => {
            typeTemplateFiles[typeTemplate].forEach(([nameMutator, ...formats]) => {
                const fullName = path.resolve(...startPath, [name[nameMutator], ...formats].filter(e => e).join('.'))
                fs.writeFile(fullName, 'code')
            })
        })

} catch (e) {
    console.log(e)
}
