import path from 'path';
import fs from 'fs';
import { CreateTemplatesProps } from '../createTemplates/createTemplates';
import { CreateFileTemplate } from './createFile';
import { TemplateFiles } from '../../../types/templates/files';

const filesStructure: CreateFileTemplate[] = [];
let tmp: { [key in keyof TemplateFiles]?: CreateFileTemplate } = {};
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
        const genericName = name[template.nameMutator];
        const { name: nameTFile, format } = template;
        filesStructure.push({
            format,
            name,
            pathToDir,
            genericName,
        });
        tmp = {
            ...tmp,
            [nameTFile]: {
                format,
                name,
                pathToDir,
                genericName,
            },
        };
    }

    return tmp;
};
