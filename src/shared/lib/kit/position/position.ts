// eslint-disable-next-line max-classes-per-file
import Side from '@/shared/lib/kit/direction/side';
import { Direction } from '@/shared/lib/kit/direction/direction';

export type Point2D = [number, number] | number[];
type ClientCoords = Record<'clientX' | 'clientY', number>;
type Coords = Record<'x' | 'y', number>;
type PositionProps = Point2D | ClientCoords

export class Position {
    public position: Point2D = [0, 0];

    get x() {
        return this.position[0];
    }

    get y() {
        return this.position[1];
    }

    get length(): number {
        return Math.sqrt(this.position[0] ** 2 + this.position[1] ** 2);
    }

    get new() {
        return new Position(this.position);
    }

    constructor(data: PositionProps | Position) {
        if (data instanceof Position) {
            this.position = data.position;
        } else if (Array.isArray(data) && data.length === 2) {
            this.position = data;
        } else if ('clientX' in data && 'clientY' in data) {
            this.position = [data.clientX, data.clientY];
        } else {
            throw new Error('Invalid input data');
        }
    }

    private getTwo(two: Position | PositionProps) {
        if (two instanceof Position) {
            return two.position;
        }
        return new Position(two).position;
    }

    // setSide(side: Direction['side'], value: number) {
    //     console.log(value);
    //     const { dirI } = new Direction(side);
    //     this.position[dirI] = value;
    // }

    set(newPos: Position | PositionProps | [Side]): Position {
        const t = this.getTwo(newPos);
        if (t === null) {
            throw new Error('Invalid input data');
        }
        if (newPos instanceof Position) {
            this.position = newPos.position;
        } else {
            this.position = new Position(newPos).position;
        }
        this.position = t;
        return this;
    }

    add(two: Position | PositionProps): Position {
        const one = this.position;
        const t = this.getTwo(two);
        if (one === null || t === null) {
            throw new Error('Invalid input data');
        }
        // console.log(one[1], '+', t[1]);
        this.position = [
            one[0] + t[0],
            one[1] + t[1],
        ];
        // console.log(this.position[1],);
        return this;
    }

    multiply(two: Position | PositionProps): Position {
        const one = this.position;
        const t = this.getTwo(two);
        if (one === null || t === null) {
            throw new Error('Invalid input data');
        }
        this.position = [
            one[0] * t[0],
            one[1] * t[1],
        ];
        return this;
    }

    sub(two: Position | PositionProps): Position {
        const one = this.position;
        const t = this.getTwo(two);
        if (one === null || t === null) {
            throw new Error('Invalid input data');
        }
        this.position = [
            one[0] - t[0],
            one[1] - t[1],
        ];
        return this;
    }
}

export class PositionCursor extends Position {
    constructor(event: MouseEvent) {
        super({ clientX: event.clientX, clientY: event.clientY });
    }
}
