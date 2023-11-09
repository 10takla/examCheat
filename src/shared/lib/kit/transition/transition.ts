import { MutableRefObject, useCallback } from 'react';
import { Position, PositionCursor } from '@/shared/lib/kit/position/position';
import intoBoundaries from '@/shared/hooks/useDraggable/handlers/intoBoundaries';
import { Direction } from '@/shared/lib/kit/direction/direction';
import Rectangle from '@/shared/lib/kit/transition/Rectangle';

type Ref<T> = T | MutableRefObject<T | null>

export class Transition {
    public object: HTMLElement;

    public prevPos: Position = new Position([0, 0]);

    get position(): Position {
        const objB = this.object.getBoundingClientRect();
        return new Position([objB.left, objB.top]);
    }

    get translate(): Position {
        const regStr = this.object.style.transform.match(/-?\d+/g);
        let tmp: Position['position'];
        if (Array.isArray(regStr) && regStr.length !== 2) {
            tmp = [Number(regStr[0]), 0];
        } else if (!regStr) {
            tmp = [0, 0];
        } else {
            tmp = regStr.map((o) => Number(o)) as Position['position'];
        }
        return new Position(tmp);
    }

    get startPos(): Position {
        return this.position.sub(this.translate);
    }

    // eslint-disable-next-line class-methods-use-this
    private checkRef<T extends HTMLElement | HTMLElement[]>(ref: Ref<T>) {
        if ('current' in ref) {
            if (ref.current) {
                return ref.current;
            }
            return null;
        }
        return ref as HTMLElement;
    }

    constructor(
        ref: Ref<HTMLElement>,
    ) {
        this.object = this.checkRef(ref);
        this.savePrevPos();
    }

    savePrevPos() {
        this.prevPos = this.position;
    }

    setTranslate(pos: Position) {
        const newPos = new Position(pos);
        const v = newPos.sub(this.startPos);
        const v1 = v.position.map((o) => `${o}px`).join(', ');
        this.object.style.transform = `translate(${v1})`;
    }
}
