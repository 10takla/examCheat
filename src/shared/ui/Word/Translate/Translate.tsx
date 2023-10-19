import {
    FocusEvent, ForwardedRef, forwardRef, memo, useCallback, useRef, useState,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Translate.module.scss';
import Input, { InputProps, InputRef } from '@/shared/ui/Kit/Input/Input';
import Description from '@/shared/ui/Description/Description';

export interface TranslateProps extends InputProps {
    className?: string
    error?: string | null
    isErrorOnlyShow?: boolean
}

const Translate = (props: TranslateProps, ref: ForwardedRef<InputRef>) => {
    const {
        className,
        error,
        isErrorOnlyShow = false,
        onBlur,
        onFocus,
        ...otherProps
    } = props;
    const [isFocus, setIsFocus] = useState(false);

    const postOnFocus = useCallback((event: FocusEvent<HTMLInputElement>) => {
        setIsFocus(true);
        onFocus?.(event);
    }, [onFocus]);

    const postOnBlur = useCallback((event: FocusEvent<HTMLInputElement>) => {
        setIsFocus(false);
        onBlur?.(event);
    }, [onBlur]);

    const inputRef = useRef<InputRef | null>(null);

    return (
        <Description
            className={cls.description}
            isTurnOff={!error}
            isOnlyShow={!!error && isErrorOnlyShow && isFocus}
            text={error ?? ''}
        >
            <Input
                {...{ ...otherProps }}
                ref={(input) => {
                    inputRef.current = input;
                    if (typeof ref === 'function') {
                        ref(input);
                    } else if (ref) {
                        ref.current = input;
                    }
                }}
                onBlur={postOnBlur}
                onFocus={postOnFocus}
                className={classNames(
                    cls.Translate,
                    { [cls.error]: !!error },
                    [className],
                )}
            />
        </Description>
    );
};

export default memo(forwardRef(Translate));
