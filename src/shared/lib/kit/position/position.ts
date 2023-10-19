// eslint-disable-next-line max-classes-per-file
type Point2D = [number, number];
type ClientCoords = Record<'clientX' | 'clientY', number>;
type Coords = Record<'x' | 'y', number>;
type PositionProps = Point2D | ClientCoords

export class Position {
    public position: Point2D = [0, 0];

    constructor(data: PositionProps) {
        if (Array.isArray(data) && data.length === 2) {
            this.position = data;
        } else if ('clientX' in data && 'clientY' in data) {
            this.position = [data.clientX, data.clientY];
        } else {
            throw new Error('Invalid input data');
        }
    }

    addPos(two: Position): Position {
        const one = this.position;
        const t = two.position;
        if (one === null || t === null) {
            throw new Error('Invalid input data');
        }
        this.position = [
            one[0] + t[0],
            one[1] + t[1],
        ];
        return this;
    }

    multiplyPos(two: Position | PositionProps): Position {
        const one = this.position;
        let t;
        if (two instanceof Position) {
            t = two.position;
        } else {
            t = new Position(two).position;
        }
        if (one === null || t === null) {
            throw new Error('Invalid input data');
        }
        this.position = [
            one[0] * t[0],
            one[1] * t[1],
        ];
        return this;
    }

    subPos(two: Position): Position {
        const one = this.position;
        const t = two.position;
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