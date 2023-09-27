import {
    HTMLProps, memo, useCallback, useEffect,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AddMyWord.module.scss';
import { AddElement } from '@/shared/ui/ExtraElement/AddElement/AddElement';
import { useAddMyWord } from '@/features/changeMyWord/api/changeMyWord.api';
import { WordType } from '@/entities/Word/types/word.types';
import { EnglishWord } from '@/features/changeMyWord/ui/AddMyWord/ui/EnglishWord/EnglishWord';
import { InputRef } from '@/shared/ui/Input/Input';

interface AddMyWordProps {
    className?: string
    onAdd?: () => void
    inputProps: HTMLProps<InputRef>
}

export const AddMyWord = memo((props: AddMyWordProps) => {
    const {
        className,
        onAdd,
        inputProps,
    } = props;
    const [createMyWord, result] = useAddMyWord();

    const onSelectWord = useCallback(async (id: WordType['id']) => {
        createMyWord(id);
    }, [createMyWord]);

    useEffect(() => {
        if (result.isSuccess) {
            onAdd?.();
        }
    }, [result, onAdd]);

    return (
        <AddElement
            className={classNames(cls.AddMyWord, {}, [className])}
            isOnlyVisible
        >
            <EnglishWord
                {...inputProps}
                onSelectWord={onSelectWord}
            />
        </AddElement>
    );
});
