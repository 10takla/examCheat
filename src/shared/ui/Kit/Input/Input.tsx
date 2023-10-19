import React, {
    ForwardedRef,
    forwardRef,
    InputHTMLAttributes,
    memo,
    useCallback,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Input.module.scss';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string
    isKeepingFocus?: boolean
}

export type InputRef = HTMLInputElement
const Input = (props: InputProps, ref: ForwardedRef<InputRef>) => {
    const {
        className,
        value,
        onChange,
        isKeepingFocus = false,
        onBlur,
        ...otherProps
    } = props;
    const inputRef = useRef<InputRef>(null);

    useImperativeHandle<InputRef | null, InputRef | null>(
        ref,
        () => inputRef.current,
    );

    const [postValue, setPostValue] = useState(value);

    useEffect(() => {
        setPostValue(String(value));
    }, [value]);

    const onInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setPostValue(event.target.value);
        onChange?.(event);
    }, [onChange]);

    const [widthInput, setWidthInput] = useState<number | null>(null);

    useEffect(() => {
        if (inputRef.current) {
            const inputElement = inputRef.current;
            const tempSpan = document.createElement('span');
            tempSpan.style.visibility = 'hidden';
            tempSpan.style.position = 'absolute';
            tempSpan.style.font = window.getComputedStyle(inputElement).getPropertyValue('font');
            tempSpan.style.fontSize = window.getComputedStyle(inputElement).getPropertyValue('font-size');
            tempSpan.style.fontFamily = window.getComputedStyle(inputElement).getPropertyValue('font-family');
            tempSpan.textContent = String(postValue);
            document.body.appendChild(tempSpan);
            setWidthInput(tempSpan.offsetWidth);
        }
    }, [postValue]);

    const onInputKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && ref) {
            // @ts-ignore
            onBlur?.(event);
        }
    }, [onBlur, ref]);

    return (
        <input
            onKeyUp={onInputKeyDown}
            ref={inputRef}
            {...{ ...otherProps, onBlur }}
            onChange={onInputChange}
            className={classNames(cls.Input, {}, [className])}
            value={postValue}
            data-keepingfocus={isKeepingFocus || undefined}
            // @ts-ignore
            style={{ '--length': `${widthInput}px` }}
        />
    );
};
export default memo(forwardRef(Input));
