import fs from 'fs/promises';
import * as process from 'process';
import path from 'path';
import getFullName from './lib/getFullName';
import { TemplateFileProps } from '../../types/templates/shared';
import webpackConfig from '../../../../webpack.config';
import { getRealtivePath } from './lib/getRealtivePath';

export interface CreateFileProps extends Omit<TemplateFileProps, 'alias'> {

}

export default async ({
    format,
    name,
    pathToDir,
    genericName,
    relativeFiles,
}: CreateFileProps) => {
    const fullName = getFullName({ pathToDir, genericName, format });
    console.log(fullName);
    try {
        const fullNameTemplate = path.join(process.cwd(), 'scripts', 'create', 'templateFiles', format);
        const relativePath = getRealtivePath(__filename, fullNameTemplate);
        console.log(relativePath);
        const code = (await import(relativePath))?.default as (_: TemplateFileProps) => string;
        if (!code) throw Error;
        const config = webpackConfig({ mode: 'development' });
        const alias = Object.keys(config.resolve.alias)[0];
        fs.writeFile(
            fullName,
            code({
                genericName,
                name,
                pathToDir,
                relativeFiles,
                format,
                alias,
            }),
        );
    } catch (e) {
        console.log(e);
        fs.writeFile(fullName, 'null');
    }
};
