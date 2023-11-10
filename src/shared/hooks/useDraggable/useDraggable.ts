import { MutableRefObject, useCallback, useEffect } from 'react';
import useCursorMove, { CursorMoveProps, MoveMeasures } from '@/shared/hooks/useCursorMove';
import { Vector } from '@/shared/lib/kit/position/vector';
import { Transition } from '@/shared/lib/kit/transition/transition';
import useMemoRef from '@/shared/hooks/useMemoRef';
import { Direction } from '@/shared/lib/kit/direction/direction';

type i = ConstructorParameters<typeof Transition>[1]

export interface DraggableProps {
    dragRef: MutableRefObject<HTMLDivElement | null>
    direction?: Direction
    onMove?: (moveInfo: (MoveMeasures & Record<'pos', Vector>)) => void
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
            return new Transition(dragRef.current);
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
                dragObject.setTranslate(newPos);
            }
        },
        [dragObject, intoRef],
    );

    const onPostEnd = useCallback<Required<CursorMoveProps>['onEnd']>(() => {
        dragObject?.savePrevPos();
    }, [dragObject]);

    const { onStartMove } = useCursorMove({
        onMove: onPostMove, onStart, onEnd: onPostEnd, step,
    });

    return { onStartMove };
};
