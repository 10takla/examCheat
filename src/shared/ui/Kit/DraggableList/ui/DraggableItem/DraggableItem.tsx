import React, {
    ForwardedRef, forwardRef, MutableRefObject, useCallback,
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
    drag: Pick<DraggableProps, 'onDragStart' | 'onDragEnd'>
    into: Pick<IntoBoundariesProps, 'nears'>
}
const DraggableItem = <I extends any>(props: DraggableItemProps<I>, ref: ForwardedRef<FlexRef>) => {
    const {
        className,
        children,
        listRef,
        drag,
        into,
        direction,
        onCheckBoundaries,
        ...otherProps
    } = props;

    const onInBoundariesDrag = useCallback<Required<InBoundariesProps>['onDrag']>((e) => {
        // console.log(e.position);
    }, []);

    return (
        <IntoBoundaries
            {...into}
            direction={direction}
            rootRef={listRef}
            onDrag={onInBoundariesDrag}
            ref={ref}
        >
            {/* <InBoundaries */}
            {/*    rootRef={listRef} */}
            {/* > */}
            <Draggable {...drag}>
                <Item>
                    {children}
                </Item>
            </Draggable>
            {/* </InBoundaries> */}
        </IntoBoundaries>
    );
};
export default forwardRef(DraggableItem);
