import {
    useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import { Position, PositionCursor } from '@/shared/lib/kit/position/position';

export type MoveMeasures = Record<'total' | 'curr', PositionCursor>

export interface CursorMoveProps {
    onStart?: (moveInfo: MoveMeasures) => void
    onMove?: (moveInfo: MoveMeasures) => void
    onEnd?: (moveInfo: MoveMeasures) => void
    step?: number
}

export default ({
    onEnd, onMove, onStart, step,
}: CursorMoveProps, deps = []) => {
    const prevPosRef = useMemo(() => new Position([0, 0]), []);
    const [total, setTotal] = useState<Position>(new Position([0, 0]));
    const [curr, setCurr] = useState<Position>(new Position([0, 0]));
    const totalTranslate = useMemo(() => new Position([0, 0]), []);
    const stack = useMemo(() => new Position([0, 0]), []);
    const onActMove = useCallback((ev: MouseEvent) => {
        const currTranslate = new PositionCursor(ev).sub(prevPosRef);
        prevPosRef.set(new Position(ev));
        totalTranslate.add(currTranslate);
        if (step) {
            stack.add(currTranslate);
            const func1 = (o: number) => {
                const v = Math.floor(Math.abs(o) / step);
                return Math.sign(o) * v * step;
            };
            if (stack.position.some((o) => Math.abs(o) > step)) {
                const v = totalTranslate.position.map((o) => func1(o));
                const v2 = stack.position.map((o) => func1(o));
                onMove?.({ total: new Position(v), curr: new Position(v2) });
                stack.set([0, 0]);
            }
        } else {
            onMove?.({ total: totalTranslate, curr: currTranslate });
        }
    }, [onMove, prevPosRef, stack, step, totalTranslate]);

    const onEndMove = useCallback(() => {
        document.body.style.userSelect = 'auto';
        document.body.style.cursor = 'auto';
        document.removeEventListener('mousemove', onActMove);
        document.removeEventListener('mouseup', onEndMove);
        totalTranslate.set([0, 0]);
        onEnd?.({ total, curr });
    }, [onActMove, totalTranslate, onEnd, total, curr]);

    const onStartMove = useCallback((e: MouseEvent) => {
        document.body.style.userSelect = 'none';
        document.body.style.cursor = 'grab';
        document.addEventListener('mousemove', onActMove);
        document.addEventListener('mouseup', onEndMove);
        prevPosRef.set(new PositionCursor(e));
        onStart?.({ total, curr });
    }, [curr, onActMove, onEndMove, onStart, prevPosRef, total]);

    return {
        onStartMove, onEndMove,
    };
};
