import {
    Dispatch, memo, SetStateAction, useEffect, useMemo,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './SimilarLetters.module.scss';

export interface SimilarLettersProps {
    className?: string
    children: string
    search: string
    setIsExactWord?: Dispatch<SetStateAction<boolean>>
}

export const SimilarLetters = memo((props: SimilarLettersProps) => {
    const {
        className,
        children,
        search,
        setIsExactWord,
    } = props;

    const textHtml = useMemo(() => {
        const clearSearch = search.trim();
        const ruleOfExactlyParts = new RegExp(clearSearch, 'gi');

        return children
            .replace(
                ruleOfExactlyParts,
                (match) => `<mark class="${cls.exactPart}">${match}</mark>`,
            );
    }, [children, search]);

    useEffect(() => {
        if (children.toLowerCase() === search.toLowerCase()) {
            setIsExactWord?.(true);
        }
    }, [children, search, setIsExactWord]);

    return (
        <div
            className={classNames(cls.SimilarLetters, {}, [className])}

            // eslint-disable-next-line react/jsx-props-no-multi-spaces
            dangerouslySetInnerHTML={
                {
                    __html: textHtml,
                }
            }
        />
    );
});
