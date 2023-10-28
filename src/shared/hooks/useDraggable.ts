import {
    MutableRefObject, useCallback, useMemo, useRef,
} from 'react';
import useCursorMove, { CursorMoveProps, MoveMeasures } from '@/shared/hooks/useCursorMove';
import { Position } from '@/shared/lib/kit/position/position';

export interface DraggableProps {
    dragRef: MutableRefObject<HTMLDivElement | null>
    direction?: 'X' | 'Y'
    onMove?: (moveInfo: (MoveMeasures & Record<'pos', Position>)) => void
    isReverse?: boolean
    step?: number
    start: Position
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
    return tmp;
};

export const useDraggable = ({
    dragRef, direction, onMove, isReverse = false, step = 5, start,
}: DraggableProps) => {
    const setTransform = useCallback((pos: Position) => {
        if (dragRef.current) {
            // eslint-disable-next-line no-nested-ternary
            const extraP = direction === 'X' ? [1, 0] : direction === 'Y' ? [0, 1] : [1, 1];
            const v1 = pos.multiply(extraP).position.map((o) => `${o}px`).join(', ');
            dragRef.current.style.transform = `translate(${v1})`;
        }
    }, [direction, dragRef]);
    const startPos = useMemo<Position>(() => {
        console.log(start.position);
        setTransform(start);
        return start;
    }, [start]);
    const onStart = useCallback(() => {
        startPos.set(new Position(getTransition(dragRef.current!)));
    }, [dragRef, startPos]);

    const onPostMove = useCallback<Required<CursorMoveProps>['onMove']>(
        ({ total, curr }) => {
            if (startPos) {
                const pos = new Position(total.position);
                onMove?.({ total, curr, pos });
                if (startPos) {
                    setTransform(pos);
                }
            }
        },
        [onMove, setTransform],
    );

    const onPostEnd = useCallback<Required<CursorMoveProps>['onEnd']>(() => {
        if (isReverse && startPos) {
            setTransform(startPos);
        }
    }, [isReverse, setTransform]);

    const { onStartMove } = useCursorMove({
        onMove: onPostMove, onStart, onEnd: onPostEnd, step,
    });

    return { onStartMove, startPosRef: startPos };
};

export interface DragIntersectProps extends DraggableProps {
    onDragOver?: () => void
    dragElements: Array<HTMLElement>
}

export const useDragIntersect = (props: DragIntersectProps) => {
    const {
        onDragOver,
        dragElements,
        onMove,
        dragRef,
        direction,
        ...otherProps
    } = props;
    const postOnMove = useCallback<Required<DraggableProps>['onMove']>(
        (moveInfo) => {
            const { curr, pos } = moveInfo;
            if (dragRef.current) {
                dragElements.forEach((el) => {
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
                        const blockAxisPos = sides.reduce((sum, side, sideI) => {
                            const moveVal = dragElB[side] as number + curr.position[sideI];
                            const condition = sides.map((dir1) => staticElB[dir1])
                                .map((n, io) => (
                                    [n, ['<=', '>='][io], moveVal].join(' ')
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
                    if (blockPos.some((o) => o)) {
                        // console.log(getTransition(dragRef.current), '2');
                        pos.set(getTransition(dragRef.current!));
                    }
                });
            }
            onMove?.(moveInfo);
        },
        [dragRef, onMove, dragElements, direction],
    );
    return useDraggable({
        ...otherProps, dragRef, direction, onMove: postOnMove,
    });
};
