import getCompilerCode from './getCompilerCode/getCompilerCode';
import runParser from './runParser/runParser';

(async () => {
    const jsCode = await getCompilerCode();
    await runParser(jsCode);
})();
