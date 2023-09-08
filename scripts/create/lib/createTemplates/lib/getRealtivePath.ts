export const getRealtivePath = (from: string, to: string) => {
    const [fromArr, toArr] = [from.split('\\'), to.split('\\')];
    const startI = fromArr.findIndex(
        (el, i) => el !== toArr[i],
    );
    if (startI === -1) return to;
    const diffFrom = fromArr.slice(startI);
    const diffTo = toArr.slice(startI);
    const paths = [
        diffFrom.length > 1
            ? Array(diffFrom.length - 1).fill('..') : '.',
        ...diffTo,
    ].flat();
    return paths.join('/');
};
