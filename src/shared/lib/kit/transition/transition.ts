import { MutableRefObject, useCallback } from 'react';
import { Vector, PositionCursor } from '@/shared/lib/kit/position/vector';
import intoBoundaries from '@/shared/hooks/useDraggable/handlers/intoBoundaries';
import { Direction } from '@/shared/lib/kit/direction/direction';
import Rectangle from '@/shared/lib/kit/transition/Rectangle';

type Ref<T> = T | MutableRefObject<T | null>

export class Transition {
    public object: HTMLElement;

    public prevPos: Vector = new Vector([0, 0]);

    get position(): Vector {
        const objB = this.object.getBoundingClientRect();
        return new Vector([objB.left, objB.top]);
    }

    get translate(): Vector {
        const regStr = this.object.style.transform.match(/-?\d+/g);
        let tmp: Vector['position'];
        if (Array.isArray(regStr) && regStr.length !== 2) {
            tmp = [Number(regStr[0]), 0];
        } else if (!regStr) {
            tmp = [0, 0];
        } else {
            tmp = regStr.map((o) => Number(o)) as Vector['position'];
        }
        return new Vector(tmp);
    }

    get startPos(): Vector {
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

    setTranslate(pos: Vector) {
        const newPos = new Vector(pos);
        const v = newPos.sub(this.startPos);
        const v1 = v.position.map((o) => `${o}px`).join(', ');
        this.object.style.transform = `translate(${v1})`;
    }
}
