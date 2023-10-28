import { memo, useCallback, useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Range.module.scss';
import { HStack, VStack } from '@/shared/ui/Stack';
import Input from '@/shared/ui/Kit/Input/Input';
import useUpdateState from '@/shared/hooks/useUpdateState';
import Slider from '@/shared/ui/Kit/Slider/Slider';

interface RangeProps{
    className?: string
    values: number[]
}

export const Range = memo((props: RangeProps) => {
    const {
        className,
        values,
    } = props;
    const [postValues, setPostValues] = useUpdateState(values.sort((a, b) => (a > b ? 1 : a < b ? -1 : 0)));
    const minMax = useMemo(() => [postValues[0], postValues[postValues.length - 1]], []);
    const onSliderChange = useCallback((values: any) => {
        setPostValues(values);
    }, [setPostValues]);

    return (
        <VStack className={classNames(cls.Range, {}, [className])}>
            <HStack justify="between" className={cls.numInputs}>
                {postValues.map((value, i) => (
                    <Input
                        key={String(`${i}`)}
                        onBlur={(event) => {
                            const chValue = event.target.value;
                            postValues.splice(i, 1, Number(chValue));
                            setPostValues([...postValues]);
                        }}
                        type="number"
                        min={postValues[i - 1] ?? minMax[0]}
                        max={postValues[i + 1] ?? minMax[1]}
                        value={value}
                        maxLength={2}
                    />
                ))}
            </HStack>
            <Slider
                onChange={onSliderChange}
                values={postValues}
                min={minMax[0]}
                max={minMax[1]}
            />
        </VStack>
    );
});
