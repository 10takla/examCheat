import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './WordFormation.module.scss';

export interface WordFormationProps {
    className?: string
}

export const WordFormation = memo((props: WordFormationProps) => {
    const {
        className,
    } = props;

    const endings: Array<[string, string, [string, string]]> = [
        ['ция', 'tion', ['на', 'na']],
        ['сия', 'sion', ['профес', 'profes']],
    ];
    const postEndings = endings.map((ending) => {
        const [ends, example] = [[ending[0], ending[1]], ending[2]];
        const postEnds = ends.map((o) => `-${o}`);
        const postExample = example.map((o, i) => [o, ends[i]].join('')).join(' - ');
        return [...postEnds, postExample];
    });
    const tables = {
        'Большинство слов': postEndings,
        Профессии: [
            ['or', 'act'],
            ['er', 'act'],
            ['ist', 'act'],
            ['ian', 'act'],
        ].map(([end, ex]) => [`-${end}`, [ex, end].join('')]),
    };

    return (
        <>
            {Object.entries(tables).map(([key, value]) => (
                <div>
                    <h3>{key}</h3>
                    <tbody>
                        {value.map((ending) => (
                            <tr key={ending[0]}>
                                {ending.map((el) => (
                                    <td key={`${el}`}>
                                        {el}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </div>
            ))}
        </>
    );
});
