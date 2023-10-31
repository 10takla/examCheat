import {
    memo, useEffect, useMemo, useRef, useState,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Slider.module.scss';
import Thumb, { ThumbProps } from '@/test/Slider/ui/Thumb/Thumb';
import Flex, { FlexDirection } from '@/shared/ui/Stack/Flex/Flex';
import useUpdateState from '@/shared/hooks/useUpdateState';
import useMemoRef from '@/shared/hooks/useMemoRef';
import useResize from '@/shared/hooks/useResize';

import { Track } from '@/test/Slider/ui/Track/Track';
import { SIDES } from '@/test/Slider/const/const';
import { HStack } from '@/shared/ui/Stack';
import { MainTrack } from '@/test/Slider/ui/MainTrack/MainTrack';

export interface SliderProps extends Partial<Pick<ThumbProps, 'direction'>> {
    className?: string
    values: Array<ThumbProps['value']>
    onChange?: (values: SliderProps['values']) => void
    min?: number
    max?: number
    step?: number
}

export const Slider = memo((props: SliderProps) => {
    const {
        className,
        values = [0, 100],
        min = 0,
        max = 100,
        step = (max - min) / 20,
        direction = 'X',
        onChange,
        ...otherProps
    } = props;
    const length = max - min;
    const sliderRef = useRef<HTMLDivElement | null>(null);
    const thumbsRef = useRef<ThumbProps['thumbsRef']['current']>([]);

    const sortedValues = useMemo(() => {
        const sortedArray = [...values]; // Создаем копию массива
        return sortedArray.sort((a, b) => {
            if (a > b) {
                return 1;
            }
            if (a < b) {
                return -1;
            }
            return 0;
        });
    }, [values]);

    const sortedThumbs = useMemoRef(() => {
        const t = thumbsRef.current.sort((a, b) => {
            const aL = a?.getBoundingClientRect()[SIDES[direction].left];
            const bL = b?.getBoundingClientRect()[SIDES[direction].left];
            if (aL && bL) {
                if (aL > bL) {
                    return 1;
                }
                if (aL < bL) {
                    return -1;
                }
            }
            return 0;
        });
        return [...t];
    }, [sortedValues, thumbsRef.current]);
    const data = useMemoRef(() => sortedThumbs.length, [sortedThumbs]);

    return (
        <Flex
            className={classNames(cls.Slider, { [cls.column]: direction === 'Y' }, [className])}
            align="center"
            direction={{ X: 'row', Y: 'column' }[direction] as FlexDirection}
            ref={sliderRef}
        >
            <MainTrack
                className={cls.mainTrack}
                values={values}
                direction={direction}
                sliderRef={sliderRef}
                sortedThumbs={sortedThumbs}
            >
                {data > 1 && sortedThumbs.length
                    && Array(values.length - 1).fill(1).map((_, i) => (
                        <Track
                            className={classNames(cls.track, { [cls.column]: direction === 'Y' }, [className])}
                            key={String(`${i}`)}
                            thumbsRef={sortedThumbs}
                            firstI={i}
                            secondI={i + 1}
                            firstVal={values[i]}
                            secondVal={values[i + 1]}
                            direction={direction}
                        />
                    ))}
            </MainTrack>
            {values.map((value, i) => (
                <Thumb
                    key={String(`${i}`)}
                    ref={(re) => {
                        thumbsRef.current[i] = re;
                    }}
                    className={cls.thumb}
                    onChange={(val) => {
                        onChange?.(
                            values.map((o, k) => (
                                k === i ? val + min : o
                            )),
                        );
                    }}
                    value={value - min}
                    thumbsRef={thumbsRef}
                    {...{
                        length,
                        sliderRef,
                        direction,
                        step,
                    }}
                />
            ))}
        </Flex>

    );
});
