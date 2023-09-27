import {
    cloneElement, ForwardedRef, forwardRef, memo, ReactElement, useEffect, useRef,
} from 'react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

export interface FetchErrorBoundaryProps {
    className?: string
    isLoading: boolean
    error?: FetchBaseQueryError | SerializedError
    children: ReactElement
}

const FetchErrorBoundary = (props: FetchErrorBoundaryProps, ref: ForwardedRef<HTMLDivElement>) => {
    const {
        className,
        isLoading,
        error,
        children,
    } = props;

    const myDivRef = useRef(null);

    useEffect(() => {
        if (isLoading) {
            if (ref) {
                if (typeof ref === 'function') {
                    ref(myDivRef.current);
                } else {
                    ref.current = myDivRef.current;
                }
            }
        } else if (ref) {
            if (typeof ref === 'function') {
                ref(null);
            } else {
                ref.current = null;
            }
        }
    }, [isLoading, ref]);

    if (isLoading) {
        return <div className={className} ref={myDivRef}>...</div>;
    }
    if (error) {
        return <div className={className} ref={myDivRef}>Ошибка</div>;
    }
    return (
        cloneElement(children, {
            ref: myDivRef,
        })
    );
};
export default memo(forwardRef(FetchErrorBoundary));
