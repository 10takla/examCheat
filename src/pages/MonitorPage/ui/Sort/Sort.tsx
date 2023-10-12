import { memo, useEffect, useState } from 'react';
import { HStack } from '@/shared/ui/Stack';
import { classNames } from '@/shared/lib/classNames/classNames';
import { MonitorProps } from '../../../../../scripts/parser/monitor/types/types';

export interface SortProps {
    className?: string
    options: string[]
    onSort: (option: string, order: boolean) => void
}

const Sort = (props: SortProps) => {
    const {
        className,
        options,
        onSort,
    } = props;
    const [isOrder, setIsOrder] = useState(false);
    const [option, setOption] = useState<string | null>(null);

    useEffect(() => {
        if (option) {
            onSort(option, isOrder);
        }
    }, [isOrder, onSort, option]);

    return (
        <HStack className={classNames('', {}, [className])}>
            {options.length && (
                <select onChange={(e) => setOption(e.currentTarget.value as keyof MonitorProps)}>
                    <option value={undefined}>{null}</option>
                    {
                        options.map((t) => (
                            <option key={t} value={t}>{t}</option>
                        ))
                    }
                </select>
            )}
            <button
                type="button"
                onClick={() => {
                    setIsOrder(!isOrder);
                }}
            >
                {isOrder ? '▲' : '▼'}
            </button>
        </HStack>
    );
};
export default memo(Sort);
