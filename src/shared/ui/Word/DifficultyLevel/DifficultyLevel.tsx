import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './DifficultyLevel.module.scss';
import Description from '@/shared/ui/Description/Description';
import { WordType } from '@/entities/Word';

interface DifficultyLevelProps {
    className?: string
    difficultyLevel: WordType['difficultyLevel']
}

export const DifficultyLevel = memo((props: DifficultyLevelProps) => {
    const {
        className,
        difficultyLevel,
    } = props;

    const max = 10;
    let red;
    let green;
    if (difficultyLevel < (max / 2)) {
        const percent = (difficultyLevel - 1) / (max / 2);
        red = Math.round(255 * percent);
        green = 255;
    } else {
        const percent = (difficultyLevel - 5) / (max / 2);
        green = Math.round(255 * (1 - percent));
        red = 255;
    }

    return (
        <Description text={`Уровень сложности ${difficultyLevel}`}>
            <div
                data-testid="block"
                className={classNames(cls.DifficultyLevel, {}, [className])}

                // eslint-disable-next-line react/jsx-props-no-multi-spaces
                style={{ background: `rgb(${red},${green},0)` }}
            >
                <span>
                    {difficultyLevel}
                </span>
            </div>
        </Description>
    );
});
