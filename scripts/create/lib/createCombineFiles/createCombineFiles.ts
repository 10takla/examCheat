import { type TemplateCombines } from '../../types/templates/combines';
import { CLIargsValues } from '../../const/CLIargs';
import makeRootDir from '../makeRootDir';
import { type TemplateFileProps } from '../../types/templates/shared';
import createFiles, { type CreateFilesProps } from './lib/createFiles';

interface CreateCombineFilesProps extends Pick<CreateFilesProps, 'pathToDir'> {
    data: TemplateCombines[keyof TemplateCombines]
    dirName?: string
}

export default ({ data, pathToDir, dirName }: CreateCombineFilesProps) => {
    const { name } = CLIargsValues;
    makeRootDir(pathToDir, dirName, (newPathToDir) => {
        const fileCombineNames = data.reduce((
            all,
            [nameMutator, format],
        ) => ({
            ...all,
            [format]: name[nameMutator],
        }), {} as TemplateFileProps['fileCombineNames']);
        data.forEach(async (fileData) => {
            try {
                createFiles({
                    fileData,
                    pathToDir: newPathToDir,
                    name,
                    fileCombineNames,
                });
            } catch (e) {
                console.log(e);
            }
        });
    });
};
