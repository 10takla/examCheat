import { HTMLAttributes, memo, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Monitor.module.scss';
import { HStack, VStack } from '@/shared/ui/Stack';
import { MonitorType } from '../model/types/monitor.types';
import { FlexRef } from '@/shared/ui/Stack/Flex/Flex';
import getRgbGradient from '@/shared/lib/getRgbGradient/getRgbGradient';
import Description from '@/shared/ui/Description/Description';

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
    const moreInfo = (o: any, pref: string) => {
        if (typeof o === 'object') {
            return Object.entries(o).map(
                ([key, val]) => `${key} - ${val}${pref}`,
            ).join(' ');
        }
        return `${o}${pref}`;
    };
    const info: { [key in keyof MonitorType]?: (o: MonitorType[key]) => void } = {
        resolution: (o) => o.join('x'),
        refreshRate: (o) => `${o}Hz`,
        displaySize: (o) => `${o}"`,
        pixelDensity: (o) => `${o}ppi`,
        responseTime: (o) => moreInfo(o, 'ms'),
        brightness: (o) => moreInfo(o, 'cd/m²'),
        pixelType: (o) => o,
        aspectRatio: (o) => o.join(':'),
        contrast: (o) => [o[0].toFixed(3), o[1]].join(':'),
    };
    return (
        <VStack
            {...otherProps}
            className={classNames(cls.Monitor, {}, [className])}
        >
            <div
                className={cls.title}
                onClick={() => {
                    setIsHide(!isHide);
                }}
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
                        {`${
                            ((a) => {
                                const v1 = String(a[0]).replace(/((?<=\d)(?=(?:\d{3})+$))/, ' $1');
                                return `${v1}.${a[1] ?? ''}`;
                            })(String(item.price).split('.'))
                        }р.`}
                    </span>
                )}
            </div>
            {isHide && (
                <HStack gap="8" className={cls.info}>
                    {
                        Object.entries(info).map(([key, func]) => (
                            item?.[key] && (
                                <Description key={key} text={key}>
                                    <>
                                        {func(item[key])}
                                    </>
                                </Description>
                            )
                        ))
                    }
                </HStack>
            )}
        </VStack>
    );
});
