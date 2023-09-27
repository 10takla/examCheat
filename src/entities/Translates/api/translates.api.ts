import { rtkApi } from '@/shared/api/rtkApi';
import { WordType } from '@/entities/Word';
import { MyWordType } from '@/entities/Word/types/word.types';

const translatesApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getTranslates: build.query<WordType['translates'], any>({
            query: (params) => ({
                url: '/myTranslates',
                params: {},
            }),
        }),
        putTranslates: build.mutation<MyWordType, any>({
            query: (args) => ({
                url: `/myWords/${args.wordId}/`,
                method: 'PATCH',
                body: args,
            }),
        }),
    }),
});

export const useGetTranslates = translatesApi.useGetTranslatesQuery;
export const usePutTranslates = translatesApi.usePutTranslatesMutation;
