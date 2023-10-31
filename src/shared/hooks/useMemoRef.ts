import { useEffect, useState } from 'react';

export default <T = undefined>(func: () => T, deps: any[] = []) => {
    const [state, setState] = useState(func);

    useEffect(() => {
        setState(func());
    }, [...deps]);

    return state;
};
