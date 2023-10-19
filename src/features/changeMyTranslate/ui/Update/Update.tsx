import React, {
    cloneElement,
    ForwardedRef,
    forwardRef,
    memo,
    ReactElement,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Update.module.scss';
import { usePutMyTranslate } from '@/features/changeMyTranslate/api/addMyTranslate.api';
import { InputRef } from '@/shared/ui/Kit/Input/Input';
import useError from '@/features/changeMyTranslate/hooks/useError/useError';
import { KeepFocus } from '@/shared/ui/Kit/Input/ui/KeepFocus/KeepFocus';
import { BackupElement } from '@/shared/ui/ExtraElement/BackupElement/BackupElement';
import { TranslateProps } from '@/shared/ui/Word/Translate/Translate';
import { MyWordType } from '@/entities/Word/types/word.types';
import { ChangeTranslateProps } from '@/features/changeMyTranslate/types/changeMyTranslate.types';

export interface UpdateProps extends ChangeTranslateProps {
    className?: string
    updateTranslateCallback: (myTranslates: MyWordType['myTranslates']) => void
    index: number
    children: ReactElement<TranslateProps>
}

const Update = (props: UpdateProps, ref: ForwardedRef<InputRef>) => {
    const {
        className,
        id,
        updateTranslateCallback,
        translates,
        myTranslates,
        onChange,
        children,
        index,
        value,
        onBlur,
        ...otherProps
    } = props;
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [putTranslates, result] = usePutMyTranslate({});
    const [inputValue, setInputValue] = useState(value);
    const [checkForCorrect, error] = useError([...translates, ...myTranslates], [], index + translates.length);
    const [isChanged, setIsChanged] = useState(false);
    const prevValue = useMemo(() => value, []);

    useEffect(() => {
        setInputValue(value);
    }, [value]);
    // eslint-disable-next-line no-shadow
    const tmp = useCallback((value: string) => {
        const t = myTranslates.map((o, i) => (index === i ? value : o));
        putTranslates({ myTranslates: t, wordId: id });
    }, [id, index, myTranslates, putTranslates]);

    useEffect(() => {
        if (result.isSuccess) {
            updateTranslateCallback(result.data.myTranslates);
        }
    }, [putTranslates, updateTranslateCallback, result]);

    const onPostBlur = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
        const translate = event.currentTarget.value;
        if (translate.length) {
            if (!error && translate !== prevValue) {
                tmp(translate);
            }
        }
        setIsChanged(false);
        onBlur?.(event);
    }, [error, onBlur, prevValue, tmp]);

    const onPostChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
        // eslint-disable-next-line no-shadow
        const { value } = event.currentTarget;
        checkForCorrect(value);
        setIsChanged(prevValue !== value);
        onChange?.(event);
    }, [checkForCorrect, onChange, prevValue]);

    const postError = error ? { error } : {};

    return (
        <KeepFocus inputRef={inputRef}>
            <BackupElement
                isTurnOn={isChanged}
                onClose={() => {
                    setInputValue(prevValue);
                    checkForCorrect(prevValue as string);
                }}
            >
                {cloneElement(children, {
                    ...otherProps,
                    value: inputValue,
                    isErrorOnlyShow: true,
                    onChange: onPostChange,
                    className: classNames(
                        cls.input,
                        { [cls.error]: !!error },
                        [className],
                    ),
                    isKeepingFocus: true,
                    onBlur: onPostBlur,
                    // @ts-ignore
                    ref: inputRef,
                    ...postError,
                })}
            </BackupElement>
        </KeepFocus>
    );
};
export default memo(forwardRef(Update));
