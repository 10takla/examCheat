import { Direction } from '@/shared/lib/kit/direction/direction';
import intoBoundaries from '@/shared/hooks/useDraggable/handlers/intoBoundaries';

type DirNames = 'x' | 'y'

type Dirs = Record<DirNames, Array<keyof DOMRect>>

const dirs: Dirs = {
    x: ['left', 'right'],
    y: ['top', 'bottom'],
};
export interface MainProps {
    object: DOMRect
    boundaries: DOMRect[]
    postProc: () => void,
}

export default (
    props: MainProps,
) => {
    const { boundaries, postProc, ...otherProps } = props;

    return tmp[0];
};
