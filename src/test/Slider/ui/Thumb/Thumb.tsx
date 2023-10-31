import {
    ForwardedRef, forwardRef,
    memo, MutableRefObject, useEffect, useImperativeHandle, useMemo, useRef, useState,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Thumb.module.scss';
import useMemoRef from '@/shared/hooks/useMemoRef';
import { Position } from '@/shared/lib/kit/position/position';
import { useDraggable } from '@/shared/hooks/useDraggable/useDraggable';
import intoBoundaries from '@/shared/hooks/useDraggable/handlers/intoBoundaries';
import inBoundaries from '@/shared/hooks/useDraggable/handlers/inBoundaries';

export interface ThumbProps {
    className?: string
    sliderRef: MutableRefObject<HTMLDivElement | null>
    thumbsRef: MutableRefObject<Array<HTMLDivElement | null>>
    value: number
    step: number
    length: number
    direction: 'Y' | 'X'
    onChange: (value: ThumbProps['value']) => void
}

const Thumb = (props: ThumbProps, ref: ForwardedRef<HTMLDivElement | null>) => {
    const {
        className,
        sliderRef,
        thumbsRef,
        value,
        step,
        onChange,
        length,
        direction = 'X',
        ...otherProps
    } = props;
    const [postValue, setPostValue] = useState(value);
    const thumbRef = useRef<HTMLDivElement | null>(null);
    useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(ref, () => thumbRef.current);
    const lens: Record<ThumbProps['direction'], 'offsetWidth' | 'offsetHeight'> = {
        X: 'offsetWidth',
        Y: 'offsetHeight',
    };
    const t = lens[direction];
    const [data, setData] = useState(0);
    useEffect(() => {
        if (thumbRef.current) {
            // console.log(data);
            setData(thumbRef.current[t]);
        }
    }, [data, t]);

    const factor = useMemoRef(() => {
        if (sliderRef.current && thumbRef.current) {
            return (sliderRef.current[t] - (thumbRef.current[t])) / length;
        }
        return 0;
    }, [sliderRef.current]);
    const stepSlider = useMemo<number>(() => factor * step, [factor, step]);

    const start = useMemo<Position>(() => (
        new Position([0, 0].map((o, i) => (
            i === ['X', 'Y'].findIndex((l) => l === direction)
                ? factor * (postValue) : 0
        )))
    ), [direction, factor, postValue]);

    const { onStartMove, startPos } = useDraggable({
        dragRef: thumbRef,
        step: stepSlider,
        direction,
        start,
        overLimitRefs: thumbsRef,
        onMove: (moveInfo) => {
            const postMoveInfo = [
                [
                    intoBoundaries,
                    { rootRef: sliderRef, startPos, childrenRef: thumbRef },
                ],
                [
                    inBoundaries,
                    {
                        dragElementsRef: thumbsRef,
                        dragRef: thumbRef,
                        direction,
                    },
                ],
            ].reduce((all, [func, args]) => {
                // @ts-ignore
                const data = func(all, args);
                return data;
            }, moveInfo);
            const fI = ['X', 'Y'].findIndex((o) => o === direction);
            const newValue = postMoveInfo.pos.position[fI] / factor;
            setPostValue(newValue);
            onChange(newValue);
        },
    }, []);

    return (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div
            className={classNames(cls.Thumb, {}, [className])}
            ref={thumbRef}
            onMouseDown={(e: any) => {
                onStartMove(e);
            }}
        />
    );
};
export default memo(forwardRef(Thumb));
