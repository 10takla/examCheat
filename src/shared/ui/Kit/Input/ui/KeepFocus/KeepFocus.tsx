import React, {
    cloneElement,
    ForwardedRef, HTMLAttributes, HTMLProps,
    InputHTMLAttributes,
    memo,
    MutableRefObject,
    ReactElement, useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import { use } from 'i18next';
import { InputRef } from '@/shared/ui/Kit/Input/Input';

export interface KeepFocusProps extends InputHTMLAttributes<InputRef> {
    className?: string
    children: ReactElement<HTMLProps<HTMLElement>>
    inputRef: MutableRefObject<InputRef | null>
}

export const KeepFocus = memo((props: KeepFocusProps) => {
    const {
        className,
        children,
        inputRef,
        ...otherProps
    } = props;
    const rootRef = useRef<HTMLElement | null>(null);

    const onMouseDown = useCallback((event: React.MouseEvent) => {
        if (inputRef.current === document.activeElement && event.target !== inputRef.current) {
            event.preventDefault();
        }
    }, [inputRef]);
    return (
        cloneElement(children, {
            onMouseDown,
            // @ts-ignore
            ref: rootRef,
        })
    );
});
