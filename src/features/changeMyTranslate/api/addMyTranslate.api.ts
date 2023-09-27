import { rtkApi } from '@/shared/api/rtkApi';
import { MyWordType } from '@/entities/Word/types/word.types';

const myTranslateApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        putMyTranslate: build.mutation<MyWordType, any>({
            query: (args) => ({
                url: `/myWords/${args.wordId}/`,
                method: 'PATCH',
                body: args,
            }),
        }),
    }),
});

export const usePutMyTranslate = myTranslateApi.usePutMyTranslateMutation;
