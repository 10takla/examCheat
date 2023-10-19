import {
    cloneElement, memo, ReactElement, useCallback, useEffect, useRef, useState,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Add.module.scss';
import { AddElement } from '@/shared/ui/ExtraElement/AddElement/AddElement';
import { usePutMyTranslate } from '@/features/changeMyTranslate/api/addMyTranslate.api';
import { KeepFocus } from '@/shared/ui/Kit/Input/ui/KeepFocus/KeepFocus';
import useError from '@/features/changeMyTranslate/hooks/useError/useError';
import Tmp from '@/features/changeMyTranslate/ui/ui/Tmp/Tmp';
import { MyWordType } from '@/entities/Word/types/word.types';
import { ChangeTranslateProps } from '@/features/changeMyTranslate/types/changeMyTranslate.types';

export interface AddMyTranslateProps extends ChangeTranslateProps {
    className?: string
    addTranslateCallback: (myTranslates: MyWordType['myTranslates']) => void
    children: ReactElement
}

export const Add = memo((props: AddMyTranslateProps) => {
    const {
        className,
        id,
        addTranslateCallback,
        translates,
        myTranslates,
        onChange,
        children,
    } = props;
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [putTranslates, result] = usePutMyTranslate({});
    const [inputValue, setInputValue] = useState('');
    const [checkForCorrect, error] = useError([...translates, ...myTranslates], []);

    const tmp = useCallback((value: string) => {
        putTranslates({ myTranslates: [...myTranslates, value], wordId: id });
    }, [id, myTranslates, putTranslates]);

    useEffect(() => {
        if (result.isSuccess) {
            addTranslateCallback(result.data.myTranslates);
            setInputValue('');
            inputRef.current?.focus();
        }
    }, [putTranslates, addTranslateCallback, result]);

    const onInputBlur = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        if (value.length) {
            if (!error) {
                tmp(value);
            }
        }
    }, [error, tmp]);

    const onInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
        const { value } = event.currentTarget;
        checkForCorrect(value);
        onChange?.(event);
    }, [checkForCorrect, onChange]);

    return (
        <Tmp {...{
            translates, myTranslates, id,
        }}
        >
            <KeepFocus inputRef={inputRef}>
                <AddElement
                    isOnlyVisible={false}
                    className={classNames(cls.AddMyTranslate, {}, [className])}
                >
                    {cloneElement(children, {
                        value: inputValue,
                        ref: inputRef,
                        isErrorOnlyShow: true,
                        error,
                        onChange: onInputChange,
                        className: classNames(
                            cls.input,
                            { [cls.error]: !!error },
                        ),
                        autoFocus: true,
                        isKeepingFocus: true,
                        onBlur: onInputBlur,
                    })}
                </AddElement>
            </KeepFocus>
        </Tmp>
    );
});
