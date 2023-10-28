import {
    ForwardedRef, forwardRef, memo, ReactNode, useImperativeHandle, useRef,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './List.module.scss';
import Flex, { FlexProps, FlexRef } from '@/shared/ui/Stack/Flex/Flex';

export interface ListProps<I> extends Omit<FlexProps, 'children'>{
    className?: string
    items: I[]
    children: (item: I, index: number) => ReactNode
}

const List = <I extends string>(props: ListProps<I>, ref: ForwardedRef<FlexRef>) => {
    const {
        className,
        children,
        items,
        ...otherProps
    } = props;

    return (
        <Flex {...{ ...otherProps, ref }} className={classNames(cls.List, {}, [className])}>
            {items.map((item, index) => (
                children(item, index)
            ))}
        </Flex>
    );
};

export default memo(forwardRef(List));
