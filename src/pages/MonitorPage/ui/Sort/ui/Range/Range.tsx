import { useTranslation } from 'react-i18next';
import { memo, useCallback, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Range.module.scss';
import { HStack, VStack } from '@/shared/ui/Stack';
import Input from '@/shared/ui/Kit/Input/Input';
import { RangeInput, RangeInputProps } from '@/shared/ui/Kit/RangeInput/RangeInput';

interface RangeProps {
    className?: string
}

export const Range = memo((props: RangeProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation();
    const [tMin, tMax] = [0, 1000];

    const [minValue, setMinValue] = useState(tMin);
    const [maxValue, setMaxValue] = useState(tMax);

    const onMinChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const newMinValue = Number(event.target.value);
        setMinValue(newMinValue);
        if (newMinValue >= maxValue) {
            setMaxValue(newMinValue);
        }
    }, [maxValue]);

    const onMaxChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const newMaxValue = Number(event.target.value);
        setMaxValue(newMaxValue);
        if (newMaxValue <= minValue) {
            setMinValue(newMaxValue);
        }
    }, [minValue]);

    const onRangeInputChange = useCallback((values: RangeInputProps['values']) => {
        // console.log(values);
    }, []);

    return (
        <VStack className={classNames(cls.Range, {}, [className])}>
            <HStack justify="between" className={cls.numInputs}>
                <Input type="text" value={minValue} onChange={onMinChange} />
                <Input type="text" value={maxValue} onChange={onMaxChange} />
            </HStack>
            <RangeInput
                values={[-20, 34, 70]}
                onChange={onRangeInputChange}
            />
        </VStack>
    );
});
