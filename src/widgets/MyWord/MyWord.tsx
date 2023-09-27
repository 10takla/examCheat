import {
    ForwardedRef,
    forwardRef, useCallback, useEffect, useState,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './MyWord.module.scss';
import Input from '@/shared/ui/Input/Input';
import { Word, WordProps } from '@/entities/Word/ui/Word';
import DeleteMyWord, { DeleteMyWordProps } from '@/features/changeMyWord/ui/DeleteMyWord/DeleteMyWord';
import { Translates, TranslatesProps } from '@/entities/Translates/ui/Translates';
import { VoicingAndTranscript } from '@/shared/ui/Word/VoicingAndTranscript/VoicingAndTranscript';
import { HStack } from '@/shared/ui/Stack';
import { FlexRef } from '@/shared/ui/Stack/Flex/Flex';

interface MyWordProps extends Pick<WordProps, 'word'>, Pick<DeleteMyWordProps, 'onDelete'> {
    className?: string
}

const MyWord = (props: MyWordProps, ref: ForwardedRef<FlexRef>) => {
    const {
        className,
        word,
        onDelete,
    } = props;

    const [postWord, setPostWord] = useState(word);

    useEffect(() => {
        setPostWord(word);
    }, [word]);

    const changeTranslates = useCallback<TranslatesProps['changeTranslatesCallback']>((myTranslates) => {
        setPostWord((prev) => ({ ...prev, myTranslates }));
    }, []);
    const [isHover, setIsHover] = useState(false);
    return (
        <HStack
            className={classNames(cls.MyWord, {}, [className])}
            justify="between"
            gap="8"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            {...{ ref }}
        >
            <DeleteMyWord
                className={classNames(cls.wordOnEng, {}, [className])}
                wordId={word.id}
                {...{ onDelete }}
                isActive={isHover}
            >
                <Input disabled value={postWord.wordOnEng} />
            </DeleteMyWord>
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

export default forwardRef(MyWord);
