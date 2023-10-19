import { useCallback, useEffect, useState } from 'react';
import { HStack, VStack } from '@/shared/ui/Stack';
import { classNames } from '@/shared/lib/classNames/classNames';
import useUpdateState from '@/shared/hooks/useUpdateState';
import { Range } from '@/pages/MonitorPage/ui/Sort/ui/Range/Range';
import { Selector } from '@/shared/ui/Kit/Selector/Selector';

export interface SortProps<O extends string = string> {
    className?: string
    options: O[]
    sort?: { option?: O, isOrder: boolean }
    onSort?: (t: SortProps['sort']) => void
}

const Sort = <O extends string>(props: SortProps<O>) => {
    const {
        className,
        options,
        onSort,
        sort,
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

    return (
        <VStack
            className={classNames('', {}, [className])}
            gap="8"
        >
            <HStack>
                {options.length && (
                    <Selector
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
            </HStack>
        </VStack>

    );
};
export default Sort;
