import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ErrorBoundary.module.scss';

export interface ErrorBoundaryProps {
    className?: string
}

export const ErrorBoundary = memo((props: ErrorBoundaryProps) => {
    const {
        className,

    } = props;
    const { t } = useTranslation();

    return (
        <div className={classNames(cls.ErrorBoundary, {}, [className])} />
    );
});
