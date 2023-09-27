import fs from 'fs/promises';
import * as process from 'process';
import path from 'path';
import webpackConfig from '../../../../webpack.config';
import { getRealtivePath } from './lib/getRealtivePath';

import { TemplateFileProps } from '../../types/templates/shared';
import getName from './lib/getName';
import { TemplateFile } from '../../types/templates/files';

export interface CreateFileProps extends
    Omit<TemplateFileProps, 'alias' | 'fileName'>,
    Pick<TemplateFile, 'fileName'>
{
}

export default async ({
    name,
    pathToDir,
    fileName: { nameMutator, format },
    genericName,
    relativeFiles,
}: CreateFileProps) => {
    const fileName = getName(nameMutator && name[nameMutator], format);
    const fullName = path.join(pathToDir, fileName);
    try {
        const fullNameTemplate = path.join(process.cwd(), 'scripts', 'create', 'templateFiles', format);
        const relativePath = getRealtivePath(__filename, fullNameTemplate);
        const code = (await import(relativePath))?.default as (_: TemplateFileProps) => string;
        if (!code) throw Error;
        const config = webpackConfig({ mode: 'development' });
        const alias = Object.keys(config.resolve.alias)[0];
        fs.writeFile(
            fullName,
            code({
                genericName,
                name,
                fileName,
                pathToDir,
                relativeFiles,
                alias,
            }),
        );
    } catch (e) {
        console.log(e);
        fs.writeFile(fullName, 'null');
    }
};
