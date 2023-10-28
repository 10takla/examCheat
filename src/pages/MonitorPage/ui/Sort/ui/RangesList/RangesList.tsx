import { useTranslation } from 'react-i18next';
import { memo, useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './RangesList.module.scss';
import { Range } from '@/pages/MonitorPage/ui/Sort/ui/RangesList/ui/Range/Range';

export interface RangesListProps {
    className?: string
    onSort: () => void
    ranges: Record<string, Record<'min' | 'max', number>>
}

export const RangesList = memo((props: RangesListProps) => {
    const {
        className,
        onSort,
        ranges,
        ...otherProps
    } = props;

    const postRanges = useMemo(() => {
        const tmp = Object.entries(ranges).splice(0, 1);
        // console.log(tmp);
        return tmp;
    }, [ranges]);

    return (
        <div className={classNames(cls.RangesList, {}, [className])}>
            {postRanges.map(([label, range]) => (
                <div key={label}>
                    {label}
                    <Range values={
                        // Object.values(range)
                        [0, 50]
                    }
                    />
                </div>
            ))}
        </div>
    );
});
