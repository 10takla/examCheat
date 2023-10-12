import $ from "jquery";
import {getAsyncElement, oneTimeEvent} from "../../../lib/dom";

export default async (settings: object) => {
    await getAsyncElement(() => $('.table_tool-add-result'))
    const getSetting = (search: string) => {
        return $('.table_tool-add-result').not(".is-selected").filter(function () {
            const text = $(this).children('div:last-child').children('div:last-child').text()
                .replace(/(\s+)(.*)(\s+)/, '$2')
            return text === search
        })
    }
    await Promise.all(
        Object.entries(settings).map(([key, {label}]) => {
            const el = getSetting(label)
            if (!el.length) return
            return new Promise((resolve) => {
                oneTimeEvent(
                    el, 'click', () => {
                        resolve(null)
                    }
                )
            })
        })
    )
}
