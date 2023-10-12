import {
    memo, useCallback, useEffect, useState,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Site.module.scss';
import { api } from '@/shared/api/api';
import { VStack } from '@/shared/ui/Stack';
import { Monitor } from '@/pages/MonitorPage/ui/Item/ui/Monitor';
import { MonitorType } from '@/pages/MonitorPage/ui/Item/model/types/monitor.types';
import { Currency, getRate } from '../../../../../scripts/parser/monitor/lib/helpers';
import { Site } from '../../../../../scripts/parser/monitor/types/types';
import Sort, { SortProps } from '@/pages/MonitorPage/ui/Sort/Sort';

interface SiteListProps {
    className?: string,
    site: Site,
    setItems: (site: Site, items: MonitorType[]) => void,
    currency: Currency
    relations: Array<Partial<Record<Site, number>>>,
}

export const SiteList = memo((props: SiteListProps) => {
    const {
        className,
        site,
        setItems: setItemss,
        currency,
        relations,
    } = props;

    const [items, setItems] = useState<MonitorType[]>([]);
    useEffect(() => {
        api.get(site, {
            params: { _sort: 'price' },
        })
            .then(async ({ data }) => {
                const monitors = data as MonitorType[];

                const rate = await getRate(currency);

                setItems(
                    monitors.map(({ price, ...monitor }) => ({
                        ...monitor,
                        price: price && Math.round((price * rate) * 100) / 100,
                    })),
                );
            });
    }, [currency, site]);

    useEffect(() => {
        setItemss(site, items);
    }, [items, setItemss, site]);

    const getColorIndex = useCallback((index: number) => (
        relations.reduce((all, rel, i) => {
            if (rel[site] === index) {
                return i;
            }
            return all;
        }, null as number | null)
    ), [relations, site]);
    const onSort = useCallback<SortProps['onSort']>((option, order) => {
        const y = items.sort((a, b) => {
            if (a[option] > b[option]) {
                return order ? 1 : -1;
            }
            if (a[option] < b[option]) {
                return order ? -1 : 1;
            }
            return 0;
        });
        setItems(y);
    }, [items]);
    useEffect(() => {
        // eslint-disable-next-line consistent-return
        const p = relations.reduce((all, rel) => {
            if (rel[site]) {
                const k = items.splice(rel[site], 1, null);
                return [...all, k[0]];
            }
            return all;
        }, []);
        console.log(p);
    }, [items, relations, site]);
    return (
        <VStack
            className={classNames(cls.Site, {}, [className])}
            gap="8"
            align="center"
        >
            <h3>{site}</h3>
            {items.length && Object.entries(items[0])?.length
                && <Sort onSort={onSort} options={Object.keys(items[0])} />}
            <VStack gap="8">
                {items.map((item, index) => (
                    <Monitor
                        index={index}
                        key={item.name}
                        item={item}
                        colorIndex={getColorIndex(index) !== null ? getColorIndex(index) : null}
                    />
                ))}
            </VStack>
        </VStack>
    );
});
