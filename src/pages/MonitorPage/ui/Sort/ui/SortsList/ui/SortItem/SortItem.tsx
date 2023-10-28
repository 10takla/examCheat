import {
    useCallback, useContext, useEffect, useState,
} from 'react';
import { HStack } from '@/shared/ui/Stack';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Selector } from '@/shared/ui/Kit/Selector/Selector';
import cls from './SortItem.module.scss';
import DragSvg from '@/shared/assets/icons/drag.svg';
import { TransContext } from '@/shared/ui/Kit/TransList/ui/TransItem/TransItem';
import CloseSvg from '@/shared/assets/icons/delete.svg';

export interface SortItemProps<O extends string = string> {
    className?: string
    options: O[]
    sort?: { option?: O, isOrder: boolean }
    onSort?: (t: SortItemProps['sort']) => void
    onDelete: () => void
}

const SortItem = <O extends string>(props: SortItemProps<O>) => {
    const {
        className,
        options,
        onSort,
        sort,
        onDelete,
    } = props;
    const [isOrder, setIsOrder] = useState(false);
    const [option, setOption] = useState<O | undefined>();

    useEffect(() => {
        if (sort) {
            setOption(sort.option);
            setIsOrder(sort.isOrder);
            // onSort?.({ option, isOrder: sort.isOrder });
        }
    }, [onSort, option, sort]);

    const onOptionChange = useCallback((val: O | undefined) => {
        setOption(val);
        onSort?.({ option: val, isOrder });
    }, [isOrder, onSort]);

    const onIsOrderChange = useCallback((val: boolean) => {
        setIsOrder(!isOrder);
        onSort?.({ option, isOrder: val });
    }, [isOrder, onSort, option, setIsOrder]);

    const { onTransStart } = useContext(TransContext);

    return (
        <HStack
            className={classNames(cls.SortItem, {}, [className])}
        >
            <button
                type="button"
                onMouseDown={(e: any) => {
                    onTransStart?.(e);
                }}
            >
                <DragSvg className={cls.dragSvg} />
            </button>
            {options.length && (
                <Selector
                    isNonUndefined
                    options={options}
                    onChange={(e) => onOptionChange(e.currentTarget.value as O | undefined)}
                    value={option}
                />
            )}
            <button
                type="button"
                onClick={() => onIsOrderChange(!isOrder)}
            >
                {isOrder ? '▲' : '▼'}

            </button>
            <button
                type="button"
                onClick={() => onDelete()}
            >
                <CloseSvg />
            </button>
        </HStack>
    );
};
export default SortItem;
