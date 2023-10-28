import {
    ForwardedRef, forwardRef, memo, useCallback, useEffect, useRef,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './TransList.module.scss';
import TransItem, { tmp } from '@/shared/ui/Kit/TransList/ui/TransItem/TransItem';
import List, { ListProps } from '@/shared/ui/Kit/List/List';
import { FlexRef } from '@/shared/ui/Stack/Flex/Flex';
import useUpdateState from '@/shared/hooks/useUpdateState';

export interface TransListProps<I> extends ListProps<I> {
    className? : string
    onTrans?: (newList: I[]) => void
}

const TransList = <I extends any>(props: TransListProps<I>, ref: ForwardedRef<FlexRef>) => {
    const {
        className,
        children,
        items,
        onTrans,
        ...otherProps
    } = props;
    const [postItems, setPostItems] = useUpdateState(items);
    const staticsList = useRef<Array<tmp>>([]);

    const onIntersect = useCallback((fromI: number, toI: number) => {
        const t = postItems.splice(fromI, 1)[0];
        postItems.splice(toI, 0, t);
        const y = [...postItems];
        setPostItems(y);
        onTrans?.(y);
    }, [onTrans, postItems, setPostItems]);

    return (
        <List
            {...{ ...otherProps, ref }}
            className={classNames(cls.TransList, {}, [className])}
            items={postItems}
        >
            {(item, index) => (
                <TransItem
                    direction={otherProps.direction}
                    ref={(refIt) => {
                        if (refIt) {
                            staticsList.current[index] = refIt;
                        }
                    }}
                    key={String(`${index}`)}
                    index={index}
                    onIntersect={onIntersect}
                    items={staticsList}
                >
                    {children(item, index)}
                </TransItem>
            )}
        </List>
    );
};
export default forwardRef(TransList);
