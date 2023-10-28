import {
    useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import { Position, PositionCursor } from '@/shared/lib/kit/position/position';

export type MoveMeasures = Record<'total' | 'curr', PositionCursor>
export interface CursorMoveProps {
    onStart?: () => void
    onMove?: (moveInfo: MoveMeasures) => void
    onEnd?: () => void
    step?: number
}
export default ({
    onEnd, onMove, onStart, step,
}: CursorMoveProps, deps = []) => {
    const prevPosRef = useMemo(() => new Position([0, 0]), []);
    const [total, setTotal] = useState<Position>(new Position([0, 0]));
    const [curr, setCurr] = useState<Position>(new Position([0, 0]));
    const totalTranslate = useMemo(() => new Position([0, 0]), []);
    const onActMove = useCallback((ev: MouseEvent) => {
        const currTranslate = new PositionCursor(ev).sub(prevPosRef);
        prevPosRef.set(new Position(ev));
        totalTranslate.add(currTranslate);
        setTotal(totalTranslate);
        setCurr(currTranslate);
        onMove?.({ total: totalTranslate, curr: currTranslate });
    }, [onMove, prevPosRef, totalTranslate]);

    const onEndMove = useCallback(() => {
        document.body.style.userSelect = 'auto';
        document.removeEventListener('mousemove', onActMove);
        document.removeEventListener('mouseup', onEndMove);
        onEnd?.();
    }, [onEnd, onActMove]);

    const onStartMove = useCallback((e: MouseEvent) => {
        document.body.style.userSelect = 'none';
        document.addEventListener('mousemove', onActMove);
        document.addEventListener('mouseup', onEndMove);
        prevPosRef.set(new PositionCursor(e));
        onStart?.();
    }, [onActMove, onEndMove, onStart, prevPosRef]);

    return {
        onStartMove, onEndMove, total, curr,
    };
};
