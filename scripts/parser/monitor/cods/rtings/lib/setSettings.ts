import $ from "jquery";
import siteConfig, {Site} from "../../../config/site.config";

export default async (settings: object) => {
    const getSetting = (search: string) => {
        return $('.table_tool-filter').filter(function () {
            // console.log($(this).find('.table_tool-filter-title > span:first-child').text())
            return $(this).find('.table_tool-filter-title > span:first-child').text() === search
        }).find('.slider_control-value > input')
    }

    Object.entries(settings).map(([key, {label}]) => {
        console.log(getSetting(label))
    })

    // siteConfig[key as keyof Site]?.map((value, i) => {
    //     try {
    //         inputs[i].value = value
    //         inputs[i].dispatchEvent(new Event('change', {bubbles: true}))
    //     } catch (e) {
    //
    //     }
    // })
}
