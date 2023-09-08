import fs from 'fs';
import * as process from 'process';
import { type TemplateFileProps } from '../types/templates/shared';

export default ({
    genericName, name, relativeFiles, alias,
}: TemplateFileProps) => {
    const interfaceConst = 'interface';
    const IPN = name.upper;
    const CN = genericName;
    const Style = relativeFiles?.module;

    return (
        `import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '${alias}/shared/lib/classNames/classNames';
${Style ? `import cls from '${Style.pathTo}';\n` : ''}
${interfaceConst} ${IPN}Props {
    className?: string
}

export const ${CN} = memo((props: ${IPN}Props) => {
    const {
        className,
    } = props;
    const { t } = useTranslation();
    
    return (
        <div className={classNames(${Style ? `cls.${Style.genericName}` : '""'}, {}, [className])}>
        
        </div>
    );
});
`);
};
