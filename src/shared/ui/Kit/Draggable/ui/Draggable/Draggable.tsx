import {
    cloneElement,
    createContext,
    ForwardedRef,
    forwardRef,
    memo,
    ReactElement,
    useCallback,
    useImperativeHandle,
    useMemo,
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

export const DraggableContext = createContext<Partial<Pick<DraggableChildrenProps, 'onDragStart'>>>({});

export interface DraggableProps extends Pick<FlexProps, 'direction'> {
    children: ReactElement
    onCheck?: (props: MoveMeasures, val: Position) => void
    onDrag?: () => void
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
        ...otherProps
    } = props;
    const childrenRef = useRef<HTMLElement>();
    useImperativeHandle<HTMLElement | undefined, HTMLElement | undefined>(
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
            pos.multiply(tmp);
        }
        e.style.transform = `translate(${pos.position.map((o) => `${o}px`).join(', ')})`;
        onDrag?.(pos);
    }, [direction, onDrag]);

    const onMove = useCallback<Required<CursorMoveProps>['onMove']>(({ total, curr }) => {
        if (!childrenRef.current) return;
        const val = total.add(new Position(startPos));
        if (onCheck) {
            onCheck({ total, curr }, val);
        }
        setTranslate(
            childrenRef.current!,
            val,
        );
    }, [onCheck, setTranslate, startPos]);

    const { onStartMove } = useCursorMove({
        onMove,
        onEnd: () => {
            setStart();
            onDragEnd?.();
        },
    }, []);

    const onPostDragStart = useCallback<DraggableChildrenProps['onDragStart']>((e) => {
        if (!childrenRef.current) return;
        onStartMove(e);
        onDragStart?.();
    }, [onDragStart, onStartMove]);

    const contextValue = useMemo(() => ({ onDragStart: onPostDragStart }), [onPostDragStart]);

    return (
        <DraggableContext.Provider value={contextValue}>
            {cloneElement<DraggableChildrenProps>(children, {
                ...otherProps,
                ref: childrenRef,
            })}
        </DraggableContext.Provider>
    );
};
export default memo(forwardRef(Draggable));
