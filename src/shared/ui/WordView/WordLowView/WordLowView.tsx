import { HTMLAttributes, memo, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './WordLowView.module.scss';
import { HStack } from '@/shared/ui/Stack';
import { DifficultyLevel } from '@/shared/ui/Word/DifficultyLevel/DifficultyLevel';
import { SimilarLetters, SimilarLettersProps } from '@/shared/ui/WordView/ui/SimilarLetters/SimilarLetters';
import ExclamationPoint from '@/shared/assets/icons/exclamation_point.svg';
import Description from '@/shared/ui/Description/Description';
import { WordType } from '@/entities/Word';
import { FlexRef } from '@/shared/ui/Stack/Flex/Flex';

export interface WordLowViewProps extends Pick<SimilarLettersProps, 'search'>, HTMLAttributes<FlexRef> {
    className?: string
    word: WordType
}

export const WordLowView = memo((props: WordLowViewProps) => {
    const {
        className,
        word,
        search,
        ...otherProps
    } = props;
    const [isExactWord, setIsExactWord] = useState(false);

    return (
        <HStack
            className={classNames(cls.WordLowView, { [cls.exact]: isExactWord }, [className])}
            {...otherProps}
        >
            <HStack
                className={classNames(cls.word, { [cls.exact]: isExactWord })}
                gap="8"
            >
                <DifficultyLevel difficultyLevel={word.difficultyLevel} />
                <SimilarLetters className={cls.wordOnEng} {...{ search, setIsExactWord }}>
                    {word.wordOnEng}
                </SimilarLetters>
            </HStack>
            {isExactWord && (
                <Description text="Найдено слово">
                    <ExclamationPoint className={cls.exclamationPoint} />
                </Description>
            )}
        </HStack>
    );
});
