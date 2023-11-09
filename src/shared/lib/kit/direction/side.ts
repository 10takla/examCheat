import { AllDirs } from '@/shared/lib/kit/direction/direction';

const sidesRelations: Array<AllDirs>[] = [
    ['width', 'height'],
    ['left', 'right'],
    ['top', 'bottom'],
    ['x', 'y'],
    ['row', 'column'],
    ['X', 'Y'],
];

export const flipSides = sidesRelations.reduce((all, [key, value]) => (
    { ...all, [key]: value, [value]: key }
), {} as Record<keyof DOMRect, keyof DOMRect>);

export default class {
    public side: keyof DOMRect;

    constructor(side?: AllDirs) {
        this.side = side;
    }

    get sideI() {
        return sidesRelations.reduce((all, curr) => {
            const fI = curr.findIndex((s) => s === this.side);
            if (fI !== -1) {
                all = fI;
            }
            return all;
        }, -1);
    }

    get flipSide() {
        return flipSides[this.side];
    }
}
