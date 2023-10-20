import React, {
    ForwardedRef,
    forwardRef, HTMLAttributes,
    HTMLProps, MutableRefObject, useEffect, useRef, useState,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './DraggableItem.module.scss';
import DragSvg from '@/shared/assets/icons/drag.svg';
import Flex, { FlexRef } from '@/shared/ui/Stack/Flex/Flex';
import useCursorMove from '@/shared/hooks/useCursorMove';
import { DraggableChildrenProps } from '@/shared/ui/Kit/Draggable/ui/Draggable/Draggable';

export interface DraggableItemProps<I> extends Omit<HTMLAttributes<FlexRef>, 'onDragStart'> {
    className?: string
    item: I
    listRef: MutableRefObject<FlexRef | null>
    onCheckBoundaries?: () => void
    onDragStart?: DraggableChildrenProps['onDrag']
}
const DraggableItem = <I extends any>(props: DraggableItemProps<I>, ref: ForwardedRef<FlexRef>) => {
    const {
        className,
        children,
        item,
        listRef,
        onCheckBoundaries,
        onDragStart,
        ...otherProps
    } = props;

    const [isDrag, setIsDrag] = useState(false);

    return (
        <Flex
            {...otherProps}
            ref={ref}
            className={classNames(
                cls.DraggableItem,
                { [cls.drag]: isDrag },
                [className],
            )}
        >
            <DragSvg
                className={cls.dragSvg}
                onMouseDown={(e) => {
                    onDragStart?.(e as any);
                }}
            />
            {children}
        </Flex>
    );
};
export default forwardRef(DraggableItem);
