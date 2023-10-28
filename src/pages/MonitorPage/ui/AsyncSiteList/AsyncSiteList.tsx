import { memo, ReactElement, useEffect } from 'react';
import { api } from '@/shared/api/api';
import { Currency, getRate } from '../../../../../scripts/parser/monitor/lib/helpers';
import { Site } from '../../../../../scripts/parser/monitor/types/types';
import { MonitorType } from './ui/SiteList/ui/Monitor/model/types/monitor.types';
import { SortProps } from '@/pages/MonitorPage/ui/Sort/Sort';

export interface AsyncSiteListProps extends Pick<SortProps<any>, 'sort'> {
    className?: string,
    site: Site,
    setSites: (site: Site, items: MonitorType[]) => void,
    currency: Currency
    children: ReactElement
}

export const AsyncSiteList = memo((props: AsyncSiteListProps) => {
    const {
        site,
        setSites,
        currency,
        children,
    } = props;

    useEffect(() => {
        api.get(site, {
            params: { _sort: 'price' },
        })
            .then(async ({ data }) => {
                const monitors = data as MonitorType[];
                setSites(site, monitors);
                try {
                    const rate = await getRate(currency);
                    const t = monitors.map(({ price, ...monitor }) => ({
                        ...monitor,
                        price: price && Math.round((price * rate) * 100) / 100,
                    }));
                    setSites(site, t);
                } catch (e) {

                }
            });
    }, [currency, setSites, site]);

    return (
        children
    );
});
