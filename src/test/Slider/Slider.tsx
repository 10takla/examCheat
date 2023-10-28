import { useTranslation } from 'react-i18next';
import {
    memo, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Slider.module.scss';
import useCursorMove from '@/shared/hooks/useCursorMove';
import { Position } from '@/shared/lib/kit/position/position';
import { useDraggable } from '@/shared/hooks/useDraggable';

export interface SliderProps {
    className?: string
    value: number
    min: number
    max: number
    direction?: 'Y' | 'X'
}

export const Slider = memo((props: SliderProps) => {
    const {
        className,
        value = 20,
        min = 0,
        max = 100,
        direction = 'X',
        ...otherProps
    } = props;
    const length = max - min;
    const step = length / 20;
    const sliderRef = useRef<HTMLDivElement | null>(null);
    const thumbRef = useRef<HTMLDivElement | null>(null);
    const factor = useRef(0);
    useImperativeHandle(factor, () => (sliderRef.current ? sliderRef.current.offsetWidth : 0) / length);
    const stepSlider = step * factor.current;

    const { onStartMove } = useDraggable({
        dragRef: thumbRef,
        step: stepSlider,
        direction,
        onMove: ({ pos, curr }) => {
            const sliderB = sliderRef.current?.getBoundingClientRect();
            const thumbB = thumbRef.current?.getBoundingClientRect();
            // console.log(sliderB.left);
            // console.log(thumbB.left, curr.position[0]);
            // if (thumbB.left + curr.position[0] <= sliderB.left) {
            //     pos.set([0, 0]);
            // }
        },
    });

    return (
        <div
            className={classNames(cls.Slider, {}, [className])}
            ref={sliderRef}
        >
            <div
                className={cls.thumb}
                ref={thumbRef}
                onMouseDown={(e: any) => {
                    onStartMove(e);
                }}
            />
        </div>
    );
});
