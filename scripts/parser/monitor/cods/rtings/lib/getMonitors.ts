import {oneTimeEvent} from "../../../lib/dom";
import {getNumsFromSplit} from "../../../lib/helpers";

export default async () => {
    await new Promise(resolve => {
        const check = () => {
            const el = $('.simple_table-view_more-button')
            if (el.length) {
                oneTimeEvent(el, 'click', () => {
                    setTimeout(() => {
                        check()
                    }, 1000)
                })
            } else {
                resolve(null)
            }
        }
        check()
    })
    return $('.simple_table-table > tbody > tr').get().map((mon) => {
        const arr = $(mon).find('td').get().map(o => $(o).text())
        const [
            name,
            year,
            reviews,
            size,
            Mixed_Usage,
            Office,
            Gaming,
            Media_Consumption,
            Media_Creation,
            HDR,
            price,
            TestMethodology,
            resolution,
            pixelType,
            aspectRatio,
            displaySize,
            refreshRate,
            pixelDensity,
            contrast,
            brightness,
        ] = arr
        return {
            image: $(mon).find('.table_cell_product-link > img').attr('src'),
            name: $(mon).find('.table_cell_product-name').text(),
            link: $(mon).find('.table_cell_product-link').attr('href'),
            pixelType,
            rating: {
                reviews: parseFloat(reviews),
                stars: Object.entries(
                    {
                        Mixed_Usage,
                        Office,
                        Gaming,
                        Media_Consumption,
                        Media_Creation,
                        HDR
                    }
                ).reduce((all, [key, curr]) => {
                    return {...all, [key]: parseFloat(curr)}
                }, {})
            },
            resolution: getNumsFromSplit(resolution, ' x '),
            aspectRatio: getNumsFromSplit(aspectRatio, ':'),
            contrast: getNumsFromSplit(contrast, ':'),
            ...Object.entries({refreshRate, displaySize, pixelDensity, brightness}).reduce((all, [key, curr]) => {
                return {...all, [key]: parseFloat(curr.replace(/[^\d]/, ''))}
            }, {})
        }
    })
}
