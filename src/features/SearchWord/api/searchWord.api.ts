import { InputHTMLAttributes } from 'react';
import { rtkApi } from '@/shared/api/rtkApi';
import { WordType } from '@/entities/Word';

interface GetQueryProps {
    _limit: number
    _sort?: string
    q?: InputHTMLAttributes<HTMLInputElement>['value']
    _page?: number
    _order?: 'asc' | 'desc'
}

const searchWordApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getSearchWord: build.query<WordType[], GetQueryProps>({
            query: (args) => ({
                url: '/words',
                params: args,
            }),
        }),
    }),
});

export const useGetSearchWord = searchWordApi.useGetSearchWordQuery;
