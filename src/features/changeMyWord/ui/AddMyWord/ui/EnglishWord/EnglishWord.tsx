import {
    FocusEvent, InputHTMLAttributes, memo, useCallback, useEffect, useRef, useState,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './EnglishWord.module.scss';
import Input, { InputRef } from '@/shared/ui/Kit/Input/Input';
import { VStack } from '@/shared/ui/Stack';
import { KeepFocus } from '@/shared/ui/Kit/Input/ui/KeepFocus/KeepFocus';
import { SearchWordProps } from '@/features/SearchWord/ui/SearchWord';
import { SearchWord } from '@/features/SearchWord';
import { BoundaryElement } from '@/shared/ui/BoundaryWindow/BoundaryWindow';

export interface EnglishWordProps extends Pick<SearchWordProps, 'onSelectWord'>,
    InputHTMLAttributes<InputRef> {
    className?: string
}

export const EnglishWord = memo((props: EnglishWordProps) => {
    const {
        className,
        onSelectWord,
        onFocus,
        onBlur,
        ...otherProps
    } = props;

    const [search, setSearch] = useState('');
    const [isFocus, setIsFocus] = useState(false);

    const onInputChange = useCallback((event: FocusEvent<InputRef>) => {
        setSearch(event.target.value);
    }, []);

    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        // setSearch('so');
        // inputRef.current?.focus();
        // setIsFocus(true);
    }, []);

    const onPostFocus = useCallback((event: FocusEvent<InputRef>) => {
        setIsFocus(true);
        onFocus?.(event);
    }, [onFocus]);

    const onPostBlur = useCallback((event: FocusEvent<InputRef>) => {
        // setIsFocus(false);
        onBlur?.(event);
    }, [onBlur]);

    return (
        <KeepFocus inputRef={inputRef}>
            <VStack
                className={classNames(cls.WordOnEngInput, {}, [className])}
            >
                <Input
                    {...otherProps}
                    onFocus={onPostFocus}
                    onBlur={onPostBlur}
                    value={search}
                    onChange={onInputChange}
                    ref={inputRef}
                />
                {!!search && isFocus && (
                    <SearchWord
                        className={cls.searchWord}
                        {...{ search, onSelectWord }}
                    />
                )}
            </VStack>
        </KeepFocus>
    );
});
