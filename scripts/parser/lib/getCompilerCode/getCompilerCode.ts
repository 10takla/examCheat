import { build } from 'vite';
import path from 'path';

export default async (pathToCode: string) => {
    const buildResult = await build({
        root: pathToCode,
        build: {
            rollupOptions: {
                input: path.resolve(pathToCode, 'index.ts'),
            },
            emptyOutDir: true,
            outDir: undefined,
        },
    });

    // @ts-ignore
    const { output } = buildResult;
    const jsCode = output[0].code;
    return jsCode as string;
};
