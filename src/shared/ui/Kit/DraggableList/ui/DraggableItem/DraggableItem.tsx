import React, {
    ForwardedRef, forwardRef, MutableRefObject, useCallback, useEffect, useState,
} from 'react';
import { FlexProps, FlexRef } from '@/shared/ui/Stack/Flex/Flex';
import Draggable, { DraggableProps } from '@/shared/ui/Kit/Draggable/ui/Draggable/Draggable';
import InBoundaries, { InBoundariesProps } from '@/shared/ui/Kit/Draggable/ui/InBoundaries/InBoundaries';
import IntoBoundaries, { IntoBoundariesProps } from '../../../Draggable/ui/IntoBoundaries/IntoBoundaries';
import Item from '@/shared/ui/Kit/DraggableList/ui/DraggableItem/ui/Item';

export interface DraggableItemProps<I> extends Omit<FlexProps, 'onDragStart'> {
    className?: string
    listRef: MutableRefObject<FlexRef | null>
    onCheckBoundaries?: () => void
    drag: Omit<DraggableProps, 'onCheck' | 'children' >
    into: Omit<IntoBoundariesProps, 'onCheck' | 'children'>
}
const DraggableItem = <I extends any>(props: DraggableItemProps<I>, ref: ForwardedRef<FlexRef>) => {
    const {
        className,
        children,
        listRef,
        drag,
        into: {
            onDragStart,
            onDragEnd,
            onDrag,
            ...into
        },
        direction,
        onCheckBoundaries,
        ...otherProps
    } = props;

    const [isDrag, setIsDrag] = useState(false);

    const onPostDragStart = useCallback(() => {
        setIsDrag(true);
        onDragStart?.();
    }, [onDragStart]);

    const onPostDragEnd = useCallback(() => {
        setIsDrag(false);
        onDragEnd?.();
    }, [onDragEnd]);
    return (
        <IntoBoundaries
            {...into}
            isDrag={isDrag}
            onDragStart={onPostDragStart}
            onDragEnd={onPostDragEnd}
            direction={direction}
            rootRef={listRef}
            ref={ref}
        >
            <InBoundaries
                rootRef={listRef}
            >
                <Draggable {...drag}>
                    <Item>
                        {children}
                    </Item>
                </Draggable>
            </InBoundaries>
        </IntoBoundaries>
    );
};
export default forwardRef(DraggableItem);
