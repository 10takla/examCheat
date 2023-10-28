import { useEffect } from 'react';

export default (handleResize: (...props: any)=> void) => {
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [handleResize]);
};
