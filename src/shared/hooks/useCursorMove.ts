import { useCallback, useState } from 'react';
import { Position, PositionCursor } from '@/shared/lib/kit/position/position';

export interface CursorMoveProps {
    onMove?: (props: Record<'totalTranslate' | 'currTranslate', PositionCursor>) => void
    onEnd?: (props: Record<'totalTranslate' | 'currTranslate', PositionCursor>) => void
}
export default ({ onMove, onEnd }: CursorMoveProps, deps: any[]) => {
    const [path, setPath] = useState<Position | undefined>();

    const onStart = useCallback((e: MouseEvent) => {
        const startPos = new PositionCursor(e);
        let prevPos = startPos;
        document.body.style.userSelect = 'none';
        const move = (ev: MouseEvent) => {
            const totalTranslate = new PositionCursor(ev).subPos(startPos);
            const currTranslate = new PositionCursor(ev).subPos(prevPos);
            prevPos = new PositionCursor(ev);
            onMove?.({ totalTranslate, currTranslate });
        };
        document.body.addEventListener('mouseup', (event) => {
            document.body.style.userSelect = 'auto';
            document.body.removeEventListener('mousemove', move);
            const totalTranslate = new PositionCursor(event).subPos(startPos);
            const currTranslate = new PositionCursor(event).subPos(prevPos);
            onEnd?.({ totalTranslate, currTranslate });
        });
        document.body.addEventListener('mousemove', move);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onEnd, onMove, ...deps]);

    return [onStart, path] as [typeof onStart, typeof path];
};
