import { MutableRefObject } from 'react';
import { DraggableProps, getTransition } from '@/shared/hooks/useDraggable/useDraggable';

export interface DragIntersectProps extends DraggableProps {
    dragElementsRef: MutableRefObject<Array<HTMLElement>>
}

export default (
    moveInfo: Parameters<Required<DraggableProps>['onMove']>[0],
    {
        dragElementsRef, dragRef, direction,
    }: DragIntersectProps,
) => {
    const { curr, pos } = moveInfo;
    if (dragRef.current) {
        dragElementsRef.current.splice(0, 1).forEach((el) => {
            const staticElB = el.getBoundingClientRect();
            const dragElB = dragRef.current!.getBoundingClientRect();
            const allDirs: Record<'X' | 'Y', Array<keyof DOMRect>> = {
                X: ['left', 'right'],
                Y: ['top', 'bottom'],
            };

            const blockPos = Object.entries(allDirs).map(([dir, sides], dirI) => {
                if (direction && dir !== direction) {
                    return 0;
                }
                // console.log(sides);
                const blockAxisPos = sides.reduce((sum, side, sideI) => {
                    const moveVal = dragElB[side] as number + curr.position[sideI];
                    const condition = sides.map((dir1) => staticElB[dir1])
                        .map((n, io) => (
                            [moveVal, ['>=', '<='][io], n].join(' ')
                        )).join(' && ');
                    // eslint-disable-next-line no-eval
                    if (eval(condition)) {
                        sum.push(
                            staticElB[sides[sideI === 0 ? 1 : 0]] as number,
                        );
                    }
                    return sum;
                }, [] as Array<number>);
                if (blockAxisPos.length) {
                    return blockAxisPos[0];
                }
                return 0;
            });
            // console.log(blockPos);
            if (blockPos.some((o) => o)) {
                // console.log(getTransition(dragRef.current!).add(curr), '2');
                pos.set(getTransition(dragRef.current!).add(curr));
            }
        });
    }
    return moveInfo;
};
