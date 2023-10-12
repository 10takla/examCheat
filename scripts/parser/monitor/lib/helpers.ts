import {Site} from "../types/types";

export const getNumsFromSplit = (string: string, splitter: string) => {
    return string.split(splitter).map((o) => parseFloat(o.replace(',', '.')))
}

export type Currency = 'EUR' | 'USD'
export const getRate = async (currency: Currency): Promise<number> => {
    const {Valute: {[currency]: {Value: Rate}}} = await fetch('https://www.cbr-xml-daily.ru/daily_json.js')
        .then(resp => resp.json())
    return Rate as number
}

export const setToDb = (site: Site, items: any[]) => {
    return fetch(`http://localhost:8000/${site}`, {
        headers: {
            "Content-type": "application/json"
        },
        method: 'POST',
        body: JSON.stringify(items)
    })
}
