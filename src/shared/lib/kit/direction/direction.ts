import Side, { flipSides } from '@/shared/lib/kit/direction/side';

type Directions = {
    X: 'x' | 'row',
    Y: 'y' | 'column'
}
export type AllDirs = keyof Directions | Directions[keyof Directions] | 0 | 1 | keyof DOMRect

const keys: Array<keyof DOMRect> = ['width', 'left', 'right', 'height'];

export const sides: Record<keyof Directions, Partial<Record<keyof DOMRect, keyof DOMRect>>> = {
    X: keys.reduce(
        (all, curr) => ({ ...all, [curr]: curr }),
        {},
    ),
    Y: keys.reduce(
        (all, curr) => ({ ...all, [curr]: flipSides[curr] }),
        {},
    ),
};
const allDirs = [
    ['X', 'x', 'row', 'left', 'right', 'width'],
    ['Y', 'y', 'column', 'top', 'bottom', 'height'],
];

export class Direction extends Side {
    public dirI: number;

    constructor(direction: AllDirs) {
        super(direction);
        switch (typeof direction) {
        case 'string':
            this.dirI = allDirs.findIndex((dirs) => dirs.includes(direction));
            break;
        case 'number':
            this.dirI = direction;
            break;
        default:
            throw Error('not valid direction');
        }
    }

    get left() {
        return Object.values(sides)[this.dirI].left;
    }

    get right() {
        return Object.values(sides)[this.dirI].right;
    }

    get width() {
        return Object.values(sides)[this.dirI].width;
    }

    changeDir(object: [number, number], val: number) {
        if (this.dirI !== -1) {
            return object.map((o, i) => {
                if (i === this.dirI) {
                    return val;
                }
                return o;
            });
        }
        return object.map(() => val);
    }

    get flipDirectionSide() {
        const fI = allDirs[this.dirI].findIndex((side) => side === this.side);
        return allDirs[this.dirI === 0 ? 1 : 0][fI];
    }
}
