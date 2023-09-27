import path from 'path';
import { build } from 'vite';

export default async () => {
    const buildResult = await build({
        root: path.resolve(__dirname, '..', 'getWords'),
        build: {
            rollupOptions: {
                input: path.resolve(__dirname, '..', 'getWords', 'index.ts'), // Укажите путь к вашему файлу-точке входа
            },
            emptyOutDir: true,
            outDir: undefined, // Это гарантирует, что результат не будет записан в файлы, а будет доступен в памяти
        },
    });

    // @ts-ignore
    const { output } = buildResult;
    const jsCode = output[0].code;

    return jsCode as string;
};
