import {
    cloneElement, ForwardedRef, forwardRef, memo, ReactElement, useCallback, useImperativeHandle, useRef, useState,
} from 'react';
import useCursorMove, { CursorMoveProps } from '@/shared/hooks/useCursorMove';
import { Position } from '@/shared/lib/kit/position/position';

export interface DraggableProps {
    children: ReactElement
    onCheck: (props: object, val: Position) => Position
    block?: 'column' | 'row'
}

export interface DraggableChildrenProps {
    onDrag: (e: MouseEvent) => void
    ref: any
}

const Draggable = (props: DraggableProps, ref: ForwardedRef<HTMLElement>) => {
    const {
        children,
        onCheck,
        block,
    } = props;
    const childrenRef = useRef<HTMLElement>();
    useImperativeHandle<HTMLElement, HTMLElement>(ref, () => childrenRef.current);

    const [startPos, setStartPos] = useState<Position['position']>([0, 0]);

    const setStart = useCallback(() => {
        const regStr = childrenRef.current!.style.transform.match(/-?\d+/g);
        let tmp: Position['position'];
        if (Array.isArray(regStr) && regStr.length !== 2) {
            tmp = [Number(regStr[0]), 0];
        } else if (!regStr) {
            tmp = [0, 0];
        } else {
            tmp = regStr.map((o) => Number(o)) as Position['position'];
        }
        setStartPos(tmp);
    }, []);

    const setTranslate = (e: HTMLElement, pos: Position) => {
        const y = ['row', 'column'].findIndex((o) => block && o !== block);
        if (y !== -1) {
            pos.multiplyPos([1, 1].map((o, p) => (p === y ? 0 : 1)));
        }
        e.style.transform = `translate(${pos.position.map((o) => `${o}px`).join(', ')})`;
    };

    const onMove = useCallback<Required<CursorMoveProps>['onMove']>(({ totalTranslate, currTranslate }) => {
        if (!childrenRef.current) return;
        const val = totalTranslate.addPos(new Position(startPos));
        setTranslate(
            childrenRef.current!,
            onCheck({ totalTranslate, currTranslate }, val),
        );
    }, [onCheck, startPos]);

    const [onStart] = useCursorMove({
        onMove,
        onEnd: ({ totalTranslate }) => {
            setStart();
        },
    }, []);

    const onDragStart = useCallback<DraggableChildrenProps['onDrag']>((e) => {
        if (!childrenRef.current) return;
        onStart(e);
    }, [onStart]);

    return (
        cloneElement<DraggableChildrenProps>(children, {
            ref: childrenRef,
            onDrag: onDragStart,
        })
    );
};
export default memo(forwardRef(Draggable));
