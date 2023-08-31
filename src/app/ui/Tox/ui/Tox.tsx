
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import cls from "./Tox.module.scss"

interface ToxProps {
    className?: string
}

export const Tox = memo((props: ToxProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation();
    return (
        <div className={classNames(cls.tsx, {}, [className])}>
        
        </div>
    );
});
    