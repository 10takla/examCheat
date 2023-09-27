import {
    ReactElement, useCallback, useEffect, useState,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Word.module.scss';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Voicing } from '@/shared/ui/Word/VoicingAndTranscript/ui/Voicing/Voicing';
import { WordType } from '@/entities/Word';
import { Translates, TranslatesProps } from '@/entities/Translates/ui/Translates';
import { VoicingAndTranscript } from '@/shared/ui/Word/VoicingAndTranscript/VoicingAndTranscript';

export interface WordProps {
    className?: string
    word: WordType
    children: ReactElement
}

export const Word = (props: WordProps) => {
    const {
        className,
        word,
        children,
    } = props;

    const [postWord, setPostWord] = useState(word);

    useEffect(() => {
        setPostWord(word);
    }, [word]);

    const changeTranslates = useCallback<TranslatesProps['changeTranslatesCallback']>((myTranslates) => {
        setPostWord((prev) => ({ ...prev, myTranslates }));
    }, []);

    return (
        <HStack
            className={classNames(cls.Word, {}, [className])}
            justify="between"
        >
            {children}
            <VoicingAndTranscript
                className={cls.voicingAndTranscript}
                {...postWord}
            />
            <Translates
                className={cls.translates}
                {...postWord}
                changeTranslatesCallback={changeTranslates}
            />
        </HStack>
    );
};
