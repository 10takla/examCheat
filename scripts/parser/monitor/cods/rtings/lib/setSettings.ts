import $ from "jquery";
import {Setting, Settings} from "../index";
import {getAsyncElement, oneTimeEvent} from "../../../lib/dom";

export default async (settings: Settings) => {
    const getSetting = (search: string) => {
        return $('.table_tool-filter').filter(function () {
            return $(this).find('.table_tool-filter-title > span:first-child').text() === search
        })
    }


    await Promise.all(
        Object.values(settings).map(obj => (
            Object.values(obj as Setting).map(({label}) => (
                    getAsyncElement(() => getSetting(label))
                )
            )
        )).flat()
    )
    for (let [key, {label, value, postProcessing}] of Object.entries(settings.ranges)) {
        const inputs = getSetting(label).find('.slider_control-value > input')
        if (postProcessing) {
            value = await postProcessing(value)
        }
        value?.map((value, i) => {
            if (value !== null) {
                // @ts-ignore
                inputs[i].value = value
                inputs[i].dispatchEvent(new Event('change', {bubbles: true}))
            }
        })
    }
    await Promise.all(
        Object.entries(settings.selectors).map(([key, {label, value, getValue}]) => {
            const optionsEl = getSetting(label).find('.simple_checklist-option > button').get()
            const options = optionsEl.map(el => $(el).find('.simple_checklist-name').text())

            if (getValue) {
                const indexes = getValue(options, value)
                optionsEl.forEach((el, index) => {
                    if (indexes.includes(index)) {
                        return new Promise(resolve => {
                            oneTimeEvent(
                                $(el), 'click', () => {
                                    resolve(null)
                                }
                            )
                        })
                    }
                })
            }
        })
    )
}
