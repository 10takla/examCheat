import fs from 'fs/promises';
import path from 'path';
import { type TemplateFileProps } from '../../../types/templates/shared';
import { type TemplateFiles } from '../../../types/templates/files';

export interface CreateFilesProps extends Pick<
    TemplateFileProps, 'pathToDir' | 'name' | 'fileCombineNames'> {
    fileData: TemplateFiles[keyof TemplateFiles]
}

export default ({
    pathToDir, fileData: [nameMutator, format], name, fileCombineNames,
}: CreateFilesProps) => {
    const fullName = path.resolve(pathToDir, [name[nameMutator], format].join('.'));
    const props: TemplateFileProps = {
        genericName: [name[nameMutator], format].join('.'),
        name,
        pathToDir,
        fileCombineNames,
    };
    console.log(`../../templates/${format}`);
    import(`../../../templates/${format}`)
        .then((code) => {
            console.log(code.default(props));
            fs.writeFile(
                fullName,
                (code?.default)
                    ? code.default(props)
                    : 'null',
            );
        })
        .catch(() => {
            console.log('2');
            fs.writeFile(fullName, 'null');
        });
};
