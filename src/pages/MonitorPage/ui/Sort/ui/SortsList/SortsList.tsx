import {
    memo, useCallback, useEffect, useMemo, useState,
} from 'react';
import VStack from '@/shared/ui/Stack/VStack/VStack';
import { Selector } from '@/shared/ui/Kit/Selector/Selector';
import TransList from '@/shared/ui/Kit/TransList/TransList';
import SortItem, { SortItemProps } from './ui/SortItem/SortItem';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './SortsList.module.scss';
import { MonitorType } from '../../../AsyncSiteList/ui/SiteList/ui/Monitor/model/types/monitor.types';
import useUpdateState from '@/shared/hooks/useUpdateState';

export interface SortsListProps {
    className?: string
    sorts?: Array<Required<SortItemProps>['sort']>
    onSort?: (sorts: Array<Required<SortItemProps>['sort']>) => void
    options: string[]
}

export const SortsList = memo((props: SortsListProps) => {
    const {
        sorts = [],
        options,
        onSort,
    } = props;

    const [postSorts, setPostSorts] = useUpdateState<Array<Required<SortItemProps>['sort']>>(sorts);
    useEffect(() => {
        if (sorts.length) {
            onSort?.(sorts);
        }
    }, [onSort, sorts]);
    const onPostSort = useCallback((s: Array<Required<SortItemProps>['sort']>) => {
        setPostSorts(s);
        onSort?.(s);
    }, [onSort, setPostSorts]);

    const [addOption, setAddOption] = useState<'' | undefined>(undefined);
    const [postOptions, setPostOptions] = useState(options);

    useEffect(() => {
        setPostOptions(options.filter((op) => postSorts.every(({ option }) => option !== op)));
    }, [options, postSorts]);

    return (
        <VStack className={classNames(cls.SortsList)}>
            <TransList
                onTrans={(newSorts) => {
                    onPostSort(newSorts);
                }}
                items={postSorts}
                direction="column"
                gap="8"
            >
                {(sort, i) => (
                    <SortItem
                        onDelete={() => {
                            onPostSort((prev) => prev.filter((_, p) => p !== i));
                        }}
                        onSort={(s) => {
                            postSorts.splice(i, 1, s);
                            onPostSort([...postSorts]);
                        }}
                        {...{ sort, options }}
                    />
                )}
            </TransList>
            <Selector
                onChange={(e) => {
                    const { value } = e.currentTarget;
                    if (value && postSorts.every(({ option }) => option !== value)) {
                        onPostSort([
                            ...postSorts,
                            { option: e.currentTarget.value, isOrder: false },
                        ]);
                        setAddOption(addOption ? undefined : '');
                    }
                }}
                value={addOption}
                options={postOptions}
            />
        </VStack>
    );
});
