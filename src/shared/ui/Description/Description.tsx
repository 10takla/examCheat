import {
    cloneElement,
    ForwardedRef,
    forwardRef,
    memo,
    ReactElement,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Description.module.scss';
import { VStack } from '@/shared/ui/Stack';
import { BoundaryElement, BoundaryWindow } from '@/shared/ui/BoundaryWindow/BoundaryWindow';
import { FlexRef } from '@/shared/ui/Stack/Flex/Flex';

type DescriptionRef = HTMLDivElement

interface DescriptionProps {
    className?: string
    children: ReactElement
    text: string
    isTurnOff?: boolean
    isOnlyShow?: boolean
}

const Description = (props: DescriptionProps, ref: ForwardedRef<DescriptionRef>) => {
    const {
        className,
        children,
        isOnlyShow = false,
        isTurnOff = false,
        text,
    } = props;
    const [isShow, setIsShow] = useState(false);

    const rootRef = useRef<FlexRef>(null);
    useImperativeHandle<FlexRef| null, FlexRef| null>(ref, () => rootRef.current);

    return (
        <VStack
            className={classNames(cls.Description, {}, [className])}
            ref={rootRef}
        >
            {!isTurnOff && !!text.length && (isOnlyShow || isShow) && (
                <span className={cls.text}>
                    {text}
                </span>
            )}

            {cloneElement(children, {
                onMouseEnter: () => setIsShow(true),
                onMouseLeave: () => setIsShow(false),
            })}

        </VStack>
    );
};
export default memo(
    forwardRef<DescriptionRef, DescriptionProps>(Description),
);
