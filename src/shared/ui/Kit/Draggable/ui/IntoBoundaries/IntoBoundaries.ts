import {useTranslation} from 'react-i18next';
import {memo} from 'react';

interface IntoBoundariesProps {
    className?: string
}

export const IntoBoundaries = memo((props: IntoBoundariesProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation();
    return (
        <div className={classNames(cls.IntoBoundaries, {}, [className])}>

        </div>
    );
});

