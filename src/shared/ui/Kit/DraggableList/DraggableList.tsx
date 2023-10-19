import React, { ReactNode, useRef, useState } from 'react';
import DraggableItem from './ui/DraggableItem/DraggableItem';
import Flex, { FlexProps, FlexRef } from '@/shared/ui/Stack/Flex/Flex';
import cls from './DraggableList.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { InBoundaries } from '@/shared/ui/Kit/Draggable/ui/InBoundaries/InBoundaries';

interface DraggableListProps<I> extends Omit<FlexProps, 'children'>{
    className?: string,
    items: I[]
    children: (item: I) => ReactNode
}

export const DraggableList = <I extends any>(props: DraggableListProps<I>) => {
    const {
        className,
        items,
        children,
        direction,
        ...otherProps
    } = props;
    const [postItems, setPostItems] = useState(items);
    const listRef = useRef<HTMLDivElement | null>(null);

    return (
        <Flex
            className={classNames(cls.DraggableList, {}, [className])}
            gap="8"
            {...{ direction, ...otherProps }}
            ref={listRef}
        >
            {postItems.map((item, index) => (
                <InBoundaries
                    rootRef={listRef}
                    key={String(`${index}`)}
                    block={direction}
                >
                    <DraggableItem
                        className={classNames(
                            cls.item,
                        )}
                        disrection={direction === 'column' ? 'Y' : 'X'}
                        {...{ item, listRef }}
                    >
                        {children(item)}
                    </DraggableItem>
                </InBoundaries>
            ))}
        </Flex>
    );
};
