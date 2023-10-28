import { useEffect, useMemo, useState } from 'react';

export default <T = undefined>(func: () => T, deps = []) => {
    const [state, setState] = useState(func);

    useEffect(() => {
        setState(func());
    }, [...deps]);
    return state;
};
