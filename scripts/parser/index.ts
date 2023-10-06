import path from 'path';
import { Code } from './types/parser';
import getCLIArgs, { ExtraArgs } from '../lib/getCLIArgs';
import getCompilerCode from './lib/getCompilerCode/getCompilerCode';
import runParser from './lib/runParser/runParser';

interface ParserProps extends ExtraArgs {
    code?: Code
    url?: string
}

const { code, url } = getCLIArgs(['code', 'url']) as ParserProps;

if (code && url) {
    const postPath = path.resolve(__dirname, 'cods', code);
    (async () => {
        const jsCode = await getCompilerCode(postPath);
        await runParser(jsCode, url);
    })();
}
