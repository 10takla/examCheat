import {
    cloneElement,
    ForwardedRef,
    forwardRef,
    memo,
    ReactElement,
    useCallback,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
import useCursorMove, { CursorMoveProps, MoveMeasures } from '@/shared/hooks/useCursorMove';
import { Position } from '@/shared/lib/kit/position/position';
import { FlexProps } from '@/shared/ui/Stack/Flex/Flex';

export interface DraggableChildrenProps {
    onDragStart: (e: MouseEvent) => void
    ref: any
}
export interface DraggableProps extends Pick<FlexProps, 'direction'>{
    children: ReactElement
    onCheck?: (props: MoveMeasures, val: Position) => Position
    onDrag?: (pos: Position) => void
    onDragStart?: () => void
    onDragEnd?: () => void
}

const Draggable = (props: DraggableProps, ref: ForwardedRef<HTMLElement>) => {
    const {
        children,
        onCheck,
        direction,
        onDragStart,
        onDragEnd,
        onDrag,
    } = props;
    const childrenRef = useRef<HTMLElement>();
    useImperativeHandle<HTMLElement| undefined, HTMLElement | undefined>(
        ref,
        () => childrenRef.current,
    );

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

    const setTranslate = useCallback((e: HTMLElement, pos: Position) => {
        const y = ['row', 'column'].findIndex((o) => direction && o !== direction);
        if (y !== -1) {
            const tmp = [1, 1].map((o, p) => (p === y ? 0 : 1)) as [number, number];
            pos.multiplyPos(tmp);
        }
        e.style.transform = `translate(${pos.position.map((o) => `${o}px`).join(', ')})`;
        onDrag?.(pos);
    }, [direction, onDrag]);

    const onMove = useCallback<Required<CursorMoveProps>['onMove']>(({ totalTranslate, currTranslate }) => {
        if (!childrenRef.current) return;
        const val = totalTranslate.addPos(new Position(startPos));
        if (onCheck) {
            setTranslate(
                childrenRef.current!,
                onCheck({ totalTranslate, currTranslate }, val),
            );
        } else {
            setTranslate(
                childrenRef.current!,
                val,
            );
        }
    }, [onCheck, setTranslate, startPos]);

    const [onStart] = useCursorMove({
        onMove,
        onEnd: () => {
            setStart();
            onDragEnd?.();
        },
    }, []);

    const onPostDragStart = useCallback<DraggableChildrenProps['onDragStart']>((e) => {
        if (!childrenRef.current) return;
        onStart(e);
        onDragStart?.();
    }, [onDragStart, onStart]);

    return (
        cloneElement<DraggableChildrenProps>(children, {
            ref: childrenRef,
            onDragStart: onPostDragStart,
        })
    );
};
export default memo(forwardRef(Draggable));
