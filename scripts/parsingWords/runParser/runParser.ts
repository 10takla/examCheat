import puppeteer from 'puppeteer';

export default async (jsCode: string) => {
    const browser = await puppeteer.launch({
        headless: false,
        ignoreHTTPSErrors: true,
        devtools: true,
        args: ['--window-size=900,1000'],
    });
    const page = await browser.newPage();
    await page.reload({ waitUntil: ['networkidle0', 'domcontentloaded'] });
    await page.goto('https://poliglot16.ru/slova/');

    // eslint-disable-next-line no-shadow
    await page.evaluate((jsCode) => {
        const script = document.createElement('script');
        script.text = jsCode;
        document.head.appendChild(script);
    }, jsCode);
};
