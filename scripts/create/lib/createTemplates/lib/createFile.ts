import fs from 'fs/promises';
import { TemplateFileProps } from '../../../types/templates/shared';
import getFullName from './getFullName';

export interface CreateFileTemplate extends TemplateFileProps {

}

export default async ({
    format,
    name,
    pathToDir,
    genericName,
    relatedFiles,
}: CreateFileTemplate) => {
    const fullName = getFullName({ pathToDir, genericName, format });
    try {
        const code = (await import(`../../../templateFiles/${format}`))?.default as (_: TemplateFileProps) => string;
        if (!code) throw Error;
        fs.writeFile(
            fullName,
            code({
                genericName,
                name,
                pathToDir,
                relatedFiles,
                format,
            }),
        );
    } catch (e) {
        console.log(e);
        fs.writeFile(fullName, 'null');
    }
};
