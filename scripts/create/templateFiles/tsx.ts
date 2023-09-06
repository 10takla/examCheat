import { type TemplateFileProps } from '../types/templates/shared';

export default ({ genericName, name, relatedFiles }: TemplateFileProps) => {
    const interfaceConst = 'interface';
    const IPN = name.upper;
    const CN = genericName;
    const Style = relatedFiles.module;

    return (
        `import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
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
