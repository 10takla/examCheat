type FromTo<T> = [(T | null), (T | null)]

type ItemOptions = Partial<{
    resolution: FromTo<[number, number]>
    refreshRate: FromTo<number>
    diagonalSize: FromTo<number>
    pixelType: Array<'IPS' | 'VA' | 'TN' | 'OLED'>
    price: FromTo<number>
}>
export type MonitorType = Record<'name' | 'link' | 'image', string> & ItemOptions &
    {
        rating: number | {
            start: number | Record<string, number>
            reviews: number
        }
    }

export interface MonitorSchema {
    data?: MonitorType;
    isLoading: boolean;
    error?: string;
}
