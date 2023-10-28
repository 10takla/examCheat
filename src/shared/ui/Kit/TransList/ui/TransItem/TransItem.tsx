import {
    cloneElement,
    createContext,
    ForwardedRef,
    forwardRef,
    MutableRefObject,
    ReactElement,
    useCallback,
    useEffect, useImperativeHandle,
    useRef,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './TransItem.module.scss';
import useCursorMove, { MoveMeasures } from '@/shared/hooks/useCursorMove';
import { FlexProps } from '@/shared/ui/Stack/Flex/Flex';

interface TransContextProps {
    onTransStart?: (e: MouseEvent) => void
}

export const TransContext = createContext<TransContextProps>({});

export type tmp = Record<'static' | 'dynamic' | 'children', HTMLDivElement>

export interface TransItemProps {
    direction: FlexProps['direction']
    className?: string
    children: ReactElement
    onIntersect: (fromI: number, toI: number) => void
    items: MutableRefObject<Array<tmp>>
    index: number
}

const TransItem = (props: TransItemProps, ref: ForwardedRef<HTMLDivElement>) => {
    const {
        className,
        direction,
        children,
        onIntersect,
        items,
        index,
        ...otherProps
    } = props;
    const toI = useRef<number>();
    const staticRef = useRef<tmp>({});
    useImperativeHandle<tmp, tmp>(ref, () => staticRef.current);

    const onEnd = useCallback(() => {
        if (toI.current !== undefined) {
            onIntersect(index, toI.current);
        }
        items.current.forEach((item) => {
            item.dynamic.style.transform = 'none';
            item.children.style.transform = 'none';
        });
    }, [index, items, onIntersect, toI]);

    const setTranslate = useCallback((e: HTMLElement, value: any) => {
        e.style.transform = `translate${direction === 'column' ? 'Y' : 'X'}(${value}px)`;
    }, [direction]);

    const dirs: { left: 'left' | 'top', right: 'right' | 'bottom' } = {
        left: direction === 'row' ? 'left' : 'top',
        right: direction === 'row' ? 'right' : 'bottom',
    };
    const animationTransposition = useCallback(() => {
        if (toI.current !== undefined) {
            let staticTo = items.current[toI.current].static.getBoundingClientRect();
            let staticB = staticRef.current.static.getBoundingClientRect();
            let sub = staticTo[dirs.left] - staticB[dirs.left];
            setTranslate(staticRef.current.children, sub);
            items.current.forEach((item, i) => {
                if (i !== index) {
                    staticB = items.current[i].static.getBoundingClientRect();
                    sub = 0;
                    if (i >= toI.current! && i < index) {
                        staticTo = items.current[i + 1].static.getBoundingClientRect();
                        sub = staticTo[dirs.left] - staticB[dirs.left];
                    } else if (i > index && i <= toI.current!) {
                        staticTo = items.current[i - 1].static.getBoundingClientRect();
                        sub = staticTo[dirs.left] - staticB[dirs.left];
                    }
                    setTranslate(item.children, sub);
                }
            });
        } else {
            items.current.map((item) => item.children.style.transform = 'none');
        }
    }, [dirs.left, index, items, setTranslate]);

    const onMove = useCallback(({ total }: MoveMeasures) => {
        if (staticRef.current) {
            setTranslate(staticRef.current.dynamic, total.position[direction === 'column' ? 1 : 0]);
            const dynamicB = staticRef.current.dynamic.getBoundingClientRect();
            const findToI = items.current.findIndex((itemRef, i) => {
                if (i !== index) {
                    const staticB = itemRef.static.getBoundingClientRect();
                    const prevStaticB = items.current[i - 1]?.static.getBoundingClientRect();
                    const postStaticB = items.current[i + 1]?.static.getBoundingClientRect();
                    const [leftB, rightB] = i < index
                        ? [
                            (prevStaticB?.[dirs.right] ?? staticB[dirs.left]),
                            staticB[dirs.right],
                        ]
                        : [
                            staticB[dirs.left],
                            (postStaticB?.[dirs.left] ?? staticB[dirs.right]),
                        ];
                    if (
                        (
                            dynamicB[i < index ? dirs.left : dirs.right] >= leftB
                            && dynamicB[i < index ? dirs.left : dirs.right] <= rightB
                        )
                    ) {
                        return true;
                    }
                }
                return false;
            });
            toI.current = findToI !== -1 ? findToI : undefined;
            animationTransposition();
        }
    }, [setTranslate, direction, items, animationTransposition, index, dirs.right, dirs.left]);

    const { onStartMove } = useCursorMove({ onMove, onEnd }, []);

    // Установка размеров драг-блоков
    useEffect(() => {
        const childB = staticRef.current.children.children[0].getBoundingClientRect();
        Object.values(staticRef.current).forEach((el) => {
            el.style.width = `${childB.width}px`;
            el.style.height = `${childB.height}px`;
        });
    }, []);

    return (
        <div className={classNames(cls.TransItem, {}, [className])}>
            <div
                className={cls.static}
                id="static"
                ref={(refS) => {
                    if (refS) {
                        staticRef.current.static = refS;
                    }
                }}
            />
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
            <div
                className={cls.dynamic}
                id="dynamic"
                ref={(refS) => {
                    if (refS) {
                        staticRef.current.dynamic = refS;
                    }
                }}
            />
            <div
                className={cls.children}
                id="children"
                ref={(refS) => {
                    if (refS) {
                        staticRef.current.children = refS;
                    }
                }}
            >
                <TransContext.Provider value={{ onTransStart: onStartMove }}>
                    {children}
                </TransContext.Provider>
            </div>
        </div>
    );
};

export default forwardRef(TransItem);
