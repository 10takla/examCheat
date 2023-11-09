import Rectangle from '@/shared/lib/kit/transition/Rectangle';

export default class {
    private rectangle: Rectangle;

    private interactiveRectangle: Rectangle[];

    constructor(rectangle: Rectangle, interactiveRectangle: Rectangle[]) {
        this.rectangle = rectangle;
        this.interactiveRectangle = interactiveRectangle;
    }

    get intersection() {
        Object.entries(this.rectangle).map(() => {

        });
    }
}
