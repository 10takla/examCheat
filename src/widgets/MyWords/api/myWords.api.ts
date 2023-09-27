import { rtkApi } from '@/shared/api/rtkApi';
import { WordType } from '@/entities/Word';
import { MyWordType } from '@/entities/Word/types/word.types';

const myWordsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getMyWords: build.query<WordType[], {}>({
            query: (params) => ({
                url: '/myWords',
                params: {
                    _expand: 'word',
                },
            }),
            // @ts-ignore
            transformResponse: (response) => response.map((item: MyWordType) => (
                {
                    ...item.word,
                    myTranslates: item.myTranslates,
                }
            )),
        }),
    }),
});

export const useGetMyWords = myWordsApi.useGetMyWordsQuery;
