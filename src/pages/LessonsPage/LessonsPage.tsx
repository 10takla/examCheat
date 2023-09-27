import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './LessonsPage.module.scss';
import { Designations } from '@/pages/LessonsPage/ui/Designations/Designations';
import { Articles } from '@/pages/LessonsPage/ui/Articles/Articles';
import { Pronouns } from '@/pages/LessonsPage/ui/Pronouns/Pronouns';
import { WordFormation } from '@/pages/LessonsPage/ui/WordFormation/WordFormation';
import { Numerals } from '@/pages/LessonsPage/ui/Numerals/Numerals';

export interface LessonsPageProps {
    className?: string
}

export const LessonsPage = memo((props: LessonsPageProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation();

    const lessons = [
        ['Знаки', <Designations />],
        ['Артикли', <Articles />],
        ['Местоимения', <Pronouns />],
        ['Образование слов', <WordFormation />],
        ['Числительные', <Numerals />],
    ];

    return (
        <div className={classNames(cls.LessonsPage, {}, [className])}>
            {lessons.map(([name, component]) => (
                <div>
                    <h2>{name}</h2>
                    {component}
                </div>
            ))}
        </div>
    );
});
