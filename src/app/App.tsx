import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './App.module.scss';
import { MainPage } from '@/pages/MainPage/MainPage';
import { LessonsPage } from '@/pages/LessonsPage/LessonsPage';

interface AppProps {
    className?: string
}

export const App = memo((props: AppProps) => {
    const {
        className,
    } = props;
    return (
        <div
            className={classNames(cls.App, {}, [className])}
        >
            <MainPage />
            {/* <LessonsPage /> */}
        </div>
    );
});
