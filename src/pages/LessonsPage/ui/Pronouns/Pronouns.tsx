import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Pronouns.module.scss';
import { pronouns } from '@/pages/LessonsPage/const/const';

export interface PronounsProps {
    className?: string
}

export const Pronouns = memo((props: PronounsProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation();

    const headers = [
        ['личные', ['Кто']],
        ['притяжательные', ['Кому', 'Кого']],
        ['возвратные', ['Кому', 'Кого']],
    ];
    const numbers: { [key in string]: string } = {
        'ед.ч': 'self',
        'мн.ч': 'selves',
    };
    return (
        <tbody className={classNames(cls.Pronouns, {}, [className])}>
            <tr>
                {headers.map((header, i) => (
                    <th>
                        <div>
                            {i + 1}
                            -я форма
                        </div>
                        <div>
                            {header[0]}
                        </div>
                        <div>
                            (
                            {header[1].map((o) => `${o}?`).join(' ')}
                            )
                        </div>
                    </th>
                ))}
            </tr>
            {pronouns.map(([first, second, third]) => (
                <tr>
                    <td>{first}</td>
                    <td>{second}</td>
                    <td>
                        {Array.isArray(third[1])
                            ? third[1].map((o) => (
                                <div>
                                    {third[0]}
                                    {numbers[o]}
                                </div>
                            ))
                            : (
                                <div>
                                    {third[0]}
                                    {numbers[third[1]]}
                                </div>
                            )}
                    </td>
                </tr>
            ))}
        </tbody>
    );
});
