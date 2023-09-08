import path from 'path';
import fs from 'fs';
import { CreateTemplatesProps } from '../createTemplates/createTemplates';
import { CreateFileProps } from '../createFile';
import { TemplateFiles } from '../../../types/templates/files';

export interface CreateDirsThreeProps extends Omit<CreateFileProps, 'relativeFiles'>{

}
let filesStructure: { [key in keyof TemplateFiles]?: CreateDirsThreeProps } = {};
export const createDirsThree = ({
    template, pathToDir, name,
}: CreateTemplatesProps, isTest = false) => {
    if (Array.isArray(template)) {
        template.forEach(({ dirName, template: temp }) => {
            if (dirName) {
                const newPath = path.resolve(pathToDir, dirName);
                if (!isTest) fs.mkdirSync(newPath, {});
                createDirsThree({ template: temp, pathToDir: newPath, name }, isTest);
            } else {
                createDirsThree({ template: temp, pathToDir, name }, isTest);
            }
        });
    } else {
        const { name: nameTFile, format } = template;
        const genericName = template.nameMutator ? name[template.nameMutator] : '';
        filesStructure = {
            ...filesStructure,
            [nameTFile]: {
                format,
                name,
                pathToDir,
                genericName,
            },
        };
    }

    return filesStructure;
};
