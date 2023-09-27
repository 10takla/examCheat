import {
    forwardRef, HTMLProps, memo, ReactNode, useState,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './CloseElement.module.scss';
import MinusSvg from '@/shared/assets/icons/minus.svg';
import { HStack } from '@/shared/ui/Stack';

interface ExtraElementProps {
    className?: string
    children: ReactNode
    onClose: () => void
    isTurnOn?: boolean
    isOnlyVisible?: boolean
}

export const CloseElement = memo(forwardRef<HTMLDivElement, ExtraElementProps>((props, ref) => {
    const {
        className,
        children,
        isTurnOn = true,
        onClose,
        isOnlyVisible = false,
    } = props;
    const [isActive, setIsActive] = useState(false);

    return (
        <HStack
            onMouseEnter={() => setIsActive(true)}
            onMouseLeave={() => setIsActive(false)}
            ref={ref}
            className={classNames(cls.CloseElement, {}, [className])}
        >
            {children}
            {!isOnlyVisible && (isTurnOn || isActive) && (
                <MinusSvg
                    className={cls.minus}
                    onClick={onClose}
                />
            )}
        </HStack>
    );
}));
