import {
    memo, useCallback, useEffect, useMemo, useState,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './MonitorPage.module.scss';
import { SiteList } from '@/pages/MonitorPage/ui/Site/SiteList';
import { HStack, VStack } from '@/shared/ui/Stack';
import { MonitorType } from '@/pages/MonitorPage/ui/Item/model/types/monitor.types';
import { Currency } from '../../../scripts/parser/monitor/lib/helpers';
import { Site } from '../../../scripts/parser/monitor/types/types';
import Sort, { SortProps } from '@/pages/MonitorPage/ui/Sort/Sort';

export interface MonitorPageProps {
    className?: string
}

export const MonitorPage = memo((props: MonitorPageProps) => {
    const {
        className,
    } = props;
    const sites: Partial<Record<Site, { currency: Currency }>> = {
        geizhals: {
            currency: 'EUR',
        },
        rtings: {
            currency: 'USD',
        },
        displays: {
            currency: 'USD',
        },
    };

    const [sitesMonitors, setSitesMonitors] = useState<Record<Site, MonitorType[]> | {}>({});

    const onChange = useCallback((site: Site, items: MonitorType[]) => {
        setSitesMonitors((prev) => ({ ...prev, [site]: items.map((o) => o.name) }));
    }, []);
    const relations = useMemo(() => {
        if (Object.keys(sitesMonitors).length === Object.keys(sites).length
            && Object.values(sitesMonitors).every((o) => !!o.length)) {
            const arr = Object.values(sitesMonitors as Record<Site, string[]>);
            const filter = (ar: string[][], p: number) => ar.filter((_, r) => r !== p);
            const t = arr.map((mons, ai) => mons.reduce((all4, n1, i) => {
                const y = filter(arr, ai).reduce((all3, mons2, j) => {
                    const findIndex = mons2.reduce((all2, n2, k) => {
                        const rule = new RegExp(`${n1}`, 'i');
                        if (rule.test(n2)) {
                            return k;
                        }
                        return all2;
                    }, null as number | null);
                    if (findIndex !== null) {
                        return [...all3, findIndex];
                    }
                    return [...all3, null];
                }, [] as number[]).flat();
                if (y.length && y.some((o) => o !== null)) {
                    y.splice(ai, 0, i);
                    return [...all4, y];
                }
                return [...all4];
            }, [] as number[][]));

            const post = t.reduce((sites, site) => {
                const wo = site.reduce((words, word) => {
                    if (!sites.some((arr) => JSON.stringify(arr) === JSON.stringify(word))) {
                        return [...words, word];
                    }
                    return words;
                }, [] as number[]);
                return [...sites, ...wo];
            }, [] as number[][]);

            return post.map((o) => (
                o.reduce((all, curr, i) => {
                    if (curr !== null) {
                        return { ...all, [Object.keys(sitesMonitors)[i]]: curr };
                    }
                    return all;
                }, {})
            ));
        }
        return [];
    }, [sites, sitesMonitors]);

    const onSort = useCallback<SortProps['onSort']>((option, order) => {
        // if (option === 'similar') {
        //
        // }
    }, []);

    return (
        <VStack
            className={classNames(cls.MonitorPage, {}, [className])}
            align="center"
        >
            {}
            <Sort onSort={onSort} options={['similar']} />
            <HStack
                align="start"
                gap="16"
                className={cls.sites}
            >
                {
                    Object.entries(sites).map(([site, { currency }, i]) => (
                        <SiteList
                            className={cls.site}
                            key={site}
                            site={site as Site}
                            setItems={onChange}
                            currency={currency}
                            relations={relations}
                        />
                    ))
                }
            </HStack>
        </VStack>
    );
});
