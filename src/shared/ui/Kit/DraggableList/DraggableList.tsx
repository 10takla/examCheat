import React, {
    ReactNode, useEffect, useRef, useState,
} from 'react';
import Flex, { FlexProps } from '@/shared/ui/Stack/Flex/Flex';
import cls from './DraggableList.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import DraggableItem from '@/shared/ui/Kit/DraggableList/ui/DraggableItem/DraggableItem';
import { IntoBoundariesProps } from '@/shared/ui/Kit/Draggable/ui/IntoBoundaries/IntoBoundaries';
import {LogError} from "concurrently";

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
    const [toIndex, setToIndex] = useState<number>();
    const nearsRefs = useRef<IntoBoundariesProps['nears']>([]);
    // useEffect(()=> {
    //     console.log(fromIndex)
    // }, [fromIndex])
    useEffect(() => {
        if (fromIndex !== undefined && toIndex !== undefined) {
            const t = postItems.filter((_, i) => i !== fromIndex);
            const from = postItems.filter((_, i) => i < toIndex && i !== fromIndex);
            const to = postItems.filter((_, i) => i >= toIndex && i !== fromIndex);
            // console.log(to.map(o => o.option));

            const currB = nearsRefs.current[fromIndex]?.getBoundingClientRect()
            nearsRefs.current.forEach((near, nearI) => {
                if(nearI >= toIndex && nearI < postItems.length && nearI !== fromIndex){
                    const val = currB.left - near?.getBoundingClientRect().left
                    near!.style.transform = `translateX(${val}px)`
                }
            })
            // console.log([...from, postItems[fromIndex], ...to].map(o => o.option));
            // setPostItems([...from, postItems[fromIndex], ...to]);
        }
    }, [fromIndex, postItems, toIndex]);
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
                    into={{
                        onDragStart: () => {
                            setFromIndex(index);
                        },
                        onDragEnd: () => setFromIndex(undefined),
                        onDragOver: (findIndex) => setToIndex(findIndex),
                        onDragLeave: () => setToIndex(undefined),
                        nears: nearsRefs.current.filter((_, i) => i !== fromIndex)
                            .map(el => el?.children),
                    }}
                    {...{ direction, listRef }}
                >
                    {children(item)}
                </DraggableItem>
            ))}
        </Flex>
    );
};
