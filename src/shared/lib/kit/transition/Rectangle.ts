import { Vector } from '@/shared/lib/kit/position/vector';
import { Direction } from '@/shared/lib/kit/direction/direction';

export default class Rectangle {
    public left: number;

    public right: number;

    public top: number;

    public bottom: number;

    constructor(arg: HTMLElement | Rectangle | number[]) {
        if (arg instanceof HTMLElement) {
            const objectRect = arg.getBoundingClientRect();
            this.left = objectRect.left;
            this.right = objectRect.right;
            this.top = objectRect.top;
            this.bottom = objectRect.bottom;
        } else if (arg instanceof Rectangle) {
            this.left = arg.left;
            this.right = arg.right;
            this.top = arg.top;
            this.bottom = arg.bottom;
        } else if (Array.isArray(arg) && arg.length === 4) {
            ['left', 'right', 'top', 'bottom'].forEach((key, i) => {
                // @ts-ignore
                this[key] = arg[i];
            });
        } else {
            throw Error('not valid value of rectangle');
        }
    }

    addTransition(vector: Vector) {
        this.left += vector.position[0];
        this.right += vector.position[0];
        this.top += vector.position[1];
        this.bottom += vector.position[1];
    }

    setTransition(vector: Vector) {
        const width = this.right - this.left;
        const height = this.top - this.bottom;
        this.left = vector.position[0];
        this.right = vector.position[0] + width;
        this.top = vector.position[1];
        this.bottom = vector.position[1] + height;
    }

    getIntersection(obj: Rectangle) {
        const interRec = new Rectangle(obj);
        const dirs = [
            ['left', 'right'],
            ['top', 'bottom'],
        ];
        const c2 = dirs.map((sides) => {
            const c1 = sides.reduce((all, side) => {
                const c = sides.map((side2, side2I) => (
                    [
                        this[side],
                        ['>', '<'][side2I],
                        interRec[side2],
                    ].join(' ')
                )).join(' && ');
                if (eval(c)) {
                    all.push(new Direction(side));
                }
                return all;
            }, [] as Direction[]);
            return c1;
        });
        if (c2[0].length && c2[1].length) {
            return c2.flat() as Array<Direction>;
        }
        return [];
    }
}
