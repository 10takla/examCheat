import $ from "jquery";
import siteConfig from "../../config/site.config";
import prepareSettings from "./lib/prepareSettings";
import setSettings from "./lib/setSettings";
import {getNumsFromSplit, getRate, setToDb} from "../../lib/helpers";
import getMonitors from "./lib/getMonitors";
import {SiteOptions} from "../../types/types";

const script = document.createElement('script')
script.src = "https://code.jquery.com/jquery-3.7.0.slim.min.js"
document.head.appendChild(script)

export interface Setting<K extends keyof SiteOptions = keyof SiteOptions> {
    label: string
    value?: SiteOptions[K]
    postProcessing?: (value: SiteOptions[K]) => Promise<SiteOptions[K]>
    getValue?: (options: string[], search: SiteOptions[K]) => number[]
}

export interface Settings<K extends keyof SiteOptions = keyof SiteOptions> {
    selectors: Partial<Record<K, Setting<K>>>,
    ranges: Partial<Record<K, Setting<K>>>
}


const settings: Settings = {
    selectors: {
        resolution: {
            label: 'Native Resolution',
            value: siteConfig["resolution"],
            getValue: (options, search: any) => {
                const nums = options.filter((op) => {
                    const tmp = getNumsFromSplit(op, ' x ')
                    return tmp.every((n, i) => {
                            return !(search?.[0]?.[i]) || n >= search[0][i]
                        }) &&
                        tmp.every((n, i) => {
                            return !(search?.[1]?.[i]) || n <= search[1][i]
                        })
                })

                return options.reduce((all, curr, index) => {
                    if (nums.includes(curr)) {
                        all.push(index)
                    }
                    return all
                }, [] as number[])
            },
        },
        pixelType: {
            label: 'Pixel Type',
            value: siteConfig["pixelType"],
            getValue: (options, search: any) => (
                options.reduce((all, curr, index) => {
                    if (search.includes(curr)) {
                        all.push(index)
                    }
                    return all
                }, [] as number[])
            )
        },
        aspectRatio: {
            label: 'Aspect Ratio'
        }
    },
    ranges: {
        displaySize: {
            label: 'Size',
            value: siteConfig["displaySize"]
        },
        refreshRate: {
            label: "Native Refresh Rate",
            value: siteConfig["refreshRate"]
        },
        price: {
            label: "Price",
            value: siteConfig["price"],
            postProcessing: async (value: any) => {
                const rate = await getRate('USD')
                // @ts-ignore
                return value?.map(o => o !== null ? o / rate : null)
            },
        },
        pixelDensity: {
            label: "Pixel Density",
        },
        contrast: {
            label: "Native Contrast"
        },
        brightness: {
            label: 'Minimum Brightness'
        }
    }
}

$(document).ready(async () => {
    await prepareSettings(Object.values(settings)
        .reduce((all, curr) => ({...all, ...curr}), {}))
    await setSettings(settings)
    const monitors = await getMonitors()
    console.log(monitors)
    setToDb('rtings', monitors)
});


