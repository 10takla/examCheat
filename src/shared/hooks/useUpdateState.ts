import { useEffect, useState } from 'react';

type PreProc<T> = T extends () => any ? ReturnType<T> : T

export default <T extends any>(initialState: T,
    deps: any[] = []) => {
    const preProc = typeof initialState === 'function' ? initialState() : initialState;
    const [state, setState] = useState<PreProc<T>>(preProc);
    useEffect(() => {
        setState(preProc);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialState, ...deps]);
    return [state, setState] as [typeof state, typeof setState];
};
