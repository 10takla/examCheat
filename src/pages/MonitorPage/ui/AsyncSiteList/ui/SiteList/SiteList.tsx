import { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './SiteList.module.scss';
import { VStack } from '@/shared/ui/Stack';
import { Monitor } from './ui/Monitor/ui/Monitor';
import { MonitorType } from './ui/Monitor/model/types/monitor.types';
import { Site } from '../../../../../../../scripts/parser/monitor/types/types';
import { SortItemProps } from '../../../Sort/ui/SortsList/ui/SortItem/SortItem';
import { Sort, SortProps } from '../../../Sort/Sort';
import getSortedList from '@/pages/MonitorPage/ui/Sort/helpers/getSortedList';
import useUpdateState from '@/shared/hooks/useUpdateState';

export interface SiteListProps {
    className?: string,
    sort: SortItemProps['sort']
    items: Array<MonitorType & Partial<Record<'relation', number>>>
    site: Site,
    sorts: SortProps['sorts']
}

export const SiteList = memo((props: SiteListProps) => {
    const {
        className,
        items,
        sorts,
        site,
    } = props;
    const [postItems, setPostItems] = useUpdateState(items);
    const onSortSort = useCallback((s: Required<SortProps>['sorts'][]) => {
        const tmp = s.reduce((all, sort) => {
            all = getSortedList(all, sort.option, sort.isOrder);
            return all;
        }, items);
        setPostItems([...tmp]);
    }, [items, setPostItems]);

    return (
        <VStack
            className={classNames(cls.Site, {}, [className])}
            gap="8"
            align="center"
        >
            <VStack align="center">
                <h3>{site}</h3>
                {!!items.length && (
                    <Sort
                        sorts={sorts}
                        onSort={onSortSort}
                    />
                )}
            </VStack>
            <VStack
                className={classNames(cls.SiteList, {}, [className])}
                gap="8"
            >
                {postItems.map((item, index) => (
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
