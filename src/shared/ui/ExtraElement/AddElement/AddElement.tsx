import {
    forwardRef,
    HTMLProps, memo, ReactNode, useEffect, useState,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AddElement.module.scss';
import PlusSvg from '@/shared/assets/icons/plus.svg';
import MinusSvg from '@/shared/assets/icons/minus.svg';
import { HStack } from '@/shared/ui/Stack';
import { CloseElement } from '@/shared/ui/ExtraElement/CloseElement/CloseElement';

interface ExtraElementProps extends HTMLProps<HTMLDivElement>{
    className?: string
    children: ReactNode
    isOnlyVisible?: boolean
}

export const AddElement = memo(forwardRef<HTMLDivElement, ExtraElementProps>((props, ref) => {
    const {
        className,
        children,
        isOnlyVisible = false,
        ...otherProps
    } = props;
    const [isShow, setIsShow] = useState(false);

    return (
        <HStack
            ref={ref}
            className={classNames(cls.AddElement, {}, [className])}
        >
            {isOnlyVisible || isShow
                ? (
                    <CloseElement
                        className={cls.minus}
                        onClose={() => {
                            setIsShow(false);
                        }}
                        {...{ isOnlyVisible }}
                    >
                        {children}
                    </CloseElement>
                )
                : <PlusSvg className={cls.plus} onClick={() => setIsShow(true)} />}
        </HStack>
    );
}));
