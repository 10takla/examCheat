import { useCallback, useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Sort.module.scss';
import { SortsList, SortsListProps } from '@/pages/MonitorPage/ui/Sort/ui/SortsList/SortsList';
import { VStack } from '@/shared/ui/Stack';
import { MonitorType } from '@/pages/MonitorPage/ui/AsyncSiteList/ui/SiteList/ui/Monitor/model/types/monitor.types';

export interface SortProps {
    className?: string
    sorts?: Required<SortsListProps>['sorts']
    onSort: (sorts: Required<SortsListProps>['sorts']) => void
}

export const Sort = (props: SortProps) => {
    const {
        className,
        sorts = [],
        onSort,
        ...otherProps
    } = props;

    const options = useMemo(() => {
        const other: Array<keyof MonitorType> = [
            'price',
            'resolution',
            'pixelDensity',
            'refreshRate',
        ];
        return [
            'relation',
            ...other,
        ];
    }, []);

    const onSortsList = useCallback((s: Required<SortsListProps>['sorts']) => {
        onSort(
            s,
        );
    }, [onSort]);
    // const onRangeSort = useCallback((sorts: Array<Required<SortItemProps>['sort']>) => {
    //     onSort(
    //         sorts.reduce((all, sort) => {
    //             all = getSortedList(all, sort.option, sort.isOrder);
    //             return all;
    //         }, items),
    //     );
    // }, [items]);
    // const ranges = useMemo(() => (
    //     items?.reduce((all, curr) => {
    //         if (curr instanceof Object) {
    //             all = {
    //                 ...all,
    //                 ...Object.entries(curr).reduce((all2, [key, value]) => {
    //                     if (typeof value === 'number') {
    //                         return {
    //                             ...all2,
    //                             [key]: {
    //                                 min: all?.[key]?.min < value ? all[key].min : value,
    //                                 // t: ((all?.[key]?.max > value ? all[key].max : value) - (all?.[key]?.min < value ? all[key].min : value)) / 2 + (all?.[key]?.min < value ? all[key].min : value),
    //                                 max: all?.[key]?.max > value ? all[key].max : value,
    //                             },
    //                         };
    //                     }
    //                     return all2;
    //                 }, {}),
    //             };
    //         }
    //         return all;
    //     }, {} as RangesListProps['ranges'])
    // ), [items]);

    return (
        <VStack className={classNames(cls.Sort, {}, [className])}>
            <SortsList
                sorts={sorts}
                options={options}
                onSort={onSortsList}
            />
            {/* <RangesList */}
            {/*    ranges={ranges} */}
            {/*    onSort={onRangeSort} */}
            {/* /> */}
        </VStack>
    );
};
