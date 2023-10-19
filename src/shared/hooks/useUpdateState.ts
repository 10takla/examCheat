import {
    Dispatch, SetStateAction, useEffect, useState,
} from 'react';

export default <T>(initialState: T) => {
    const [state, setState] = useState<T>(initialState);
    useEffect(() => {
        setState(initialState);
    }, [initialState]);
    return [state, setState] as [T, Dispatch<SetStateAction<T>>];
};
