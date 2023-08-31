
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import cls from "./Boxxxxxzxxxxx.module.scss"

interface BoxxxxxzxxxxxProps {
    className?: string
}

export const Boxxxxxzxxxxx = memo((props: BoxxxxxzxxxxxProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation();
    return (
        <div className={classNames(cls.tsx, {}, [className])}>
        
        </div>
    );
});
    