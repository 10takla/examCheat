import { type TemplateFileProps } from '../types/templates/shared';

export default ({ genericName, name, fileCombineNames }: TemplateFileProps) => {
    const interfaceConst = 'interface';
    const IPN = name.upper;
    const CN = genericName;
    const StyleFN = fileCombineNames['module.scss'];

    return (
        `import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
${StyleFN ? `import cls from "./${StyleFN}.module.scss"\n` : ''}
${interfaceConst} ${IPN}Props {
    className?: string
}

export const ${CN} = memo((props: ${IPN}Props) => {
    const {
        className,
    } = props;
    const { t } = useTranslation();
    return (
        <div${StyleFN ? ' className={classNames(cls.tsx, {}, [className])}' : ''}>
        
        </div>
    );
});`
    );
};
