import { useCallback, useMemo, useState } from 'react';
import { Vector, PositionCursor } from '@/shared/lib/kit/position/vector';

export type MoveMeasures = Record<'totalOffset' | 'currOffset', PositionCursor>

export interface CursorMoveProps {
    onStart?: (moveInfo: MoveMeasures) => void
    onMove?: (moveInfo: MoveMeasures) => void
    onEnd?: (moveInfo: MoveMeasures) => void
    step?: number
}

export default ({
    onEnd, onMove, onStart, step = 1,
}: CursorMoveProps, deps = []) => {
    const prevPosRef = useMemo(() => new Vector([0, 0]), []);
    const [total, setTotal] = useState<Vector>(new Vector([0, 0]));
    const [curr, setCurr] = useState<Vector>(new Vector([0, 0]));
    const totalTranslate = useMemo(() => new Vector([0, 0]), []);
    const stack = useMemo(() => new Vector([0, 0]), []);
    const onActMove = useCallback((ev: MouseEvent) => {
        const currTranslate = new PositionCursor(ev).sub(prevPosRef);
        prevPosRef.set(new Vector(ev));
        stack.add(currTranslate);
        const newStack = stack.position;
        const stepsNs = [0, 0];
        stack.position.forEach((xY, i) => {
            if (Math.abs(xY) >= step) {
                const stepsN = Math.floor(Math.abs(xY) / step);
                const steps = Math.sign(xY) * step * stepsN;
                const residue = xY % steps;
                stepsNs[i] = steps;
                newStack[i] = residue;
            } else {
                newStack[i] = xY;
            }
        });
        stack.set(newStack);
        if (stepsNs.some((o) => o !== 0)) {
            totalTranslate.add(stepsNs);
            setTotal(new Vector(totalTranslate));
            setCurr(new Vector(stepsNs));
            onMove?.({
                totalOffset: new Vector(totalTranslate),
                currOffset: new Vector(stepsNs),
            });
        }
    }, [onMove, prevPosRef, stack, step, totalTranslate]);

    const onEndMove = useCallback(() => {
        document.body.style.userSelect = 'auto';
        document.body.style.cursor = 'auto';
        document.removeEventListener('mousemove', onActMove);
        document.removeEventListener('mouseup', onEndMove);
        totalTranslate.set([0, 0]);
        stack.set([0, 0]);
        onEnd?.({ totalOffset: total, currOffset: curr });
    }, [onActMove, totalTranslate, onEnd, total, curr]);

    const onStartMove = useCallback((e: MouseEvent) => {
        document.body.style.userSelect = 'none';
        document.body.style.cursor = 'grab';
        document.addEventListener('mousemove', onActMove);
        document.addEventListener('mouseup', onEndMove);
        prevPosRef.set(new PositionCursor(e));
        onStart?.({ totalOffset: total, currOffset: curr });
    }, [curr, onActMove, onEndMove, onStart, prevPosRef, total]);

    return {
        onStartMove,
        onEndMove,
        currOffset: curr,
        totalOffset: total,
    };
};
