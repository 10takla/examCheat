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
import Draggable, { DraggableProps } from '@/shared/ui/Kit/Draggable/ui/Draggable/Draggable';
import { FlexRef } from '@/shared/ui/Stack/Flex/Flex';
import useUpdateState from '@/shared/hooks/useUpdateState';

export interface IntoBoundariesProps extends DraggableProps{
    children: ReactElement,
    rootRef: MutableRefObject<HTMLElement | null>,
    nears: Array<HTMLElement>
    onInto?: () => {}
    onDragOver?: (findIndex: number) => void
    onDragLeave?: () => void
    isDrag: boolean
}

const IntoBoundaries = (props: IntoBoundariesProps, ref: ForwardedRef<FlexRef>) => {
    const {
        children,
        onCheck,
        nears,
        isDrag,
        onInto,
        onDragLeave,
        onDragOver,
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
            return;
        }
        const findIndex = postNears.findIndex((near, nearI) => {
            if (near || childrenRef.current) {
                console.log(near?.getBoundingClientRect())
                const nearB = near!.getBoundingClientRect();
                const childrenB = childrenRef.current!.getBoundingClientRect();
                const tmp: Array<keyof DOMRect>[] = [['left', 'right'], ['top', 'bottom']];
                return tmp.some((dirs, coorI) => {
                    const y = dirs.some((dir, dirI) => {
                        const ch = childrenB[dir] as number;
                        const nes = dirs.map((dir1) => nearB[dir1])
                            .map((n, io) => (
                                [n, ['<', '>'][io], ch].join(' ')
                            )).join(' && ');
                        // eslint-disable-next-line no-eval
                        return eval(nes);
                    });
                    return y;
                });
            }
        });
        if (findIndex !== -1) {
            onDragOver?.(findIndex);
        } else {
            onDragLeave?.()
        }
    }, [onDragLeave, onDragOver, postNears]);

    return (
        cloneElement(children, {
            ...otherProps,
            onCheck: postOnCheck,
            ref: childrenRef,
        })
    );
};
export default forwardRef(IntoBoundaries);
