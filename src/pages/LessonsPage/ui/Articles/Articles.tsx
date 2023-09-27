import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Articles.module.scss';

export interface ArticlesProps {
    className?: string
}

export const Articles = memo((props: ArticlesProps) => {
    const {
        className,
    } = props;

    const headers = [
        'Артикль',
        'Употребляется когда в предложении идет речь о чем-то',
        'Произошло от слова',
        '',
        'не употребляется когда перед словом уже есть',
    ];

    const articles = {
        'a/an': [
            'не конкретном, можно подсчитать, исчисляемое',
            'one',
            'ед.ч',
            'one, some',
        ],
        the: [
            'конкретном',
            'that, this',
            'ед.ч, мн.ч',
            'that, this',
        ],
    };

    return (
        <div className={classNames(cls.Articles, {}, [className])}>
            <tbody>
                <tr>
                    {headers.map((header) => <th>{header}</th>)}
                </tr>
                {Object.entries(articles).map((infos) => (
                    <tr>
                        {infos.flat().map((info) => (
                            <td>{info}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </div>
    );
});
