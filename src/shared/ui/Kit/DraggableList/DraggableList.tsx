import React, {
    ReactNode, useCallback, useRef, useState,
} from 'react';
import Flex, { FlexProps } from '@/shared/ui/Stack/Flex/Flex';
import cls from './DraggableList.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { InBoundaries, InBoundariesProps } from '@/shared/ui/Kit/Draggable/ui/InBoundaries/InBoundaries';
import DraggableItem from '@/shared/ui/Kit/DraggableList/ui/DraggableItem/DraggableItem';

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
    const onInBoundariesDrag = useCallback<InBoundariesProps['onDrag']>((e) => {
        console.log(e.position);
    }, []);

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
                    onDrag={onInBoundariesDrag}
                >
                    <DraggableItem
                        className={classNames(
                            cls.item,
                        )}
                        {...{ item, listRef }}
                    >
                        {children(item)}
                    </DraggableItem>
                </InBoundaries>
            ))}
        </Flex>
    );
};
