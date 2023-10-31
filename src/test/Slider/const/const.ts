import { ThumbProps } from '@/test/Slider/ui/Thumb/Thumb';

type Sides = Record<ThumbProps['direction'], Record<keyof DOMRect, keyof DOMRect>>

export const SIDES: Sides = {
    X: { width: 'width', left: 'left', height: 'height' },
    Y: { width: 'height', left: 'top', height: 'width' },
};

export const FLIP_SIDES = Object.entries({
    width: 'height', left: 'right', top: 'bottom',
}).reduce((all, [key, value]) => (
    { ...all, [key]: value, [value]: key }
), {} as Record<keyof DOMRect, keyof DOMRect>);
