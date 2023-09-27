import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Designations.module.scss';
import { designations } from '@/pages/LessonsPage/const/const';

export interface DesignationsProps {
    className?: string
}

export const Designations = memo((props: DesignationsProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation();

    type DesignationsType = { [key in string]: DesignationsType | string[] }
    type ReBuild = [keyof DesignationsType, DesignationsType[keyof DesignationsType] | string[]]

    return (
        <div className={classNames(cls.Designations, {}, [className])}>
            {Object.entries(designations).map(([variable, val]) => (
                <>
                    <div>
                        {[
                            variable,
                            Object.values(val).flat().join(', '),
                        ].join(' - ')}
                    </div>
                    {Object.entries(val).map(([prefix, variables]) => (
                        <div>
                            {[
                                `${variable}(${prefix})`,
                                variables.join(', '),
                            ].join(' - ')}
                        </div>
                    ))}
                </>
            ))}
        </div>
    );
});
