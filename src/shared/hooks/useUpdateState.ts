import {
    Dispatch, SetStateAction, useEffect, useState,
} from 'react';

export default <T>(initialState: T, deps: any[] = []) => {
    const [state, setState] = useState<T>(initialState);
    useEffect(() => {
        setState(initialState);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialState, ...deps]);
    return [state, setState] as [T, Dispatch<SetStateAction<T>>];
};
