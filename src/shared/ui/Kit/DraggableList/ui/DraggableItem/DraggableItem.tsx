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

export interface DraggableItemProps<I> extends HTMLAttributes<FlexRef> {
    className?: string
    item: I
    listRef: MutableRefObject<FlexRef | null>
    direction: 'X' | 'Y'
    onCheckBoundaries?: () => void
    onDrag?: DraggableChildrenProps['onDrag']
}
const DraggableItem = <I extends any>(props: DraggableItemProps<I>, ref: ForwardedRef<FlexRef>) => {
    const {
        className,
        children,
        item,
        listRef,
        direction,
        onCheckBoundaries,
        onDrag,
        ...otherProps
    } = props;

    const [isDrag, setIsDrag] = useState(false);
    const itemRef = useRef<HTMLDivElement | null>(null);
    const [startBound, setStartBound] = useState<DOMRect>();

    // const handleResize = () => {
    //     const slider = sliderRef.current?.getBoundingClientRect();
    //     const thumb = thumbRef.current!.getBoundingClientRect();
    //     if (slider) {
    //         setFactor((slider.width - thumb.width) / length);
    //     }
    // };
    // useEffect(() => {
    //     window.addEventListener('resize', handleResize);
    //     handleResize();
    //     return () => {
    //         window.removeEventListener('resize', handleResize);
    //     };
    // }, [handleResize, length, sliderRef]);

    useEffect(() => {
        // setStartBound(itemRef.current?.getBoundingClientRect());
    }, []);

    const [onStart] = useCursorMove({
        onEnd: () => {
            // setIsDrag(false);
            // if (!itemRef.current) return;
            // itemRef.current.style.transform = 'none';
        },
        onMove: ({ totalTranslate }) => {
            // if (!itemRef.current || !listRef.current || !startBound) return;
            // const listBound = listRef.current?.getBoundingClientRect();
            // const upB = direction === 'X' ? 'left' : 'top';
            // const downB = direction === 'X' ? 'right' : 'bottom';
            // const length = direction === 'X' ? 'width' : 'height';
            // console.log(listBound[upB], startBound[upB], totalTranslate[`client${direction}`]);
            // onCheckBoundaries?.();
            // if (startBound[upB] + totalTranslate[`client${direction}`] <= listBound[upB]) {
            //     setTranslate(itemRef.current, (listBound[upB] - startBound[upB]));
            //     return;
            // }
            // if (startBound[downB] + totalTranslate[`client${direction}`] >= listBound[downB]) {
            //     setTranslate(itemRef.current, ((listBound[downB] - startBound[length]) - startBound[upB]));
            //     return;
            // }
            // setTranslate(itemRef.current, totalTranslate[`client${direction}`]);
        },
    }, []);

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
                    // setIsDrag(true);
                    // onStart(e);
                    onDrag?.(e);
                }}
            />
            {children}
        </Flex>
    );
};
export default forwardRef(DraggableItem);
