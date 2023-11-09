import { BoundariesProps } from '@/shared/hooks/useDraggable/handlers/intoBoundaries';
import Side, { flipSides } from '@/shared/lib/kit/direction/side';
import { Direction } from '@/shared/lib/kit/direction/direction';

interface InBoundariesProps extends Pick<BoundariesProps, 'boundaries'>{
    startB: DOMRect
    endB: DOMRect
}

export default ({ startB, endB, boundaries }: InBoundariesProps) => {
    const objectB = endB;
    const boundary = boundaries[0];
    const dirs = [
        ['left', 'right'],
        ['top', 'bottom'],
    ];
    const postDirs = dirs[0].map((lR) => (
        dirs[1].map((tB) => (
            [lR, tB]
        ))
    )).flat();
    const points = postDirs.map(([lR, tB]) => (
        [objectB[lR], objectB[tB]]
    ));
    const intersPoints = points.reduce((indexes, point, i) => {
        const c = dirs.map((sides, sidesI) => {
            const c2 = sides.map((side, sideI) => {
                const oper = ['>', '<'][sideI];
                return `(${[point[sidesI], oper, boundary[side]].join(' ')})`;
            });
            return c2.join(' && ');
        }).join(' && ');
        if (eval(c)) {
            indexes.push(i);
        }
        return indexes;
    }, [] as string[]);

    const interSides = Array.from(new Set(intersPoints.map((i) => postDirs[i]).flat()));

    const subs = interSides.map((side) => Math.abs(objectB[side] - boundary[flipSides[side]]));
    const fI = subs.findIndex((sub) => sub === Math.min(...subs));
    const minSide = interSides[fI];
    if (minSide) {
        // const { dirI } = new Direction(minSide);
        const val = boundary[flipSides[minSide]];

        return [null, null].map((_, i) => (i === dirI ? val : null));
    }

    return [null, null];
};
