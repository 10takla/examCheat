import { useTranslation } from 'react-i18next';
import { memo, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Loading.module.scss';

interface LoadingProps {
    className?: string
    children?: ReactNode
}

export const Loading = memo((props: LoadingProps) => {
    const {
        className,
        children,
    } = props;
    const { t } = useTranslation();

    return (
        <div className={classNames(cls.Loading, {}, [className])}>
            {children}
        </div>
    );
});
