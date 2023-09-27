declare module '*.scss' {
    const cls: Record<string, string>;
    export default cls;
}
declare module '*.css' {
    const cls: Record<string, string>;
    export default cls;
}

declare module '*.svg' {
    import React from 'react';

    const svg: React.VFC<React.SVGProps<SVGSVGElement>>;

    export default svg;
}

declare const __API__: string;
declare const __IS_DEV__: boolean;
type DeepPartial<T extends object> = Partial<{
    [key in keyof T]:
    T[key] extends object
        ? DeepPartial<T[key]>
        : T[key]
}>

type ReplaceFields<T, P> = Exclude<T, P> & P

type OptionalRecord<K extends keyof any, T> = {
    [P in K]?: T;
};
