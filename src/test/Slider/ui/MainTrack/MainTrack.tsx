import { memo, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './MainTrack.module.scss';
import Flex, { FlexDirection } from '@/shared/ui/Stack/Flex/Flex';
import { ThumbProps } from '@/test/Slider/ui/Thumb/Thumb';
import { SliderProps } from '@/test/Slider/Slider';
import { SIDES } from '@/shared/const/translate';

export interface MainTrackProps extends Pick<ThumbProps, 'direction' | 'sliderRef'>, Pick<SliderProps, 'values'> {
    className?: string
    sortedThumbs: ThumbProps['thumbsRef']['current']
    children: ReactNode
}

export const MainTrack = memo((props: MainTrackProps) => {
    const {
        className,
        direction,
        sliderRef,
        values,
        sortedThumbs,
        children,
        ...otherProps
    } = props;

    const t = SIDES[direction].width;
    const t1 = sliderRef.current?.getBoundingClientRect()[t];
    const t2 = sortedThumbs[0]?.getBoundingClientRect()[t];
    const t3 = t1 - t2;
    return (
        <Flex
            className={classNames(cls.MainTrack, {}, [className])}
            direction={{ X: 'row', Y: 'column' }[direction] as FlexDirection}
            style={{
                [SIDES[direction].left]: `${t2 / 2}px`,
                [t]: `${t3}px`,
            }}
            align="center"
        >
            {children}
        </Flex>
    );
});
