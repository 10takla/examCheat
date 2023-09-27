import { rtkApi } from '@/shared/api/rtkApi';
import { WordType } from '@/entities/Word';
import { MyWordType } from '@/entities/Word/types/word.types';

const changeMyWordApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        addMyWord: build.mutation<WordType, MyWordType['wordId']>({
            query: (wordId) => ({
                url: '/myWords',
                method: 'POST',
                body: JSON.stringify({
                    id: wordId,
                    wordId,
                    myTranslates: [],
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            transformResponse: (resp: MyWordType) => ({ ...resp.word, myTranslates: resp.myTranslates }),
        }),
        deleteMyWord: build.mutation<void, MyWordType['id']>({
            query: (id) => ({
                url: `/myWords/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const useAddMyWord = changeMyWordApi.useAddMyWordMutation;

export const useDeleteMyWord = changeMyWordApi.useDeleteMyWordMutation;
