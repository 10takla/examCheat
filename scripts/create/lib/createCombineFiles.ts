import fs from "fs/promises";
import path from "path";
import {argsValues} from "../const/CLIargs";
import {templateCombines} from "../const/templates";
import {TemplateFileProps} from "../types/templates/shared";
import makeRootDir from "./makeRootDir";
import {log} from "util";
import {TemplateCombine} from "../types/templates/combines";
import {TemplateFormat, TemplatePreFormat} from "../types/templates/files";


export default (templateCombine: TemplateCombine, pathToDir: string, dirName?: string) => {
    const {name} = argsValues
    makeRootDir(pathToDir, dirName, (dirPath) => {
        const data = templateCombines[templateCombine]
        const combineNames = data.reduce((all, [nameMutator, ...formats]) => {
            return {...all, [formats.join('.')]: name[nameMutator]}
        }, {} as TemplateFileProps['fileNames'])

        data.forEach(async ([nameMutator, ...formats]) => {
            const format = formats.join('.')
            const fullName = path.resolve(dirPath, [name[nameMutator], format].join('.'))
            const props: TemplateFileProps = {genericNameMutator: nameMutator, name, dirFullName: pathToDir, fileNames: combineNames}
            try {
                import(`../templates/${format}`)
                    .then(code => {
                        fs.writeFile(fullName,
                            (code && code.default) ? code.default(props)
                                : 'null'
                        );
                    })
                    .catch(() => {
                        fs.writeFile(fullName, 'null');
                    });
            } catch (e) {

            }
        })
    })
}
