import {
    cloneElement,
    ForwardedRef, forwardRef,
    memo,
    MutableRefObject,
    ReactElement,
    useCallback,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
import { DraggableProps } from '../Draggable/Draggable';
import { Position } from '@/shared/lib/kit/position/position';
import { FlexRef } from '@/shared/ui/Stack/Flex/Flex';

export interface InBoundariesProps extends DraggableProps {
    children: ReactElement
    rootRef: MutableRefObject<HTMLElement | null>
}

const InBoundaries = (props: InBoundariesProps, ref: ForwardedRef<FlexRef>) => {
    const {
        children,
        rootRef,
        onCheck,
        ...otherProps
    } = props;
    const childrenRef = useRef<HTMLElement>();
    useImperativeHandle<HTMLElement | undefined, HTMLElement | undefined>(
        ref,
        () => childrenRef.current,
    );
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

    const onPostCheck = useCallback<Required<DraggableProps>['onCheck']>(({ totalTranslate, currTranslate }, pop) => {
        if (!startBound || !rootBound || !rootRef.current || !childrenRef.current) {
            return pop;
        }
        const tmp: Array<keyof DOMRect>[] = [['left', 'right'], ['top', 'bottom']];
        const data = tmp.map((dirs, coorI) => dirs.reduce((all, dir, dirI) => {
            const r = rootBound[dir] as number;
            const s = startBound[dir] as number;
            const sum = s + totalTranslate.position[coorI];
            // eslint-disable-next-line no-eval
            if (eval([sum, ['<', '>'][dirI], r].join(' '))) {
                return r - s;
            }
            return all;
        }, 0 as number));
        const yt = data.map((o, i) => {
            if (o) {
                return o;
            }
            return pop.position[i];
        }) as [number, number];
        if (onCheck) {
            return onCheck({ totalTranslate, currTranslate }, new Position(yt));
        }
        return new Position(yt);
    }, [onCheck, rootBound, rootRef, startBound]);

    return (
        cloneElement(children, {
            ...otherProps,
            onCheck: onPostCheck,
            ref: childrenRef,
        })
    );
};
export default forwardRef(InBoundaries);
