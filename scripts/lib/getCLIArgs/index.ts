import * as process from 'process';

export interface ExtraArgs {
    extraArgs: { path: string }
}
export default (flags: string[]) => {
    const postFlags = flags.reduce((all, curr) => {
        const index = process.argv.findIndex((o) => o === `--${curr}`);
        if (index) {
            const value = process.argv[index + 1];
            if (!value.startsWith('--')) {
                all = { ...all, [curr]: value };
            }
        }
        return all;
    }, {} as {[key in string]: string});

    return { ...postFlags, extraArgs: { path: process.argv[1] } };
};
