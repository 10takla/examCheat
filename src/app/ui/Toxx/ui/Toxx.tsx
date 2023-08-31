
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';


interface ToxxProps {
    className?: string
}

export const Toxx = memo((props: ToxxProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation();
    return (
        <div >
        
        </div>
    );
});
    