import $ from "jquery";

export default async (settings: object) => {
    const getSetting = (search: string) => {
        return $('.table_tool-add-result').not(".is-selected").filter(function () {
            const text = $(this).children('div:last-child').children('div:last-child').text()
                .replace(/(\s+)(.*)(\s+)/, '$2')
            return text === search
        })
    }
    let clicks = 0
    setTimeout(() => {
        Object.entries(settings).forEach(([key, {label}]) => {
            const t = getSetting(label)
            t.on('click', function () {
                clicks += 1
            })
            t.trigger('click')
        })
    }, 3000)

    await new Promise(resolve => {
        const interval = setInterval(() => {
            if (Object.entries(settings).length === clicks) {
                clearInterval(interval)
                resolve(null)
            }
        }, 200)
    })

}
