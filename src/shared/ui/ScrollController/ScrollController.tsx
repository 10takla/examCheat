import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ScrollController.module.scss';

interface ScrollControllerProps {
    className?: string
}

export const ScrollController = memo((props: ScrollControllerProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation();
    
    return (
        <div className={classNames(cls.ScrollController, {}, [className])}>
        
        </div>
    );
});
