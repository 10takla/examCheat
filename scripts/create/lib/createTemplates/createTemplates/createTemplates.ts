import { createDirsThree } from '../lib/createDirsThree';
import { TemplateFileProps } from '../../../types/templates/shared';
import { templatePacks } from '../../../const/templates';
import getRelativeFiles from '../lib/getRelativeFiles';
import createFile from '../createFile';

export type CreateTemplatesProps = Pick<TemplateFileProps, 'pathToDir' | 'name'>
    & { template: typeof templatePacks[keyof typeof templatePacks] }

interface CreateTemplates extends CreateTemplatesProps {
}
export default async (
    { ...data }: CreateTemplates,
    isTest = false,
) => {
    const filesStructure = createDirsThree(data, isTest);
    const t = getRelativeFiles(filesStructure);
    if (!isTest) {
        t.forEach((fileData) => {
            createFile(fileData);
        });
    }
};
