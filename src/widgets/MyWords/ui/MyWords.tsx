import {
    memo, useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './MyWords.module.scss';
import { useGetMyWords } from '@/widgets/MyWords/api/myWords.api';
import { VStack } from '@/shared/ui/Stack';
import FetchErrorBoundary from '@/shared/ui/ErrorHandlers/FetchErrorBoundary/FetchErrorBoundary';
import MyWord from '@/widgets/MyWord/MyWord';

import { WordType } from '@/entities/Word';
import { AddMyWord } from '@/features/changeMyWord';
import { BoundaryWindow } from '@/shared/ui/BoundaryWindow/BoundaryWindow';

export interface MyWordsProps {
    className?: string
}

export const MyWords = memo((props: MyWordsProps) => {
    const {
        className,
    } = props;

    const {
        data: words,
        isLoading,
        error,
        refetch,
    } = useGetMyWords({});
    const [postWords, setPostWords] = useState(words ?? []);
    const listWordsRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        setPostWords(words ?? []);
    }, [words]);

    const onDelete = useCallback((wordId: WordType['id']) => {
        setPostWords(postWords?.filter(({ id }) => id !== wordId));
    }, [postWords]);

    const onAdd = useCallback(() => {
        refetch();
    }, [refetch]);

    const [isFocus, setIsFocus] = useState(false);

    const maxHeight = useMemo(() => {
        if (isFocus) {
            return listWordsRef.current?.clientHeight;
        }
        return null;
    }, [isFocus]);

    return (
        <BoundaryWindow padding={10}>
            <VStack className={classNames(cls.MyWords, {}, [className])}>
                <FetchErrorBoundary {...{ isLoading, error }}>
                    {postWords.length ? (
                        <VStack
                            className={cls.listWords}
                            ref={listWordsRef}
                            // @ts-ignore
                            style={{ '--maxHeight': `${maxHeight}px` }}
                        >
                            {postWords.map((word) => (
                                <MyWord
                                    key={word.id}
                                    {...{ word, onDelete }}
                                />
                            ))}
                        </VStack>
                    )
                        : <div>Пустой список</div>}
                </FetchErrorBoundary>
                <AddMyWord
                    className={cls.addMyWord}
                    onAdd={onAdd}
                    inputProps={{
                        onFocus: () => setIsFocus(true),
                        onBlur: () => setIsFocus(false),
                    }}
                />
            </VStack>
        </BoundaryWindow>
    );
});
