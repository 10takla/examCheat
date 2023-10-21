import {
    cloneElement,
    ForwardedRef,
    forwardRef,
    MutableRefObject,
    ReactElement,
    useCallback, useEffect,
    useImperativeHandle,
    useRef, useState,
} from 'react';
import { DraggableProps } from '@/shared/ui/Kit/Draggable/ui/Draggable/Draggable';
import { FlexRef } from '@/shared/ui/Stack/Flex/Flex';
import useUpdateState from '@/shared/hooks/useUpdateState';

export interface IntoBoundariesProps extends DraggableProps{
    children: ReactElement,
    rootRef: MutableRefObject<HTMLElement | null>,
    nears: Array<HTMLElement | null>
    onInto?: () => {}
}

const IntoBoundaries = (props: IntoBoundariesProps, ref: ForwardedRef<FlexRef>) => {
    const {
        children,
        onCheck,
        nears,
        onInto,
        ...otherProps
    } = props;
    const childrenRef = useRef<HTMLElement>();
    useImperativeHandle<HTMLElement | undefined, HTMLElement | undefined>(
        ref,
        () => childrenRef.current,
    );
    const [postNears] = useUpdateState(nears);

    const postOnCheck = useCallback<Required<DraggableProps>['onCheck']>(({ totalTranslate }, pop) => {
        if (!postNears.length) {
            return pop;
        }
        const findIndex = [postNears[0]].findIndex((near) => {
            if (near || childrenRef.current) {
                const nearB = near!.getBoundingClientRect();
                const childrenB = childrenRef.current!.getBoundingClientRect();
                const tmp: Array<keyof DOMRect>[] = [['left', 'right'], ['top', 'bottom']];
                const data = tmp.map((dirs, coorI) => dirs.reduce((all, dir, dirI) => {
                    const ch = childrenB[dir] as number;
                    const sum = ch + totalTranslate.position[coorI];
                    const nes = dirs.map((dir1) => nearB[dir1])
                        .map((n, io) => (
                            [n, ['<', '>'][io], ch].join(' ')
                        )).join(' && ');
                    // eslint-disable-next-line no-eval
                    if (eval(nes)) {
                        onInto?.();
                    }
                    return all;
                }, 0 as number));
            }
        });
        return pop;
    }, [postNears, onInto]);

    return (
        cloneElement(children, {
            ...otherProps,
            onCheck: postOnCheck,
            ref: childrenRef,
        })
    );
};
export default forwardRef(IntoBoundaries);
