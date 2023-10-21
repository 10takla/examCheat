import {
    ForwardedRef, forwardRef, memo, ReactNode, useState,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Item.module.scss';
import Flex, { FlexRef } from '@/shared/ui/Stack/Flex/Flex';
import DragSvg from '@/shared/assets/icons/drag.svg';
import { DraggableChildrenProps } from '@/shared/ui/Kit/Draggable/ui/Draggable/Draggable';

interface ItemProps {
    className?: string
    onDragStart?: DraggableChildrenProps['onDragStart']
    children: ReactNode
}

const Item = (props: ItemProps, ref: ForwardedRef<FlexRef>) => {
    const {
        className,
        children,
        onDragStart,
        ...otherProps
    } = props;
    const [isDrag, setIsDrag] = useState(false);
    return (
        <Flex
            {...otherProps}
            ref={ref}
            className={classNames(
                cls.Item,
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

export default forwardRef(Item);
