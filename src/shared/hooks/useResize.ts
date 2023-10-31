import { useEffect } from 'react';

export default (handleResize: (...props: any)=> void, el: Element | Window = window) => {
    useEffect(() => {
        el.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            el.removeEventListener('resize', handleResize);
        };
    }, [el, handleResize]);
};
