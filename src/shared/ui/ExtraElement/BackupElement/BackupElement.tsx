import {
    forwardRef, HTMLAttributes, HTMLProps, memo, ReactNode, useState,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './BackupElement.module.scss';
import BackupSvg from '@/shared/assets/icons/backup.svg';
import { HStack } from '@/shared/ui/Stack';
import { FlexRef } from '@/shared/ui/Stack/Flex/Flex';

interface BackupElementProps extends HTMLAttributes<FlexRef>{
    className?: string
    children: ReactNode
    isOnlyVisible?: boolean
    onClose: () => void
    isTurnOn?: boolean
}

export const BackupElement = memo(forwardRef<HTMLDivElement, BackupElementProps>((props, ref) => {
    const {
        className,
        children,
        isTurnOn = true,
        onClose,
        ...otherProps
    } = props;

    return (
        <HStack
            {...otherProps}
            ref={ref}
            className={classNames(cls.BackupElement, {}, [className])}
        >
            {children}
            {isTurnOn && (
                <BackupSvg
                    className={cls.backup}
                    onClick={() => {
                        onClose();
                    }}
                />
            )}
        </HStack>
    );
}));
