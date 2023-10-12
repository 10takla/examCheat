import $ from 'jquery';
import siteConfig from '../../config/site.config';
import {getNumsFromSplit, getRate, setToDb} from "../../lib/helpers";
import {SiteOptions} from "../../types/types";

const fromTo = (options: Array<number>, search: number, direction: 'from' | 'to') => {
    let find: number
    if (direction === 'from') {
        find = Math.min(...options.filter(op => op >= search))
    }
    if (direction === 'to') {
        find = Math.max(...options.filter(op => op <= search))
    }
    return options.findIndex(op => op === find)
}

interface Range {
    label: [string | null, string | null],
    postProcessing: (el: string) => void
    findFromRange: (...s: any) => number
}


interface Setting<T extends keyof SiteOptions = keyof SiteOptions> {
    ranges: Partial<Record<T, Range>>,
    selectors: Partial<Record<T,
        {
            label: string
            value: SiteOptions[T]
        }>>
}

const settings: Setting = {
    ranges: {
        displaySize: {
            label: ['Diagonale ab:', 'Diagonale bis:'],
            postProcessing: (el: string) => {
                const tmo = el.replace(/.*\s(\d+)(\.(\d+))?".*/, '$1')
                const t = parseFloat(tmo)
                return t
            },
            findFromRange: fromTo
        },
        refreshRate: {
            label: ['Bildwiederholfrequenz ab:', null],
            postProcessing: (el) => {
                const tmo = el.replace(/.*\s(\d+)Hz.*/, '$1')
                return parseFloat(tmo)
            },
            findFromRange: fromTo
        },
        resolution: {
            label: ['Auflösung ab:', 'Auflösung bis:'],
            postProcessing: (el) => {
                return el.replace(/[^(\d+)x(\d)]/g, '')
                    .split('x')
                    .map(o => parseInt(o))
            },
            findFromRange: (options: Array<[number, number]>, search: [number, number], direction: 'from' | 'to') => {
                const t = options.filter(option => {
                    if (direction === 'from') {
                        return option[0] >= search[0] && option[1] >= search[1]
                    }
                    if (direction === 'to') {
                        return option[0] <= search[0] && option[1] <= search[1]
                    }
                })
                const find = t[0]
                return options.findIndex(op => op === find)
            }
        },
    },
    selectors: {
        pixelType: {
            label: 'Panel:',
            value: siteConfig.pixelType
        },
    }
};

type PostRangesSettings = Range & {
    values: Partial<Record<'from' | 'to' | 'all', number>>
}


const postSettings = {
    ...settings,
    ranges: Object.entries(settings.ranges).reduce((all, [key, curr]) => {
        if (key in siteConfig) {
            const value = siteConfig[key as keyof SiteOptions]
            let values
            if (Array.isArray(value) && value.length === 2) {
                values = {from: value[0], to: value[1]}
            }
            if (typeof value === 'number') {
                values = {all: value}
            }
            all = {...all, [key]: {...curr, values}}
        }
        return {[key]: curr, ...all}
    }, {} as PostRangesSettings),
};

const getOptionContent = (label: string) => {
    const [optionsHrefs, options]: [Array<string>, Array<string>] = [[], []]
    $(`.xf_th:contains("${label}")`)
        .closest('.xf_tr')
        .children('.xf_td')
        .children('a')
        .each(function () {
            optionsHrefs.push($(this).attr('href')!.replace('./?cat=monlcd19wide&xf=', ''))
            options.push(
                $(this).children('span.xf_v')[0].textContent!
            );
        });
    return [optionsHrefs, options]
}

const getRangesHrefs = (setting: PostRangesSettings) => {
    return Object.entries(setting.values).reduce((all, curr, index) => {
        const [direction, value] = curr
        if (value !== null) {
            const [optionsHrefs, options] = getOptionContent(setting.label[index] ?? '')
            const postOptions = options.map(op => setting.postProcessing(op))
            const findIndex = setting.findFromRange(
                postOptions,
                value,
                direction);
            return [...all, optionsHrefs[findIndex] as string]
        }
        return all
    }, [] as Array<string>);
}

const setHrefs = async () => {
    const allHrefs: string[] = []
    const hrefs: string[] = [];

    const {ranges, selectors} = postSettings
    Object.values(ranges).forEach((setting) => {
        hrefs.push(...getRangesHrefs(setting))
    });
    Object.values(selectors).forEach((setting) => {
        if (setting.value !== undefined) {
            const [optionsHrefs, options] = getOptionContent(setting.label)
            const tmp = setting.value
            options.forEach((option, index) => {
                // @ts-ignore
                if (setting.value.includes(option)) {
                    hrefs.push(
                        optionsHrefs[index]
                    )
                }
            })

        }
    });
    allHrefs.push(`cat=monlcd19wide&xf=${hrefs.join('~')}`)
    if (siteConfig.price) {
        const rate = await getRate('EUR')
        const t = siteConfig.price
            .reduce((all, curr, index) => {
                if (curr !== null) {
                    return [...all, `bp${['min', 'max'][index]}=${Math.ceil(curr / rate)}`]
                }
                return all
            }, [] as string[])
        allHrefs.push(
            ...t
        )
    }
    allHrefs.push('bl1_id=1000')
    // window.location.href = `?${allHrefs.join('&')}`;

    setTimeout(function () {
        const replaceNum = (val: string | undefined) => {
            return val ? parseFloat(val
                .replace(/[^(\d+)(\.,(\d+))?]/g, '')
                .replace(',', '.')) : undefined
        }

        const items: Partial<Item>[] = []
        $('.productlist__product').each(function () {
            const tmp = {
                price: $(this).find('.productlist__price .notrans').text(),
                stars: $(this).find('.productlist__rating .stars-rating').attr('style'),
                reviews: $(this).find('.productlist__rating .rating_details_counttext').text()
            }
            const info = $(this).find('.productlist__description .notrans').text()
            const t = {
                'Diagonale': {
                    diagonalSize: {
                        rule: /^(\d+)".*/,
                        parseNum: true
                    }
                },
                'Auflösung': {
                    resolution: {
                        rule: /((\d+)x(\d+))/,
                        splitNum: 'x'
                    },
                    aspectRatio: {
                        rule: /((\d+):(\d+))/,
                        splitNum: ':'
                    },
                    pixelDensity: {
                        rule: /(\d+)ppi$/,
                        parseNum: true
                    },
                },
                'Helligkeit': {
                    brightness: {
                        max: {
                            rule: /(\d+)\w+ \(typisch/,
                            parseNum: true
                        },
                        min: {
                            rule: /, (\d+).*? \(HDR/,
                            parseNum: true
                        },
                    }
                },
                'Kontrast': {
                    contrast: {
                        rule: /((\d+).(\d+):(\d+))/,
                        splitNum: ':'
                    },
                },
                'Reaktionszeit': {
                    responseTime: {
                        GtG: {
                            rule: /(\d+).*? \(GtG/,
                            parseNum: true
                        },
                        MPRT: {
                            rule: /, (\d+).*? \(MPRT/,
                            parseNum: true
                        },
                    }
                },
                'Blickwinkel': {
                    viewAngle: {
                        rule: /(\d+?)/,
                        parseNum: true
                    },
                },
                'Panel': {
                    pixelType: {
                        rule: /(\w+)/
                    },
                },
            }
            const recurse = (curr: object, info: string): object => {
                return Object.entries(curr).reduce((all, [key, curr]) => {
                    let t
                    if ('rule' in curr) {
                        t = curr.rule.exec(info)?.[1]
                        if ('parseNum' in curr) {
                            t = !isNaN(parseFloat(t)) ? parseFloat(t) : undefined
                        }
                        if ('splitNum' in curr) {
                            t = getNumsFromSplit(t, curr.splitNum)
                        }
                    } else {
                        t = recurse(curr, info)
                    }
                    return {...all, [key]: t}
                }, {})
            }
            const r = Object.entries(t).reduce((all, [label, curr]) => {
                const rule = new RegExp(`${label}: (.*?) • `, 'g')
                const value = rule.exec(info)
                if (value?.[1]) {
                    return {...all, ...recurse(curr, value[1])}
                }
                return all
            }, {})
            items.push({
                image: $(this).find('.productlist__image img').attr('src'),
                link:  $(this).find('.productlist__name > a').attr('href'),
                price: replaceNum(tmp.price),
                rating: {
                    stars: replaceNum(tmp.stars),
                    reviews: replaceNum(tmp.reviews),
                },
                name: $(this).find('.productlist__name > a > .notrans').text().replace(/\n.*?([^,]+),.*\n/, '$1'),
                ...r
            })
        })
        setToDb('geizhals', items)
    }, 1000);
};

interface Item {
    image: string
    price: number
    link: string
    rating: {
        [key in 'stars' | 'reviews']?: number
    }
    name: string
}


setHrefs()
