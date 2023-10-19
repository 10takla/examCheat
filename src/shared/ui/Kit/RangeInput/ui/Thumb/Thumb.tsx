import {
    HTMLProps, memo, MutableRefObject, Suspense, useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Thumb.module.scss';

export interface ThumbProps {
    className?: string
    sliderRef: MutableRefObject<any>
    value: number
    max: number
    min: number
    index: number
    onChange: (value: number, index: number) => void
    length: number
}

export const Thumb = memo((props: ThumbProps) => {
    const {
        className,
        max,
        min,
        value,
        sliderRef,
        index,
        onChange,
        length,
        ...otherProps
    } = props;
    const [postValue, setPostValue] = useState(value);

    const thumbRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        onChange?.(postValue, index);
    }, [index, onChange, postValue]);

    const [shift, setShift] = useState(0);
    const [factor, setFactor] = useState(1);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleResize = () => {
        const slider = sliderRef.current?.getBoundingClientRect();
        const thumb = thumbRef.current!.getBoundingClientRect();
        if (slider) {
            setFactor((slider.width - thumb.width) / length);
        }
    };
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [handleResize, length, sliderRef]);

    useEffect(() => {
        setShift(factor * postValue);
    }, [factor, length, sliderRef, postValue]);

    const onDivMouseDown = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        const cursorStart = event.clientX;
        const thumb = thumbRef.current!.getBoundingClientRect();
        const slider = sliderRef.current!.getBoundingClientRect();
        const leftBoard = slider.left + min * factor;
        const rightBoard = slider.left + max * factor;
        const move = (e: MouseEvent) => {
            const movement = e.clientX - cursorStart;
            setPostValue(movement + shift / factor);
        };

        function drop() {
            document.removeEventListener('mousemove', move);
            document.removeEventListener('mouseup', drop);
            document.body.style.userSelect = 'auto';
        }

        document.addEventListener('mousemove', move);
        document.addEventListener('mouseup', drop);
        document.body.style.userSelect = 'none';
    }, [factor, max, min, sliderRef]);

    return (
        <div
            ref={thumbRef}
            className={classNames(cls.Thumb, {}, [className])}
            onMouseDown={onDivMouseDown}
            style={{
                left: `${shift}px`,
            }}
        />
    );
});
