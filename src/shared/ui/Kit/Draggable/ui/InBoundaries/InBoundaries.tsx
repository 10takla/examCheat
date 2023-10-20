import {
    memo, MutableRefObject, ReactElement, useCallback, useEffect, useRef, useState,
} from 'react';
import Draggable, { DraggableProps } from '../Draggable/Draggable';
import { Position } from '@/shared/lib/kit/position/position';

export interface InBoundariesProps extends DraggableProps{
    children: ReactElement
    rootRef: MutableRefObject<HTMLElement | null>
}

export const InBoundaries = memo((props: InBoundariesProps) => {
    const {
        children,
        rootRef,
        ...otherProps
    } = props;
    const childrenRef = useRef<HTMLElement>(null);
    const [startBound, setStartBound] = useState<DOMRect>();
    useEffect(() => {
        setStartBound(childrenRef.current?.getBoundingClientRect());
    }, [rootRef]);

    const [rootBound, setRootBound] = useState<DOMRect>();
    useEffect(() => {
        setRootBound(rootRef.current?.getBoundingClientRect());
    }, [rootRef]);

    const handleResize = useCallback(() => {
        setRootBound(rootRef.current?.getBoundingClientRect());
    }, [rootRef]);
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [handleResize]);

    const onCheck = useCallback<DraggableProps['onCheck']>(({ totalTranslate, currTranslate }, pop) => {
        if (!startBound || !rootBound || !rootRef.current || !childrenRef.current) {
            return pop;
        }
        const tmp: Array<keyof DOMRect>[] = [['left', 'right'], ['top', 'bottom']];
        const data = tmp.map((dirs, coorI) => {
            const val = dirs.reduce((all, dir, dirI) => {
                const r = rootBound[dir];
                const s = startBound[dir];
                const sum = s + totalTranslate.position[coorI];

                // eslint-disable-next-line no-eval
                if (eval([sum, ['<', '>'][dirI], r].join(' '))) {
                    // @ts-ignore
                    return r - s;
                }
                return all;
            }, 0 as number);
            return val;
        });
        const yt = data.map((o, i) => {
            if (o) {
                return o;
            }
            return pop.position[i];
        }) as [number, number];
        return new Position(yt);
    }, [rootBound, rootRef, startBound]);

    return (
        <Draggable
            {...otherProps}
            onCheck={onCheck}
            ref={childrenRef}
        >
            {children}
        </Draggable>
    );
});
