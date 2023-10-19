import { MonitorProps } from '../../../../../../../scripts/parser/monitor/types/types';

export type MonitorType = Record<'name' | 'link' | 'image', string> & MonitorProps &
    {
        rating: number | {
            start: number | Record<string, number>
            reviews: number
        }
    }
