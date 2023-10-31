import {
    memo, useCallback, useEffect, useMemo, useState,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Range.module.scss';
import { Slider } from '@/test/Slider/Slider';
import { HStack, VStack } from '@/shared/ui/Stack';
import Input from '@/shared/ui/Kit/Input/Input';

export interface RangeProps {
    className?: string
}

export const Range = memo((props: RangeProps) => {
    const {
        className,
        ...otherProps
    } = props;
    const [values, setValues] = useState([0, 50, 70, 100]);
    const minMax = useMemo(() => [values[0], values[values.length - 1]], []);
    return (
        <VStack className={classNames(cls.Range, {}, [className])}>
            <HStack justify="between">
                {values.map((v, i) => (
                    <Input
                        key={String(`${i}`)}
                        type="number"
                        value={v}
                        onBlur={(event) => {
                            const chValue = event.target.value;
                            values.splice(i, 1, Number(chValue));
                            setValues([...values]);
                        }}
                        min={values[i - 1] ?? minMax[0]}
                        max={values[i + 1] ?? minMax[1]}
                    />
                ))}
            </HStack>
            <Slider
                step={1}
                values={values}
                onChange={(vals) => {
                    setValues(vals);
                }}
                min={minMax[0]}
                max={minMax[1]}
            />
        </VStack>
    );
});
