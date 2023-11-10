import { Vector } from '@/shared/lib/kit/position/vector';

export default (pos: Vector, object: HTMLElement): DOMRect => <DOMRect>({
    left: pos.x,
    top: pos.y,
    x: pos.x,
    y: pos.y,
    width: object.offsetWidth,
    height: object.offsetHeight,
    right: pos.x + object.offsetWidth,
    bottom: pos.y + object.offsetHeight,
});
