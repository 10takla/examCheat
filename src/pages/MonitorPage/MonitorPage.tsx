import {
    memo, useCallback, useEffect, useMemo, useState,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './MonitorPage.module.scss';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Currency } from '../../../scripts/parser/monitor/lib/helpers';
import { Site } from '../../../scripts/parser/monitor/types/types';
import { MonitorType } from './ui/AsyncSiteList/ui/SiteList/ui/Monitor/model/types/monitor.types';
import { AsyncSiteList } from './ui/AsyncSiteList/AsyncSiteList';
import { SiteList, SiteListProps } from './ui/AsyncSiteList/ui/SiteList/SiteList';
import { Sort } from '@/pages/MonitorPage/ui/Sort/Sort';

export interface MonitorPageProps {
    className?: string
}

export const MonitorPage = memo((props: MonitorPageProps) => {
    const {
        className,
    } = props;

    const sites = useMemo<Partial<Record<Site, { currency: Currency }>>>(() => ({
        geizhals: {
            currency: 'EUR',
        },
        rtings: {
            currency: 'USD',
        },
        displays: {
            currency: 'USD',
        },
    }), []);

    const [sitesMonitors, setSitesMonitors] = useState<Record<Site, MonitorType[]> | {}>({});

    const setSites = useCallback((site: Site, items: MonitorType[]) => {
        setSitesMonitors((prev) => ({ ...prev, [site]: items }));
    }, []);

    const sitesRelsMonitors = useMemo<
        Partial<Record<Site,
            Array<MonitorType & { relation?: number }>
        >>
    >(() => {
        const siteLists = Object.entries(sitesMonitors);
        if (siteLists.length !== 3) {
            return sitesMonitors;
        }
        const namesList = siteLists.map(([_, curr]) => curr.map((o) => o.name));

        const relations = namesList.reduce((all, siteList, i) => {
            const otherLists = namesList.filter((n, j) => j !== i);
            const rels = siteList.reduce((allCurr, name1, k) => {
                const otherRels = otherLists.reduce((allOther, names) => {
                    const index = names.findIndex((name2) => new RegExp(name2, 'i').test(name1));
                    if (index !== -1) {
                        return [...allOther, index];
                    }
                    return [...allOther, null];
                }, [] as Array<number | null>[]);
                if (otherRels.some((r) => r !== null)) {
                    otherRels.splice(i, 0, k);
                    if (all.every((p) => JSON.stringify(p) !== JSON.stringify(otherRels))) {
                        return [...allCurr, otherRels];
                    }
                }
                return allCurr;
            }, [] as Array<number | null>[]);
            return [...all, ...rels];
        }, [] as Array<number | null>[]);

        const siteRels = siteLists.reduce((all, [key, list], k) => {
            const newList = list.map((item, j) => {
                const findRelI = relations.findIndex((el) => el[k] === j);
                if (findRelI !== -1) {
                    return { ...item, relation: findRelI + 1 };
                }
                return item;
            });
            return { ...all, [key]: newList };
        }, {});
        return siteRels;
    }, [sitesMonitors]);
    const [sorts, setSorts] = useState<SiteListProps['sorts']>([]);
    return (
        <VStack
            className={classNames(cls.MonitorPage, {}, [className])}
            align="center"
        >
            <Sort
                sorts={sorts}
                onSort={(s) => {
                    setSorts(s);
                }}
            />
            <HStack
                align="start"
                gap="16"
                className={cls.sites}
            >
                {
                    Object.entries(sites).map(([site, { currency }]) => (
                        <AsyncSiteList
                            className={cls.site}
                            key={site}
                            site={site as Site}
                            {...{ setSites, currency }}
                        >
                            <SiteList
                                items={sitesRelsMonitors?.[site as Site] ?? []}
                                {...{ site, sorts }}
                            />
                        </AsyncSiteList>
                    ))
                }
            </HStack>
        </VStack>
    );
});
