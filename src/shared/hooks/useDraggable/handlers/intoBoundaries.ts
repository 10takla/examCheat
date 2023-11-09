import { Direction } from '@/shared/lib/kit/direction/direction';

type IntoBoundariesReturn = Partial<Record<keyof DOMRect, number>>
type DirNames = 'x' | 'y'

type Dirs = Record<DirNames, Array<keyof DOMRect>>
export const dirs: Dirs = {
    x: ['left', 'right'],
    y: ['top', 'bottom'],
};

export interface BoundariesProps {
    object: DOMRect
    boundaries: DOMRect[]
}

export default ({ object, boundaries }:BoundariesProps) => (
    boundaries.map((boundary) => (
        Object.values(dirs).reduce((allSides, sides) => {
            const intersection = sides.reduce((all, side) => {
                const direction = new Direction(side);
                const objectS = object[side] as number;
                const operator = ['<', '>'][direction.sideI];
                const boundaryS = boundary[direction.side] as number;
                const condition = [objectS, operator, boundaryS].join(' ');
                // eslint-disable-next-line no-eval
                if (eval(condition)) {
                    const subFactor = direction.sideI === 1 ? object[direction.width] : 0;
                    all = Number(boundaryS) - Number(subFactor);
                }
                return all;
            }, null as number | null);
            return [...allSides, intersection];
        }, [] as Array<number | null>)
    ))
);
