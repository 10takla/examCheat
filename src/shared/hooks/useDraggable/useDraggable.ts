import { MutableRefObject, useCallback, useMemo } from 'react';
import useCursorMove, { CursorMoveProps, MoveMeasures } from '@/shared/hooks/useCursorMove';
import { Position } from '@/shared/lib/kit/position/position';
import { Transition } from '@/shared/lib/kit/transition/transition';

export interface DraggableProps {
    dragRef: MutableRefObject<HTMLDivElement | null>
    direction?: 'X' | 'Y'
    onMove?: (moveInfo: (MoveMeasures & Record<'pos', Position>)) => void
    isReverse?: boolean
    step?: number
    start: Position
    overLimitRefs: MutableRefObject<HTMLDivElement[]>
}

export const getTransition = (e: HTMLElement) => {
    const regStr = e.style.transform.match(/-?\d+/g);
    let tmp: Position['position'];
    if (Array.isArray(regStr) && regStr.length !== 2) {
        tmp = [Number(regStr[0]), 0];
    } else if (!regStr) {
        tmp = [0, 0];
    } else {
        tmp = regStr.map((o) => Number(o)) as Position['position'];
    }
    return new Position(tmp);
};

export const useDraggable = ({
    dragRef, direction,
    onMove, isReverse = false,
    step = 5, start,
    overLimitRefs,
}: DraggableProps) => {
    console.log(overLimitRefs?.current);
    const dragObject = new Transition(dragRef, { overLimitsRef: overLimitRefs?.current });
    const setTransform = useCallback((pos: Position) => {
        if (dragRef.current) {
            // eslint-disable-next-line no-nested-ternary
            const extraP = direction === 'X' ? [1, 0] : direction === 'Y' ? [0, 1] : [1, 1];
            const v1 = pos.multiply(extraP).position.map((o) => `${o}px`).join(', ');
            dragRef.current.style.transform = `translate(${v1})`;
        }
    }, [direction, dragRef]);

    const startPos = useMemo<Position>(() => {
        setTransform(start);
        return start;
    }, [setTransform, start]);

    const onStart = useCallback(() => {
        startPos.set(new Position(getTransition(dragRef.current!)));
    }, [dragRef, startPos]);

    const onPostMove = useCallback<Required<CursorMoveProps>['onMove']>(
        ({ total, curr }) => {
            if (startPos) {
                const pos = new Position(total.position).add(startPos);
                onMove?.({ total, curr, pos });
                if (startPos) {
                    dragObject.setTranslate(pos);
                }
            }
        },
        [onMove, setTransform, startPos],
    );

    const onPostEnd = useCallback<Required<CursorMoveProps>['onEnd']>(() => {
        if (isReverse && startPos) {
            setTransform(startPos);
        }
    }, [isReverse, setTransform, startPos]);

    const { onStartMove } = useCursorMove({
        onMove: onPostMove, onStart, onEnd: onPostEnd, step,
    });

    return { onStartMove, startPos };
};
