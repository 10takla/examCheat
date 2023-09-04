import validateArguments from './lib/validateArguments/validateArguments';
import { CLIargsValidates, CLIargsValues } from './const/CLIargs';
import { templateCombines, templateFiles, templatePacks } from './const/templates';
import makeRootDir from './lib/makeRootDir';
import { type TemplatePacks } from './types/templates/packs';
import createFiles from './lib/createCombineFiles/lib/createFiles';
import createCombineFiles from './lib/createCombineFiles/createCombineFiles';

try {
    validateArguments(CLIargsValidates);
    const {
        template, pathToDir, name, isRootDir,
    } = CLIargsValues;
    if (Object.keys(templatePacks).includes(template)) {
        const tmp = templatePacks[template] as TemplatePacks[keyof TemplatePacks];
        makeRootDir(pathToDir, isRootDir ? name.upper : undefined, (startPath) => {
            tmp.forEach(([templateCombine, dirName]) => {
                createCombineFiles({
                    data: templateCombine,
                    pathToDir: startPath,
                    dirName,
                });
            });
        });
    } else if (Object.keys(templateCombines).includes(template)) {
        createCombineFiles(
            {
                data: templateCombines[template],
                pathToDir,
                dirName: isRootDir ? name.upper : undefined,
            },
        );
    } else if (Object.keys(templateFiles).includes(template)) {
        createFiles({
            fileData: template,
            pathToDir,
            name,
        });
    }
} catch (e) {
    console.log(e.message);
}
