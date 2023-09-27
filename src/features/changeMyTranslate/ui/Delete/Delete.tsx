import {
    ChangeEvent, cloneElement, memo, ReactElement, useCallback, useEffect, useRef, useState,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Delete.module.scss';
import { usePutMyTranslate } from '@/features/changeMyTranslate/api/addMyTranslate.api';
import { CloseElement } from '@/shared/ui/ExtraElement/CloseElement/CloseElement';
import { ChangeCallback, ChangeTranslateProps } from '@/features/changeMyTranslate/types/changeMyTranslate.types';

export interface DeleteMyTranslateProps extends ChangeTranslateProps {
    className?: string
    deleteTranslateCallback: ChangeCallback
    children: ReactElement
}

export const Delete = memo((props: DeleteMyTranslateProps) => {
    const {
        className,
        id,
        deleteTranslateCallback,
        myTranslates,
        children,
        value,
        onBlur,
        onFocus,
        ...otherProps
    } = props;
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [putTranslates, result] = usePutMyTranslate({});
    const [inputValue, setInputValue] = useState(value);

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    // eslint-disable-next-line no-shadow
    const onDeleteTranslate = useCallback((value: string) => {
        const t = myTranslates.filter((translate) => translate !== value);
        putTranslates({
            myTranslates: t,
            wordId: id,
        });
    }, [id, myTranslates, putTranslates]);

    useEffect(() => {
        if (result.isSuccess) {
            deleteTranslateCallback(result.data.myTranslates);
        }
    }, [putTranslates, deleteTranslateCallback, result]);

    const [isFocus, setIsFocus] = useState(false);

    const onPostFocus = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
        setIsFocus(true);
        onFocus?.(event);
    }, [onFocus]);

    const onPostBlur = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
        setIsFocus(false);
        onBlur?.(event);
    }, [onBlur]);

    return (
        <CloseElement
            isTurnOn={isFocus}
            className={classNames(cls.AddMyTranslate, {}, [className])}
            onClose={() => {
                onDeleteTranslate(inputValue as string);
            }}
        >
            {cloneElement(children, {
                ...otherProps,
                ref: inputRef,
                value: inputValue,
                onFocus: onPostFocus,
                onBlur: onPostBlur,
                onChange: (event: ChangeEvent<HTMLInputElement>) => {
                    setInputValue(event.currentTarget.value);
                },
            })}
        </CloseElement>
    );
});
