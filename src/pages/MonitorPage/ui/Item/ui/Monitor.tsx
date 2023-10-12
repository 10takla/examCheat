import { HTMLAttributes, memo, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Monitor.module.scss';
import { VStack } from '@/shared/ui/Stack';
import { MonitorType } from '../model/types/monitor.types';
import { FlexRef } from '@/shared/ui/Stack/Flex/Flex';
import getRgbGradient from '@/shared/lib/getRgbGradient/getRgbGradient';

export interface MonitorProps extends HTMLAttributes<FlexRef> {
    className?: string
    item: MonitorType
    index: number
    colorIndex: number | null
}

export const Monitor = memo((props: MonitorProps) => {
    const {
        className,
        item,
        index,
        colorIndex,
        ...otherProps
    } = props;
    const [isHide, setIsHide] = useState(true);
    const info: { [key in keyof MonitorType]?: (o: MonitorType[key]) => void } = {
        resolution: (o) => o.join('x'),
        refreshRate: (o) => `${o}Hz`,
        displaySize: (o) => `${o}"`,
        pixelDensity: (o) => `${o}ppi`,
        responseTime: (o) => {
            if (o instanceof Object) {
                return Object.entries(o).map(
                    ([key, val]) => `${key} - ${val}ms`,
                ).join(' ');
            }
            return `${o}ms`;
        },
    };

    return (
        <VStack
            {...otherProps}
            className={classNames(cls.Monitor, {}, [className])}
        >
            <VStack
                className={cls.title}
                onClick={() => {
                    setIsHide(!isHide);
                }}
                gap="8"
                align="start"
                style={(() => {
                    if (colorIndex !== null) {
                        const [r, g] = getRgbGradient(colorIndex + 1, 5);
                        return { background: `rgb(${r}, ${g}, 0)` };
                    }
                    return {};
                })()}

            >
                <span className={cls.name}>
                    {`${index + 1}. ${item.name}`}

                </span>
                {item.price && (
                    <span className={cls.price}>
                        {`${item.price}р.`}
                    </span>
                )}
            </VStack>
            {isHide && (
                <VStack>
                    {
                        Object.entries(info).map(([key, func]) => (
                            item?.[key] && <span key={key}>{func(item[key])}</span>
                        ))
                    }
                </VStack>
            )}
        </VStack>
    );
});
