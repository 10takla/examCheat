import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './MainPage.module.scss';
import { MyWords } from '@/widgets/MyWords';
import { VStack } from '@/shared/ui/Stack';
import { AddMyWord } from '@/features/changeMyWord';

interface MainPageProps {
    className?: string
}

export const MainPage = memo((props: MainPageProps) => {
    const {
        className,
    } = props;

    return (
        <VStack
            className={classNames(cls.MainPage, {}, [className])}
        >
            <MyWords />
        </VStack>
    );
});
