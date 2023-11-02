import { MutableRefObject, useCallback } from 'react';
import { Position, PositionCursor } from '@/shared/lib/kit/position/position';

type Ref<T> = T | MutableRefObject<T | null>

export class Transition {
    public object: HTMLElement;

    private overLimitsObjs: HTMLElement[] = [];

    private intoLimitObj: HTMLElement[] = [];

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
        {
            overLimitsRef = [],
            intoLimitsRef = [],
        }: Partial<Record<'overLimitsRef' | 'intoLimitsRef', Ref<HTMLElement[]>>>,
    ) {
        this.object = this.checkRef(ref);
    }

    setTranslate(pos: Position, direction?: 'X' | 'Y') {
        const v = pos.sub(this.startPos);
        // console.log(v.position);
        // eslint-disable-next-line no-nested-ternary
        const extraP = direction === 'X' ? [1, 0] : direction === 'Y' ? [0, 1] : [1, 1];
        const v1 = v.multiply(extraP).position.map((o) => `${o}px`).join(', ');
        this.object.style.transform = `translate(${v1})`;
    }

    addTranslate(vector: Position) {
        this.setTranslate(this.position.add(vector));
        console.log(this.position.add(vector).position);
    }

    private dirs: Record<'X' | 'Y', Record<'side' | 'antiSide' | 'len', keyof DOMRect>> = {
        X: { side: 'left', antiSide: 'right', len: 'width' },
        Y: { side: 'top', antiSide: 'bottom', len: 'height' },
    };

    private checkLimits() {
        const objB = this.object.getBoundingClientRect();
        return this.overLimitsObjs?.map((limitEl) => {
            const limitB = limitEl.getBoundingClientRect();
            const intersections = Object.values(this.dirs).reduce((allSides, sides) => {
                const intersectionSide = [[sides.side, '<'], [sides.antiSide, '>']].reduce((all, [curr, compare]) => {
                    const a = objB[curr as keyof DOMRect];
                    const b = limitB[curr as keyof DOMRect];
                    const condition = [a, compare, b].join(' ');
                    // console.log(condition);
                    // eslint-disable-next-line no-eval
                    if (eval(condition)) {
                        // console.log(curr);
                        all = curr;
                    }
                    return all;
                }, null as string | null);
                if (intersectionSide) {
                    allSides.push(intersectionSide);
                }
                return allSides;
            }, [] as string[]);
            return intersections;
        });
    }
}
