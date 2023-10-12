type FromTo<T extends number | Array<number>> = [(T | null), (T | null)]
export type MonitorProps = {
    pixelType: 'IPS' | 'VA' | 'TN' | 'OLED'
} & {
    [key in 'contrast' | 'aspectRatio' | 'resolution']: [number, number]
} & {
    [key in 'brightness' | 'pixelDensity' | 'diagonalSize' | 'viewAngle' | 'responseTime' | 'price' | 'refreshRate']: number
}


export type SiteOption = {
    [key in keyof MonitorProps]?: MonitorProps[key] extends number | Array<number> ?
        FromTo<MonitorProps[key]> :
        MonitorProps[key] extends string ?
            Array<string>
            : unknown
}
