import { Position } from '@/shared/lib/kit/position/position';
import { Direction } from '@/shared/lib/kit/direction/direction';

export default class Rectangle {
    public left: number;

    public right: number;

    public top: number;

    public bottom: number;

    constructor(element: HTMLElement | Rectangle) {
        if (element instanceof HTMLElement) {
            const objectRect = element.getBoundingClientRect();
            this.left = objectRect.left;
            this.right = objectRect.right;
            this.top = objectRect.top;
            this.bottom = objectRect.bottom;
        } else if (element instanceof Rectangle) {
            this.left = element.left;
            this.right = element.right;
            this.top = element.top;
            this.bottom = element.bottom;
        } else {
            throw Error('not valid value of rectangle');
        }
    }

    addTransition(vector: Position) {
        this.left += vector.position[0];
        this.right += vector.position[0];
        this.top += vector.position[1];
        this.bottom += vector.position[1];
    }

    setTransition(vector: Position) {
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
                } return all;
            }, [] as Direction[]);
            return c1;
        });
        if (c2[0].length && c2[1].length) {
            return c2.flat() as Array<Direction>;
        }
        return [];
    }
}
