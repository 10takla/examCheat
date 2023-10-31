import {
    ForwardedRef,
    forwardRef,
    memo,
    MutableRefObject,
    useCallback,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Thumb.module.scss';
import { FlexRef } from '@/shared/ui/Stack/Flex/Flex';
import useUpdateState from '@/shared/hooks/useUpdateState';
import { MoveMeasures } from '@/shared/hooks/useCursorMove';
import { Position } from '@/shared/lib/kit/position/position';
import useResize from '@/shared/hooks/useResize';
import { DragIntersectProps, useDraggable, useDragIntersect } from '@/shared/hooks/useDraggable/useDraggable';

export interface ThumbProps {
    className?: string
    sliderRef: MutableRefObject<FlexRef | null>
    value: number
    max: number
    min: number
    sliderMin: number
    sliderMax: number
    index: number
    step?: number
    onChange: (value: number) => void
    length: number
    thumbsRef: MutableRefObject<DragIntersectProps['dragElements']>
}

const Thumb = (props: ThumbProps, ref: ForwardedRef<FlexRef>) => {
    const {
        className,
        max,
        min,
        sliderMin,
        sliderMax,
        value,
        step = (max - min) / 20,
        sliderRef,
        index,
        onChange,
        thumbsRef,
        length,
        ...otherProps
    } = props;
    const [postValue, setPostValue] = useUpdateState(value);
    const [factor, setFactor] = useState(0);
    const thumbRef = useRef<HTMLDivElement | null>(null);

    useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(
        ref,
        () => thumbRef.current,
    );

    useResize(() => {
        if (thumbRef.current && sliderRef.current) {
            const sliderB = sliderRef.current.getBoundingClientRect();
            const thumbB = thumbRef.current.getBoundingClientRect();
            const f = (sliderB.width - thumbB.width) / length;
            setFactor(f);
        }
    });
    useEffect(() => {
        if (thumbRef.current && factor) {
            // console.log((postValue - min) * factor, postValue);
            thumbRef.current.style.transform = `translateX(${(postValue - sliderMin) * factor}px)`;
        }
    }, [factor, min, postValue, sliderMin]);

    const { onStartMove } = useDraggable({
        dragRef: thumbRef,
        direction: 'X',
        // dragElements: thumbsRef.current.filter((_, i) => i !== index),
        step: step * factor,
        isReverse: false,
        onMove: ({ total }) => {
            onChange?.(total.position[0] / factor);
        },
    });

    return (
        <div
            ref={thumbRef}
            {...otherProps}
            onMouseDown={(e: any) => {
                onStartMove?.(e);
            }}
            className={classNames(cls.Thumb, {}, [className])}
        />
    );
};
export default memo(forwardRef(Thumb));
