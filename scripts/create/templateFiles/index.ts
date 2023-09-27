import { TemplateFileProps } from '../types/templates/shared';

export default ({ relativeFiles }: TemplateFileProps) => {
    const Type = { genericName: `type ${relativeFiles.types?.genericName}Type`, pathTo: relativeFiles.types?.pathTo };
    const RC = relativeFiles.tsx;
    return [Type, RC].filter((e) => !!e)
        .map((el) => `export { ${el?.genericName} } from '${el?.pathTo}';`)
        .join('\n');
};
