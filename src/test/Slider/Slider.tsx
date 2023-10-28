import { useTranslation } from 'react-i18next';
import {
    memo, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Slider.module.scss';
import useCursorMove from '@/shared/hooks/useCursorMove';
import { Position } from '@/shared/lib/kit/position/position';
import { getTransition, useDraggable } from '@/shared/hooks/useDraggable';
import useMemoRef from '@/shared/hooks/useMemoRef';

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
    // eslint-disable-next-line max-len
    useImperativeHandle(factor, () => (sliderRef.current ? sliderRef.current.offsetWidth - thumbRef.current?.offsetWidth : 0) / length);
    const stepSlider = useMemoRef<number>(() => factor.current * step, [factor.current]);

    const start = useMemoRef<Position>(() => (
        new Position([factor.current * value, 0])
    ), [factor.current]);
    const startPos = useMemoRef(() => getTransition(thumbRef.current ? thumbRef.current : [0, 0]), [thumbRef.current]);
    console.log(startPos);
    const { onStartMove } = useDraggable({
        dragRef: thumbRef,
        step: stepSlider,
        direction,
        start,
        onMove: ({ pos, curr }) => {
            const sliderB = sliderRef.current!.getBoundingClientRect();
            const thumbB = thumbRef.current!.getBoundingClientRect();

            if (thumbB.left + curr.position[0] <= sliderB.left) {
                pos.set([0, 0]);
            }
            getTransition(thumbRef.current!);
        },
    });
    return (
        <div
            className={classNames(cls.Slider, {}, [className])}
            ref={sliderRef}
        >
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
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
