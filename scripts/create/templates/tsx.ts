import {Name} from "../types/args";
import {TemplateFile, TemplateFormat} from "../types/templates";

export interface TemplateFileCode {
    name: Name
    combineNames: `${TemplateFile}.${TemplateFormat}`[]
}


export default ({name, combineNames}: TemplateFileCode) =>{
    const interfaceConst = 'interface'
    const IPN = name.upper
    const CN = name.upper
    const CFN = name.upper
    const isStyleInclude = combineNames.includes('module.scss')

    return `
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
${isStyleInclude ? `import cls from "./${CFN}.module.scss\n"`: ''}
${interfaceConst} ${IPN}Props {
    className?: string
}

export const ${CN} = memo((props: ${IPN}Props) => {
    const {
        className,
    } = props;
    const { t } = useTranslation();
    return (
        <div${isStyleInclude ? ' className={classNames(cls.tsx, {}, [className])}' : ''}>
        
        </div>
    );
});
    `
}
