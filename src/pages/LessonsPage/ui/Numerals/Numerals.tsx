import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Numerals.module.scss';

export interface NumeralsProps {
    className?: string
}

export const Numerals = memo((props: NumeralsProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation();

    const structure = {
        'Деляться на': [
            ['Количественные', 'Сколько'],
            ['Порядковые', 'Который'],
        ].map(([kind, quest]) => (
            `- ${kind} (Отвечают на вопрос "${quest}?")`
        )),
        Виды: [
            ['Простые', ['one', 'two', 'hundred']],
            ['Производные', ['thirteen', 'thirty', 'tenth']],
            ['Составные', ['twenty-one', 'one hundred']],
        ].map(([kind, example] : any) => `- ${kind}\n\tНапример: (${example.join(', ')})`),
    };

    return (
        <div className={classNames(cls.Numerals, {}, [className])} />
    );
});
