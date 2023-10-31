import { MutableRefObject } from 'react';
import { DraggableProps } from '@/shared/hooks/useDraggable/useDraggable';
import { Position } from '@/shared/lib/kit/position/position';

interface IntoBoundaries extends Pick<DraggableProps, 'direction'>{
    rootRef: MutableRefObject<HTMLElement | null>
    childrenRef: MutableRefObject<HTMLElement | null>
    startPos: Position
}

export default (
    moveInfo: Parameters<Required<DraggableProps>['onMove']>[0],
    {
        rootRef,
        startPos,
        childrenRef,
        direction,
    }: IntoBoundaries,
) => {
    if (!rootRef.current || !childrenRef.current) return moveInfo;
    const { pos, total } = moveInfo;
    const sliderB = rootRef.current!.getBoundingClientRect();
    const tmp = childrenRef.current!.getBoundingClientRect();
    const thumbB = {
        left: sliderB.left + startPos.position[0],
        right: sliderB.left + startPos.position[0] + tmp.width,
        top: sliderB.top + startPos.position[1],
        bottom: sliderB.top + startPos.position[1] + tmp.height,
        width: tmp.width,
        height: tmp.height,
    } as DOMRect;
    const v: Array<keyof DOMRect>[] = [['left', 'right'], ['top', 'bottom']];
    const vv = v.map((sides, sidesI) => {
        const fI = ['Y', 'X'].findIndex((o) => o === direction);
        if (fI === sidesI) {
            return 0;
        }
        return sides.reduce((all, side, sideI) => {
            const oper = ['<', '>'][sideI];
            const v1 = thumbB[side] as number + total.position[sidesI];
            const v2 = sliderB[side];
            const condit = [v1, oper, v2].join(' ');
            // eslint-disable-next-line no-eval
            if (eval(condit)) {
                if (sideI === 0) {
                    all = 0;
                } else if (sideI === 1) {
                    const len = ['width', 'height'][sidesI] as 'width' | 'height';
                    all = sliderB[len] - thumbB[len];
                }
            }
            return all;
        }, pos.position[sidesI]);
    });
    pos.set(vv);

    return moveInfo;
};
