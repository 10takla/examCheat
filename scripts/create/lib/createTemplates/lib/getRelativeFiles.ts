import path from 'path';
import { createDirsThree } from './createDirsThree';
import getFullName from './getFullName';
import { TemplateFiles } from '../../../types/templates/files';
import { TemplateFileProps } from '../../../types/templates/shared';
import config from '../../../config/config';

const setRelativePath = (from: string, to: string) => {
    const [fromArr, toArr] = [from.split('\\'), to.split('\\')];
    const startI = fromArr.findIndex(
        (el, i) => el !== toArr[i],
    );
    if (startI === -1) return to;
    const diffFrom = fromArr.slice(startI);
    const diffTo = toArr.slice(startI);
    const paths = [
        diffFrom.length > 1
            ? Array(diffFrom.length - 1).fill('..') : '.',
        ...diffTo,
    ].flat();
    return paths.join('/');
};

type another = { [key in keyof TemplateFiles]?: TemplateFileProps }
const getRelativeFiles = (tmp: another, currentFile: TemplateFileProps) => (
    Object.entries(tmp).reduce((all, [fileName, relatedFile]) => {
        if (relatedFile.format === currentFile.format) {
            return { ...all };
        }
        return {
            ...all,
            [fileName]: {
                genericName: relatedFile.genericName,
                pathTo: setRelativePath(getFullName(currentFile), getFullName(relatedFile))
                    .replace(config.ignoreFormatsForImport, ''),
            },
        };
    }, {} as { [key in keyof ReturnType<typeof createDirsThree>]: string })
);

export default (tmp: another) => Object.values(tmp).reduce((all, currentFile) => (
    [...all, {
        ...currentFile,
        relatedFiles: getRelativeFiles(tmp, currentFile),
    }]
), [] as any[]);
