import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './App.module.scss';
import { MonitorPage } from '@/pages/MonitorPage/MonitorPage';
import { Slider } from '@/test/Slider/Slider';
import { Range } from '@/test/Range/Range';
import { DragObject } from '@/test/DragObject/DragObject';

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
            {/* <MainPage /> */}
            {/* <LessonsPage /> */}
            {/* <MonitorPage /> */}
            {/* <Range /> */}
            <DragObject />
        </div>
    );
});
