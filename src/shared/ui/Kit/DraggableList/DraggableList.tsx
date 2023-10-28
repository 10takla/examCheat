import React, {
    ReactNode, useCallback, useEffect, useRef, useState,
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
    const [toIndex, setToIndex] = useState<number>();
    const nearsRefs = useRef<IntoBoundariesProps['nears']>([]);
    const [startNears, setStartNears] = useState<HTMLElement[]>([]);
    useEffect(() => {
        setStartNears(nearsRefs.current);
    }, []);

    const onPostDragOver = useCallback((toIndex: number) => {
        if (fromIndex !== undefined && toIndex !== undefined) {
            const curr = nearsRefs.current[fromIndex];
            const currB = curr.getBoundingClientRect();
            const { left } = nearsRefs.current[toIndex].getBoundingClientRect();
            // curr.style.transform = `translateX(${left - currB.left}px)`;
            nearsRefs.current
                .forEach((near, nearI) => {
                    const [a, b] = [fromIndex, toIndex].sort();
                    if (!(nearI >= a && nearI <= b && nearI !== fromIndex)) {
                        if (nearI !== fromIndex) {
                            near!.children[0].style.transform = 'none';
                        }
                    }
                    if (nearI >= a && nearI <= b && nearI !== fromIndex) {
                        // console.log(nearI);
                        const el = nearsRefs.current[fromIndex - 1]?.getBoundingClientRect().right;
                        const sub = currB.right - el;
                        near.children[0].style.transform = `translate(${sub}px)`;
                    }
                });
        }
    }, [fromIndex, toIndex]);
    const onEnd = useCallback((from: number, to: number) => {
        nearsRefs.current
            .forEach((near) => {
                near.children[0].style.transform = 'none';
            });
        if (toIndex === undefined || fromIndex === undefined) return;

        const y = [...postItems];
        const t = y.splice(fromIndex, 1)[0];
        y.splice(toIndex, 0, t);
        console.log(y);
        setPostItems(y);
        setFromIndex(undefined);
    }, [fromIndex, postItems, toIndex]);

    const onCheck = useCallback((dat, pop) => {
        console.log(fromIndex, toIndex);
        if (fromIndex !== undefined && toIndex !== undefined) {
            const curr = nearsRefs.current[fromIndex];
            const el1 = curr.children[0]?.getBoundingClientRect().left;
            const el2 = nearsRefs.current[toIndex]?.getBoundingClientRect().left;
            const sub2 = el2 - el1;
            console.log(sub2);
            pop.multiplyPos([0, 0]).addPos([sub2, 0]);
            // curr.children[0].style.transform = `translate(${sub2}px)`;
        }
    }, [fromIndex, toIndex]);

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
                        {
                            [cls.drag]: index === fromIndex,
                        },
                    )}
                    ref={(re) => {
                        nearsRefs.current[index] = re;
                    }}
                    into={{
                        onCheck,
                        onDragStart: () => {
                            setFromIndex(index);
                        },
                        onDragEnd: () => {
                            onEnd(fromIndex, toIndex);
                        },
                        onDragOver: (findIndex) => {
                            if (findIndex !== fromIndex) {
                                setToIndex(findIndex);
                                onPostDragOver(findIndex);
                            }
                        },
                        onDragLeave: () => setToIndex(undefined),
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
