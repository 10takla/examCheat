import { useTranslation } from 'react-i18next';
import { memo, useRef } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './DragObject.module.scss';
import { useDraggable } from '@/shared/hooks/useDraggable/useDraggable';
import { HStack } from '@/shared/ui/Stack';

export interface DragObjectProps {
    className?: string
}

export const DragObject = memo((props: DragObjectProps) => {
    const {
        className,
        ...otherProps
    } = props;
    const dragRef = useRef<HTMLDivElement | null>(null);
    const { onStartMove } = useDraggable({ dragRef });

    return (
        <HStack
            className={classNames(cls.DragObject, {}, [className])}
        >
            <div className={cls.static} />
            <div
                className={cls.active}
                style={{
                    transform: 'translate(400px, 500px)',
                }}
                onMouseDown={(e: any) => {
                    onStartMove(e);
                }}
                ref={dragRef}
            />
        </HStack>
    );
});
