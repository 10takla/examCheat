import { memo, useRef } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './DragObject.module.scss';
import { useDraggable } from '@/shared/hooks/useDraggable/useDraggable';
import { HStack } from '@/shared/ui/Stack';
import { Direction } from '@/shared/lib/kit/direction/direction';
import Draggable from '@/shared/ui/Kit/Draggable/ui/Draggable/Draggable';
import useCursorMove from '@/shared/hooks/useCursorMove';

export interface DragObjectProps {
    className?: string
}

export const DragObject = memo((props: DragObjectProps) => {
    const {
        className,
        ...otherProps
    } = props;
    const hStackRef = useRef<HTMLDivElement | null>(null);
    const dragRef = useRef<HTMLDivElement | null>(null);
    const divRef = useRef<HTMLDivElement[]>([]);

    // const { onStartMove } = useDraggable({
    //     dragRef,
    //     intoRef: hStackRef,
    //     inRef: divRef,
    // });

    const { onStartMove, currOffset } = useCursorMove({ step: 20 });

    return (
        <HStack
            className={classNames(cls.DragObject, {}, [className])}
            ref={hStackRef}
        >
            <div
                className={cls.static}
                ref={(r) => {
                    if (r) {
                        divRef.current[0] = r;
                    }
                }}
            />
            <Draggable transition={currOffset}>
                <div
                    onMouseDown={(e: any) => {
                        onStartMove(e);
                    }}
                />
            </Draggable>
        </HStack>
    );
});
