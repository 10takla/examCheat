import {
    ForwardedRef, forwardRef, HTMLAttributes, memo, Suspense, useEffect, useMemo, useRef,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './SearchWord.module.scss';
import { useGetSearchWord } from '@/features/SearchWord/api/searchWord.api';
import { VStack } from '@/shared/ui/Stack';
import useScroll from '@/shared/hooks/useScroll';
import { WordLowView, WordLowViewProps } from '@/shared/ui/WordView/WordLowView/WordLowView';
import FetchErrorBoundary from '@/shared/ui/ErrorHandlers/FetchErrorBoundary/FetchErrorBoundary';
import { WordType } from '@/entities/Word';
import { FlexRef } from '@/shared/ui/Stack/Flex/Flex';
import { BoundaryElement } from '@/shared/ui/BoundaryWindow/BoundaryWindow';

export interface SearchWordProps extends Pick<WordLowViewProps, 'search'>, HTMLAttributes<HTMLDivElement>{
    className?: string,
    onSelectWord: (word: WordType['id']) => void,
}

const SearchWord = (props: SearchWordProps, ref: ForwardedRef<FlexRef>) => {
    const {
        className,
        search,
        onSelectWord,
        ...otherProps
    } = props;
    const { page, onScroll } = useScroll();

    const postSearch = useMemo(() => search.replace(/^\s+|\s+$/g, ''), [search]);

    const { data: words, isLoading, error } = useGetSearchWord({
        _limit: 20 * page, q: postSearch,
    });

    return (
        <BoundaryElement padding={10} deps={[words]}>
            <VStack
                {...otherProps}
                className={classNames(cls.SearchWord, {}, [className])}
                onScroll={onScroll}
                ref={ref}
            >
                <FetchErrorBoundary
                    className={classNames(cls.SearchWord, {}, [className])}
                    {...{ isLoading, error }}
                >
                    {/* eslint-disable-next-line react/jsx-no-useless-fragment */}
                    <>
                        {words?.length ? (
                            words.map((word) => (
                                <WordLowView
                                    onClick={() => onSelectWord(word.id)}
                                    className={cls.word}
                                    key={word.wordOnEng}
                                    search={postSearch}
                                    {...{ word }}
                                />
                            ))
                        ) : <div>Ничего нету</div>}
                    </>
                </FetchErrorBoundary>
            </VStack>
        </BoundaryElement>
    );
};
export default forwardRef(SearchWord);
