import {SiteOptions} from "../../../types/types";
import siteConfig from "../../../config/site.config";
import $ from 'jquery'
import {getAsyncElement, oneTimeEvent} from "../../../lib/dom";

type Options = {
    [key in keyof SiteOptions]?: {
        label: string
        value?: SiteOptions[key]
    }
}

type Settings = {
    ranges: Options
    selectors: Options
}
const settings: Settings = {
    ranges: {
        refreshRate: {
            label: 'Frequency'
        },
        resolution: {
            label: 'Resolution'
        },
        displaySize: {
            label: 'Size'
        },
    },
    selectors: {
        pixelType: {
            label: 'display_type',
            value: siteConfig['pixelType'],
        }
    }
}

export default async () => {
    Object.entries(settings.ranges).map(([key, {label}]) => {

    })
    await Promise.all(
        Object.entries(settings.selectors).map(([key, {label, value}]) => {
            if (value) {
                const select = $(`select[name="${label}"]`)
                const option = select.children('option').filter(function () {
                    return $(this).text() === value[0]
                })
                select.val(option.attr('value'))
                return new Promise(resolve => {
                    oneTimeEvent(select, 'change', async () => {
                        await getAsyncElement(() => $('.model-listing-container-80'))
                        resolve(null)
                    })
                })
            }
        })
    )



}
