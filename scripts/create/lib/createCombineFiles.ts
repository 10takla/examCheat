import fs from "fs/promises";
import path from "path";
import {argsValues} from "../const/CLIargs";
import {templateCombines} from "../const/templates";
import {TemplateCombine} from "../types/templates";
import makeRootDir from "./makeRootDir";
import {log} from "util";


export default (templateCombine: TemplateCombine, pathToDir: string, dirName?: string) => {
    const {name} = argsValues
    makeRootDir(pathToDir, dirName, (dirPath) => {
        const data = templateCombines[templateCombine]
        const combineNames = data.map(([_, ...formats]) => formats.filter(e => e).join('.'))

        data.forEach(async ([nameMutator, ...formats]) => {
            const format = formats.filter(e => e).join('.')
            const fullName = path.resolve(dirPath, [name[nameMutator], format].join('.'))
            try {
                import(`../templates/${format}`)
                    .then(code => {
                        fs.writeFile(fullName,
                            code && code.default ?
                                code.default({name, combineNames})
                                : 'null'
                        );
                    })
                    .catch(e => {
                        fs.writeFile(fullName, 'null');
                    });
            } catch (e) {

            }
        })
    })
}
