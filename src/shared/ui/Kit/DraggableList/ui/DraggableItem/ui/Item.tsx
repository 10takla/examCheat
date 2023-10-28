import {
    ForwardedRef, forwardRef, memo, ReactNode, useEffect, useState,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Item.module.scss';
import Flex, { FlexRef } from '@/shared/ui/Stack/Flex/Flex';
import DragSvg from '@/shared/assets/icons/drag.svg';
import { DraggableChildrenProps } from '@/shared/ui/Kit/Draggable/ui/Draggable/Draggable';
import { HStack, VStack } from '@/shared/ui/Stack';

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

    return (
        <Flex
            className={classNames(cls.Item, {}, [className])}
            {...{ ref, ...otherProps }}
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
