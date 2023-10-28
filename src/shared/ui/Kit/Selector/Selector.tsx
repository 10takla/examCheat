import { HTMLProps, memo, useMemo } from 'react';

export interface SelectorProps<O extends string = string> extends HTMLProps<HTMLSelectElement>{
    className?: string
    options: O[]
    value?: O
    isNonUndefined?: boolean
}

export const Selector = <O extends string = string>(props: SelectorProps<O>) => {
    const {
        className,
        options,
        value,
        isNonUndefined = false,
        ...otherProps
    } = props;
    const postValue = useMemo(() => value, [value]);

    return (
        <select
            {...otherProps}
            value={postValue}
        >
            {!isNonUndefined && <option value={undefined}>{null}</option>}
            {
                options.map((t) => (
                    <option key={t} value={t}>{t}</option>
                ))
            }
        </select>
    );
};
