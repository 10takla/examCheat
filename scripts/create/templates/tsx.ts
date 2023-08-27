import {ArgsTemplate, Name} from "../types";

export default ({upperName}: ArgsTemplate) => {
    const interfaceConst = 'interface';

    return `
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cls from './${upperName}.module.scss';
import { memo } from 'react';

${interfaceConst} ${upperName}Props {
    className?: string;
}

export const ${upperName} = memo((props: ${upperName}Props) => {
    const { className } = props;
    const { t } = useTranslation();
    
    return (
        <div className={classNames(cls.${upperName}, {}, [className])}>
           
        </div>
    );
});`
}
