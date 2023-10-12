import {getAsyncElement} from "../../../lib/dom";
import $ from 'jquery'
import runParser from "../../../../lib/runParser/runParser";

export default async () => {
    const els = $('.model-listing-container-80 > div').get()

    for (let el of els) {
        const href = $(el).children('a').attr('href')!
        console.log(`NewPage${JSON.stringify({url: href, jsCode: 'console.log(2)'})}}`)
        break
    }
}
