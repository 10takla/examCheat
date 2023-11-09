import { MutableRefObject, useCallback } from 'react';
import useCursorMove, { CursorMoveProps, MoveMeasures } from '@/shared/hooks/useCursorMove';
import { Position } from '@/shared/lib/kit/position/position';
import { Transition } from '@/shared/lib/kit/transition/transition';
import useMemoRef from '@/shared/hooks/useMemoRef';
import { Direction } from '@/shared/lib/kit/direction/direction';
import positionToRect from '@/shared/hooks/useDraggable/handlers/positionToRect';
import inBoundaries from '@/shared/hooks/useDraggable/handlers/inBoundaries';
import intoBoundaries from '@/shared/hooks/useDraggable/handlers/intoBoundaries';
import IntersectionRectangles from '@/shared/lib/kit/transition/IntersectionRectangles';
import Rectangle from '@/shared/lib/kit/transition/Rectangle';
import { flipSides } from '@/shared/lib/kit/direction/side';

type i = ConstructorParameters<typeof Transition>[1]

export interface DraggableProps {
    dragRef: MutableRefObject<HTMLDivElement | null>
    direction?: Direction
    onMove?: (moveInfo: (MoveMeasures & Record<'pos', Position>)) => void
    isReverse?: boolean
    step?: number
    intoRef: MutableRefObject<HTMLElement | null>
    inRef: MutableRefObject<Array<HTMLElement>>
}

export const useDraggable = ({
    dragRef,
    direction,
    onMove,
    isReverse = false,
    intoRef,
    inRef,
    step = 20,
}: DraggableProps) => {
    const dragObject = useMemoRef(() => {
        if (dragRef.current && intoRef.current) {
            return new Transition(dragRef.current, {
                intoLimitsRef: [intoRef.current],
                // overLimitsRef,
                // intoLimitsRef,
            });
        }
        return null;
    }, []);

    const onStart = useCallback(() => {
        // dragObject?.addTranslate(new Position([-50, 0]));
        // console.log(dragObject?.position.position);
        // startPos.set(new Position(getTransition(dragRef.current!)));
    }, []);

    const onPostMove = useCallback<Required<CursorMoveProps>['onMove']>(
        ({ totalOffset, currOffset }) => {
            if (dragObject && intoRef.current) {
                const newPos = dragObject.position.new.add(currOffset);
                const objRect = new Rectangle(dragObject.object);
                const inRect = new Rectangle(inRef.current[0]);
                objRect.addTransition(currOffset);
                const inters = objRect
                    .getIntersection(inRect);

                const distances = inters.map((interS) => Math.abs(inRect[interS.flipSide] - objRect[interS.side]));
                const fI = distances.findIndex((dist) => dist === Math.min(...distances));
                if (fI !== -1) {
                    const t = inters[fI].flipSide;
                    const value = inRect[t];
                    console.log(new Direction(t).dirI);
                    newPos.position[new Direction(t).dirI] = value;
                }

                dragObject.setTranslate(newPos);
            }
        },
        [dragObject, inRef, intoRef],
    );

    const onPostEnd = useCallback<Required<CursorMoveProps>['onEnd']>(() => {
        dragObject?.savePrevPos();
    }, [dragObject]);

    const { onStartMove } = useCursorMove({
        onMove: onPostMove, onStart, onEnd: onPostEnd, step,
    });

    return { onStartMove };
};
