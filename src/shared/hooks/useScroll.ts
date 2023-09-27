import { useCallback, useEffect, useState } from 'react';

export default () => {
    const [prevScrollHeight, setPrevScrollHeight] = useState(0);
    const [prevScrollBottom, setPrevScrollBottom] = useState(0);

    // eslint-disable-next-line no-shadow
    const scrollHandler = useCallback((
        event: React.UIEvent<HTMLDivElement>,
        spreadPercentage = 10,
    ) => {
        const { scrollHeight, scrollTop, clientHeight } = event.currentTarget;
        setPrevScrollHeight(scrollHeight);
        const scrollBottom = scrollTop + clientHeight + (clientHeight * (spreadPercentage / 100));
        setPrevScrollBottom(scrollBottom);
        return scrollBottom > prevScrollBottom && scrollBottom >= scrollHeight;
    }, [prevScrollBottom]);

    const [isTrigger, setIsTrigger] = useState(false);
    const onScroll = useCallback((event: React.UIEvent<HTMLDivElement>) => {
        if (scrollHandler(event)) {
            setIsTrigger(true);
        }
    }, [scrollHandler]);

    const [page, setPage] = useState(1);

    useEffect(() => {
        if (isTrigger) {
            setPage((prev) => prev += 1);
        }
    }, [isTrigger]);

    useEffect(() => {
        setIsTrigger(false);
    }, [prevScrollHeight]);

    return { page, onScroll, setIsTrigger };
};
