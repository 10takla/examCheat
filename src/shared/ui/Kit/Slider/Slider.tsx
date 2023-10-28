import {
    ForwardedRef,
    forwardRef,
    HTMLProps, memo, Suspense, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Slider.module.scss';
import Thumb, { ThumbProps } from '@/shared/ui/Kit/Slider/ui/Thumb/Thumb';
import { HStack } from '@/shared/ui/Stack';
import useUpdateState from '@/shared/hooks/useUpdateState';
import { FlexRef } from '@/shared/ui/Stack/Flex/Flex';
import Draggable from '@/shared/ui/Kit/Draggable/ui/Draggable/Draggable';
import InBoundaries from '@/shared/ui/Kit/Draggable/ui/InBoundaries/InBoundaries';

export interface RangeInputProps {
    className?: string
    values: number[]
    onChange: (values: RangeInputProps['values']) => void
    min?: number
    max?: number
}

const Slider = (props: RangeInputProps, ref: ForwardedRef<FlexRef>) => {
    const {
        className,
        onChange,
        min = 0,
        max = 100,
        values,
        ...otherProps
    } = props;
    const sliderRef = useRef<HTMLDivElement | null>(null);
    useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(ref, () => sliderRef.current);

    const [postValues, setPostValues] = useUpdateState<number[]>((
        () => {
            const tmp = values.sort((a, b) => (a > b ? 1 : a < b ? -1 : 0));
            if (tmp[0] < min) {
                tmp.splice(0, 1, min);
            }
            if (tmp[tmp.length - 1] > max) {
                tmp.splice(tmp.length - 1, 1, max);
            }
            return tmp;
        }
    )(), []);

    // useEffect(() => {
    //     onChange?.(postValues);
    // }, [onChange, postValues]);

    const thumbsRef = useRef<ThumbProps['thumbsRef']['current']>([]);
    return (
        <HStack
            className={classNames(cls.RangeInput, {}, [className])}
            ref={sliderRef}
        >
            {postValues.map((value, i) => (
                <Thumb
                    key={String(`${i}`)}
                    ref={(re) => {
                        thumbsRef.current[i] = re;
                    }}
                    thumbsRef={thumbsRef}
                    value={value}
                    index={i}
                    sliderMin={min}
                    sliderMax={max}
                    min={postValues[i - 1] ?? min}
                    max={postValues[i + 1] ?? max}
                    onChange={(value: number) => {
                        onChange?.(
                            postValues.map((o, k) => {
                                if (k === i) {
                                    return value;
                                }
                                return o;
                            }),
                        );
                    }}
                    className={cls.thumb}
                    {...{ sliderRef }}
                    length={max - min}
                />

            ))}
        </HStack>
    );
};
export default memo(forwardRef(Slider));
