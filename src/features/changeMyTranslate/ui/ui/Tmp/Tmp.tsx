import {
    cloneElement, ForwardedRef, forwardRef, memo, ReactElement, useCallback, useState,
} from 'react';
import { InputRef } from '@/shared/ui/Kit/Input/Input';
import useError from '@/features/changeMyTranslate/hooks/useError/useError';
import { ChangeTranslateProps } from '@/features/changeMyTranslate/types/changeMyTranslate.types';

export interface TmpProps extends ChangeTranslateProps{
    className?: string
    children: ReactElement
}

const Tmp = (props: TmpProps, ref: ForwardedRef<InputRef>) => {
    const {
        translates,
        myTranslates,
        onChange,
        children,
        value,
    } = props;
    const [inputValue, setInputValue] = useState(value);
    const [checkForCorrect, error] = useError([...translates, ...myTranslates], []);

    const onInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
        // eslint-disable-next-line no-shadow
        const { value } = event.currentTarget;
        checkForCorrect(value);
        onChange?.(event);
    }, [checkForCorrect, onChange]);

    return (
        cloneElement(children, {
            onChange: onInputChange,
            ref,
        })
    );
};
export default memo(forwardRef(Tmp));
