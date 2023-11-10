import {
    cloneElement, ForwardedRef, forwardRef, memo, ReactElement, useEffect, useMemo, useRef, useState,
} from 'react';
import { Vector } from '@/shared/lib/kit/position/vector';
import cls from './Draggable.module.scss';
import { Transition } from '@/shared/lib/kit/transition/transition';
import useMemoRef from '@/shared/hooks/useMemoRef';

export interface DraggableProps {
    children: ReactElement
    transition: Vector
}

const Draggable = (props: DraggableProps, ref: ForwardedRef<HTMLElement>) => {
    const {
        children,
        transition,
        ...otherProps
    } = props;
    const activeRef = useRef<HTMLDivElement>(null);
    const active = useMemoRef(() => {
        if (activeRef.current) {
            return new Transition(activeRef.current);
        }
        return undefined;
    }, []);
    const [child, setChild] = useState<Transition>();

    useEffect(() => {
        if (active && child) {
            const newPosition = active.position.add(transition);
            active.setTranslate(newPosition);
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
                ref: (r) => {
                    if (r) {
                        setChild(new Transition(r));
                    }
                },
            })}
        </div>
    );
};
export default memo(forwardRef(Draggable));
