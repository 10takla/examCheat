import React, {
    ReactNode, useEffect, useRef, useState,
} from 'react';
import Flex, { FlexProps } from '@/shared/ui/Stack/Flex/Flex';
import cls from './DraggableList.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import DraggableItem from '@/shared/ui/Kit/DraggableList/ui/DraggableItem/DraggableItem';
import { IntoBoundariesProps } from '@/shared/ui/Kit/Draggable/ui/IntoBoundaries/IntoBoundaries';

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
    const [fromIndex, setFromIndex] = useState<number>();
    const nearsRefs = useRef<IntoBoundariesProps['nears']>([]);

    return (
        <Flex
            className={classNames(cls.DraggableList, {}, [className])}
            gap="8"
            {...{ direction, ...otherProps }}
            ref={listRef}
        >
            {postItems.map((item, index) => (
                <DraggableItem
                    key={String(`${index}`)}
                    className={classNames(
                        cls.item,
                    )}
                    ref={(re) => {
                        nearsRefs.current[index] = re;
                    }}
                    drag={{
                        onDragStart: () => {
                            setFromIndex(index);
                        },
                        onDragEnd: () => setFromIndex(undefined),
                    }}
                    into={{
                        nears: nearsRefs.current.filter((_, i) => i !== fromIndex),
                    }}
                    {...{ direction, listRef }}
                >
                    {children(item)}
                </DraggableItem>
            ))}
        </Flex>
    );
};
