import { MutableRefObject, useCallback, useMemo } from 'react';
import useCursorMove, { CursorMoveProps, MoveMeasures } from '@/shared/hooks/useCursorMove';
import { Position } from '@/shared/lib/kit/position/position';
import { Transition } from '@/shared/lib/kit/transition/transition';
import ConstructorArgsType = jest.ConstructorArgsType;
import useMemoRef from '@/shared/hooks/useMemoRef';
import useUpdateState from '@/shared/hooks/useUpdateState';

type i = ConstructorParameters<typeof Transition>[1]

export interface DraggableProps{
    dragRef: MutableRefObject<HTMLDivElement | null>
    direction?: 'X' | 'Y'
    onMove?: (moveInfo: (MoveMeasures & Record<'pos', Position>)) => void
    isReverse?: boolean
    step?: number
}

export const useDraggable = ({
    dragRef,
    direction,
    onMove,
    isReverse = false,
    step = 20,
}: DraggableProps) => {
    const dragObject = useMemoRef(() => {
        if (dragRef.current) {
            return new Transition(dragRef.current, {
                // overLimitsRef,
                // intoLimitsRef,
            });
        }
        return null;
    }, []);

    const onStart = useCallback(() => {
        dragObject?.addTranslate(new Position([-50, 0]));
        // console.log(dragObject?.position.position);
        // startPos.set(new Position(getTransition(dragRef.current!)));
    }, [dragObject?.startPos]);

    const onPostMove = useCallback<Required<CursorMoveProps>['onMove']>(
        ({ total, curr }) => {
            if (dragObject) {
                dragObject.addTranslate(curr);
            }
        },
        [dragObject],
    );

    const onPostEnd = useCallback<Required<CursorMoveProps>['onEnd']>(() => {

    }, []);

    const { onStartMove } = useCursorMove({
        onMove: onPostMove, onStart, onEnd: onPostEnd, step,
    });

    return { onStartMove };
};
