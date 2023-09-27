import { createDirsThree, CreateDirsThreeProps } from './createDirsThree';
import getFullName from './getFullName';
import config from '../../../config/config';
import { CreateFileProps } from '../createFile';
import { getRealtivePath } from './getRealtivePath';
import { TemplateFiles } from '../../../types/templates/files';

type another = { [key in keyof TemplateFiles]?: CreateDirsThreeProps }
const getRelativeFiles = (tmp: another, currentFile: CreateDirsThreeProps) => (
    Object.entries(tmp).reduce((all, [fileName, relatedFile]) => {
        if (relatedFile.fileName.format === currentFile.fileName.format) {
            return { ...all };
        }
        return {
            ...all,
            [fileName]: {
                genericName: relatedFile.genericName,
                pathTo: getRealtivePath(getFullName(currentFile), getFullName(relatedFile))
                    .replace(config.ignoreFormatsForImport, ''),
            },
        };
    }, {} as { [key in keyof ReturnType<typeof createDirsThree>]: string })
);

export default (tmp: another) => (
    Object.values(tmp)
        .reduce((all, currentFile) => (
            [
                ...all,
                {
                    ...currentFile,
                    relativeFiles: getRelativeFiles(tmp, currentFile),
                },
            ]
        ), [] as any[]) as CreateFileProps[]
);
