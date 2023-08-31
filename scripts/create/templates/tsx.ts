import {TemplateFileProps} from "../types/templates/shared";

export default ({genericNameMutator, name, fileNames}: TemplateFileProps) =>{
    const interfaceConst = 'interface'
    const IPN = name.upper
    const CN = name[genericNameMutator]
    const StyleFN = fileNames['module.scss']

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
    )
}
