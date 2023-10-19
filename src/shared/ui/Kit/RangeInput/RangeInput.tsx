import {
    HTMLProps, memo, Suspense, useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './RangeInput.module.scss';
import { Thumb, ThumbProps } from '@/shared/ui/Kit/RangeInput/ui/Thumb/Thumb';
import { HStack } from '@/shared/ui/Stack';
import useUpdateState from '@/shared/hooks/useUpdateState';

export interface RangeInputProps{
    className?: string
    values: number[]
    onChange: (values: RangeInputProps['values']) => void
    min?: number
    max?: number
}

export const RangeInput = memo((props: RangeInputProps) => {
    const {
        className,
        min = 0,
        max = 100,
        onChange,
        values,
        ...otherProps
    } = props;
    const sliderRef = useRef<HTMLDivElement | null>(null);
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
    )());

    useEffect(() => {
        setPostValues(
            postValues,
        );
    }, [max, min, postValues, setPostValues]);

    useEffect(() => {
        onChange?.(postValues);
    }, [onChange, postValues]);

    const onThumbChange = useCallback<ThumbProps['onChange']>((value, index) => {
        postValues.splice(index, 1, value);
        setPostValues(postValues);
    }, [postValues, setPostValues]);

    return (
        <HStack
            className={classNames(cls.RangeInput, {}, [className])}
            ref={sliderRef}
            // justify="between"
        >
            { postValues.map((value, i) => (
                <Thumb
                    key={value}
                    value={value}
                    index={i}
                    min={postValues[i - 1] ?? min}
                    max={postValues[i + 1] ?? max}
                    onChange={onThumbChange}
                    className={cls.thumb}
                    {...{ sliderRef }}
                    length={max - min}
                />
            ))}
        </HStack>
    );
});
