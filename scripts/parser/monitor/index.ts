import path from 'path';
import getCompilerCode from '../lib/getCompilerCode/getCompilerCode';
import runParser from '../lib/runParser/runParser';
import {Site} from "./types/types";

export const sites: Partial<Record<Site, string>> = {
    // rtings: 'https://www.rtings.com/monitor/tools/table',
    // geizhals: 'https://geizhals.eu/?cat=monlcd19wide',
    displays: 'https://www.displayspecifications.com/en/display-finder'
};

Object.entries(sites).forEach(([siteName, url]) => {
    (async () => {
        const pathToCode = path.resolve(__dirname, '.', 'cods', siteName);
        const jsCode = await getCompilerCode(pathToCode);
        await runParser(jsCode, url);
    })();
});
