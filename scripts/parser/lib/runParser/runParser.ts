import puppeteer from 'puppeteer';

export default async (jsCode: string, url: string) => {
    const browser = await puppeteer.launch({
        headless: false,
        ignoreHTTPSErrors: true,
        devtools: true,
        args: ['--window-size=900,1000'],
    });
    const page = await browser.newPage();
    await page.reload({ waitUntil: ['networkidle0', 'domcontentloaded'] });
    await page.goto(url);

    const scriptCompletionPromise = new Promise<void>((resolve) => {
        page.on('console', (message) => {
            const text = message.text()
            if (text === 'ScriptCompleted') {
                resolve();
            }
            const rule = new RegExp(`NewPage`)
            if(rule.test(text)) {
                const tmp = text.replace(rule, '')
                console.log(JSON.parse(tmp))
            }

        });
    });

    // eslint-disable-next-line no-shadow
    await page.evaluate((jsCode) => {
        const script = document.createElement('script');
        script.text = jsCode;
        document.head.appendChild(script);
    }, jsCode);

    await scriptCompletionPromise;

    await browser.close();
};
