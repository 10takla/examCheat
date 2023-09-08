import path from 'path';
import { TemplateFileProps } from '../../../types/templates/shared';

interface GetFullNameProps extends Pick<TemplateFileProps, 'pathToDir'| 'genericName'| 'format'>{

}

export default ({ pathToDir, genericName, format }: GetFullNameProps) => path.resolve(
    pathToDir,
    [genericName, format].filter((e) => e !== '').join('.'),
);
