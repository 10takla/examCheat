import { TemplateFileProps } from '../types/templates/shared';

export default ({ relativeFiles }: TemplateFileProps) => {
    const Type = relativeFiles.types;
    const RC = relativeFiles.tsx;
    return [Type, RC].filter((e) => !!e)
        .map((el) => `import { ${el.genericName} } from '${el.pathTo}';`)
        .join('\n');
};
