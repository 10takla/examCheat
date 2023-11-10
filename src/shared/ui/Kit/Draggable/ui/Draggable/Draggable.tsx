import {
    cloneElement, ForwardedRef, forwardRef, memo, MutableRefObject, ReactElement, useEffect, useRef,
} from 'react';
import { Vector } from '@/shared/lib/kit/position/vector';
import cls from './Draggable.module.scss';
import { Transition } from '@/shared/lib/kit/transition/transition';
import useMemoRef from '@/shared/hooks/useMemoRef';
import Rectangle from '@/shared/lib/kit/transition/Rectangle';

export interface DraggableProps {
    children: ReactElement
    transition: Vector
    intersectRef: MutableRefObject<HTMLDivElement | null>
}

const Draggable = (props: DraggableProps, ref: ForwardedRef<HTMLElement>) => {
    const {
        children,
        intersectRef,
        transition,
        ...otherProps
    } = props;
    const activeRef = useRef<HTMLDivElement>(null);
    const childrenRef = useRef<HTMLDivElement>(null);
    const active = useMemoRef(() => {
        if (activeRef.current) {
            return new Transition(activeRef.current);
        }
        return undefined;
    }, []);
    const child = useMemoRef(() => {
        if (childrenRef.current) {
            return new Transition(childrenRef.current);
        }
        return undefined;
    }, []);

    useEffect(() => {
        if (active && child && childrenRef.current && activeRef.current && intersectRef.current) {
            const newPosition = active.position.add(transition);
            active.setTranslate(newPosition);

            const activeRect = new Rectangle(activeRef.current);
            const intersectRect = new Rectangle(intersectRef.current);

            const intersects = activeRect.getIntersection(intersectRect);
            if (intersects.length) {
                newPosition.position[intersects[0].dirI] = intersectRect[intersects[0].flipSide];
            }
            child.setTranslate(newPosition);
        }
    }, [active, child, transition]);

    return (
        <div className={cls.Draggable}>
            <div
                className={cls.active}
                ref={activeRef}
            />
            {cloneElement(children, {
                ...otherProps,
                className: cls.children,
                ref: childrenRef,
            })}
        </div>
    );
};
export default memo(forwardRef(Draggable));
