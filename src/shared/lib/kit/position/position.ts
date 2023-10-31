// eslint-disable-next-line max-classes-per-file
type Point2D = [number, number] | number[];
type ClientCoords = Record<'clientX' | 'clientY', number>;
type Coords = Record<'x' | 'y', number>;
type PositionProps = Point2D | ClientCoords

export class Position {
    public position: Point2D = [0, 0];

    get length(): number {
        return Math.sqrt(this.position[0] ** 2 + this.position[1] ** 2);
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

    set(two: Position | PositionProps): Position {
        const t = this.getTwo(two);
        if (t === null) {
            throw new Error('Invalid input data');
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
