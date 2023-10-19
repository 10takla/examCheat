import {
    memo, useCallback, useMemo, useState,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './SiteList.module.scss';
import { VStack } from '@/shared/ui/Stack';
import { Monitor } from './ui/Monitor/ui/Monitor';
import { MonitorType } from './ui/Monitor/model/types/monitor.types';
import Sort, { SortProps } from '../../../Sort/Sort';
import { Site } from '../../../../../../../scripts/parser/monitor/types/types';
import { SortList } from '@/pages/MonitorPage/ui/Sort/SortList';

interface SiteListProps {
    className?: string,
    sort: SortProps['sort']
    items: Array<MonitorType & Partial<Record<'relation', number>>>
    site: Site,
    sortOptions: string[]
}

export const SiteList = memo((props: SiteListProps) => {
    const {
        className,
        items,
        site,
        sortOptions,
        sort,
    } = props;
    const getSortedList = useCallback((sortedItems: any[], option: string | undefined, order: boolean) => (
        sortedItems.sort((a, b) => {
            const [optionA, optionB] = [a, b].map((o) => o?.[option ?? '']);
            // eslint-disable-next-line no-restricted-syntax
            for (const [oper, isNegation] of [['>', true], ['<', false]]) {
                let condition = 'false';
                if (option === 'relation') {
                    if ([optionA, optionB].every((o) => o === undefined)) {
                        return 0;
                    }
                    if (optionA === undefined) {
                        return 1;
                    }
                    if (optionB === undefined) {
                        return -1;
                    }

                    condition = [optionA, oper, optionB].join(' ');
                }
                if (Array.isArray(optionA) && typeof optionA[0] === 'number') {
                    const arr1 = [...optionA].reverse();
                    const arr2 = [...optionB].reverse();
                    condition = arr1.map((o, i) => {
                        const newArr1 = arr1.filter((_, u) => u === i);
                        const newArr2 = arr2.filter((_, u) => u === i);
                        const tmp = [arr1, arr2].map((y) => y.filter((_, u) => u < i));
                        const tmp2 = tmp[0].map((x, h) => `${tmp[0][h]} ${oper}= ${tmp[1][h]}`);
                        const tmp3 = newArr1.map((k, j) => `${k} ${oper} ${newArr2[j]}`);
                        return [...tmp2, ...tmp3].join(' && ');
                    }).map((o) => `(${o})`).join(' || ');
                } else if (typeof optionA === 'number') {
                    condition = [optionA, oper, optionB].join(' ');
                }
                // eslint-disable-next-line no-eval
                if (eval(condition)) {
                    return (isNegation ? order : !order) ? 1 : -1;
                }
            }
            return 0;
        })), []);
    const [pot, setSort] = useState<SortProps['sort']>(
        { isOrder: false, option: undefined },
    );

    const sortedList = useMemo(() => {
        if (pot) {
            return getSortedList(items, pot?.option, pot?.isOrder);
        }
        return items;
    }, [getSortedList, items, pot]);

    return (
        <VStack
            className={classNames(cls.Site, {}, [className])}
            gap="8"
            align="center"
        >
            <h3>{site}</h3>
            {!!items.length
                && (
                    // <Sort
                    //     sort={sort}
                    //     onSort={(t) => {
                    //         setSort(t);
                    //     }}
                    //     options={sortOptions}
                    // />
                    <SortList options={sortOptions} />
                )}
            <VStack
                className={classNames(cls.SiteList, {}, [className])}
                gap="8"
            >
                {sortedList.map((item, index) => (
                    <Monitor
                        index={index}
                        key={item.name}
                        item={item}
                        colorIndex={item.relation}
                    />
                ))}
            </VStack>
        </VStack>
    );
});
