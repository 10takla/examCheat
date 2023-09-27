import {
    cloneElement,
    createContext,
    memo,
    MutableRefObject,
    ReactElement,
    useCallback,
    useContext,
    useEffect,
    useRef,
} from 'react';
import { transform } from '@babel/core';
import translate from '@/shared/ui/Word/Translate/Translate';

export interface BoundaryWindowProps {
    children: ReactElement
    padding?: number
}

interface BoundaryContextProps {
    ref?: MutableRefObject<HTMLElement | null>
}

export const BoundaryContext = createContext<BoundaryContextProps>({});
export const BoundaryWindow = memo((props: BoundaryWindowProps) => {
    const {
        children,
    } = props;
    const rootRef = useRef<HTMLElement>(null);
    return (
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        <BoundaryContext.Provider value={{ ref: rootRef }}>
            {cloneElement(children, {
                ref: rootRef,
            })}
        </BoundaryContext.Provider>
    );
});

interface BoundaryElementProps {
    children: ReactElement
    padding?: number
    deps?: any[]
}

export const BoundaryElement = (props: BoundaryElementProps) => {
    const {
        children,
        padding = 0,
        deps = [],
    } = props;

    const {
        ref: rootRef,
    } = useContext(BoundaryContext);
    const childrenRef = useRef<HTMLElement>(null);

    const getBoundary = (el: HTMLElement) => {
        const {
            left,
            top,
        } = el.getBoundingClientRect();
        const {
            offsetWidth, offsetHeight,
        } = el;
        return {
            top,
            bottom: top + offsetHeight,
            left,
            right: left + offsetWidth,
        };
    };

    const check = useCallback(() => {
        if (childrenRef.current && rootRef?.current) {
            const val1 = getBoundary(rootRef.current);
            const val2 = getBoundary(childrenRef.current);

            const allValues = Object.entries(val1).map(([key, value]) => (
                // @ts-ignore
                [key, value, val2[key]]
            )) as Array<[keyof ReturnType<typeof getBoundary>, number, number]>;

            const getDifference = (child: number, roo: number) => {
                const difference = Math.abs(Math.abs(child) - Math.abs(roo));
                return difference + padding;
            };

            // eslint-disable-next-line no-shadow
            const tmp = {
                direction: {
                    Y: ['top', 'bottom'],
                    X: ['left', 'right'],
                },
                dynamic: {
                    1: ['top', 'left'],
                    0: ['bottom', 'right'],
                },
            };
            // @ts-ignore
            const changes = allValues.reduce((all, [key, val1_, val2_], index) => {
                childrenRef.current!.style.transform = 'translate(0)';
                // @ts-ignore
                // eslint-disable-next-line array-callback-return
                const direction = Object.entries(tmp.direction).reduce(
                    (allt, [dir, arr]) =>
                        // eslint-disable-next-line implicit-arrow-linebreak
                        (arr.includes(key) ? dir : allt),
                    '',
                );
                // @ts-ignore
                const dynamic = Object.entries(tmp.dynamic).reduce((alls, [dir, arr]) => (
                    arr.includes(key) ? !!parseInt(dir, 10) : alls
                ), '');
                if (index === 1) {
                    console.log(val1_, val2_);
                }

                if ((dynamic ? !(val1_ < val2_) : (val1_ < val2_)) && childrenRef.current && direction) {
                    return {
                        ...all,
                        [direction]: `${dynamic ? '' : '-'}${getDifference(val1_, val2_)}px`,
                    };
                }
                return all;
            }, {});
            console.log(changes);
            const tss = Object.entries(changes).map(([key, value]) => `translate${key}(${value})`).join(' ');
            console.log(tss);
            childrenRef.current!.style.transform = tss;
        }
    }, [padding, rootRef]);
    useEffect(() => {
        check();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [check, ...deps]);
    return cloneElement(children, {
        ref: childrenRef,
    });
};
