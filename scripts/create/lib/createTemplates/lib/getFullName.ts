import path from 'path';

import { TemplateFileProps } from '../../../types/templates/shared';
import getName from './getName';
import { CreateDirsThreeProps } from './createDirsThree';

interface GetFullNameProps extends Pick<CreateDirsThreeProps, 'pathToDir' | 'fileName' | 'name'>{

}

export default ({ pathToDir, name, fileName: { format, nameMutator } }: GetFullNameProps) => path.resolve(
    pathToDir,
    getName(nameMutator && name[nameMutator], format),
);
