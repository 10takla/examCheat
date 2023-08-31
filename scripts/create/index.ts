import validateArguments from "./lib/validateArguments/validateArguments";
import {argsValidates, argsValues} from "./const/CLIargs";
import {templateCombines, templatePacks} from "./const/templates";
import createCombineFiles from './lib/createCombineFiles'
import {TemplateCombine, TemplatePacks} from "./types/templates";
import makeRootDir from "./lib/makeRootDir";

try {
    validateArguments(argsValidates)
    const isRootDir = !!process.argv[4]

    const {template, pathToDir, name} = argsValues
    if (Object.keys(templateCombines).includes(template)) {
        createCombineFiles(template as TemplateCombine, pathToDir, isRootDir ? name.upper : undefined)
    }
    if (Object.keys(templatePacks).includes(template)) {
        const tmp = templatePacks[template] as TemplatePacks[keyof TemplatePacks]
        makeRootDir(pathToDir, isRootDir ? name.upper : undefined, (startPath) => {
            tmp.forEach(([templateCombine, dirName]) => {
                createCombineFiles(templateCombine, startPath , dirName)
            })
        })
    }
} catch (e) {
    console.log(e.message)
}
