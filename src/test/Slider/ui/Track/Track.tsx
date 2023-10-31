import { memo, useEffect, useRef } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Track.module.scss';
import { ThumbProps } from '@/test/Slider/ui/Thumb/Thumb';
import useMemoRef from '@/shared/hooks/useMemoRef';
import getRgbGradient from '@/shared/lib/getRgbGradient/getRgbGradient';
import { SIDES } from '@/test/Slider/const/const';
import useUpdateState from '@/shared/hooks/useUpdateState';

export interface TrackProps extends Pick<ThumbProps, 'direction'> {
    className?: string
    thumbsRef: ThumbProps['thumbsRef']['current']
    firstI: number
    secondI: number
    firstVal: number
    secondVal: number
}

export const Track = memo((props: TrackProps) => {
    const {
        className,
        firstI,
        secondI,
        firstVal,
        secondVal,
        thumbsRef,
        direction,
        ...otherProps
    } = props;
    const side = SIDES[direction];
    const firstEl = thumbsRef[firstI]!;
    const secondEl = thumbsRef[secondI]!;
    const trackRef = useRef<HTMLDivElement | null>(null);

    const trackB = useMemoRef<DOMRect>(() => {
        if (trackRef.current) {
            return (trackRef.current.getBoundingClientRect());
        }
    }, []);

    const [width] = useUpdateState(() => {
        const [firstL, secondL] = [firstEl, secondEl].map((o) => (
            Number(o.getBoundingClientRect()[side.left])
        ));
        return secondL - firstL;
    }, [firstEl, firstVal, secondEl, secondVal, side.left]);
    const [left] = useUpdateState(() => {
        if (trackB) {
            const firstB = firstEl.getBoundingClientRect();
            return Number(firstB[side.left]) + Number(firstB[side.width]) - Number(trackB[side.left]);
        }
        return firstEl.offsetWidth / 2;
    }, [firstEl, firstVal, secondVal, side.left, side.width, trackB]);

    const [y] = useUpdateState(() => getRgbGradient(firstI, {
        degree: 5,
        start: [0, 67, 144],
    }), [firstVal, secondVal]);

    return (
        <div
            className={classNames(cls.Track, {}, [className])}
            style={{
                background: y,
                transform: `translate${direction}(${left}px)`,
                [side.width]: `${width}px`,
            }}
            ref={trackRef}
        />
    );
});
