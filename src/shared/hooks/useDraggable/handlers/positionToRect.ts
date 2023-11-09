import { Position } from '@/shared/lib/kit/position/position';

export default (pos: Position, object: HTMLElement): DOMRect => <DOMRect>({
    left: pos.x,
    top: pos.y,
    x: pos.x,
    y: pos.y,
    width: object.offsetWidth,
    height: object.offsetHeight,
    right: pos.x + object.offsetWidth,
    bottom: pos.y + object.offsetHeight,
});
