import {
    CombinedState, configureStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { StateScheme } from '@/app/providers/StoreProvider/config/StateScheme';
import { createReducerManager } from '@/app/providers/StoreProvider/config/reducerManager';
import { rtkApi } from '@/shared/api/rtkApi';

export function createReduxStore(
    initialState?: StateScheme,
    asyncReducers?: ReducersMapObject<StateScheme>,
) {
    const rootReducers: ReducersMapObject<StateScheme> = {
        ...asyncReducers,
        [rtkApi.reducerPath]: rtkApi.reducer,
    } as ReducersMapObject<StateScheme>;

    const reducerManager = createReducerManager(rootReducers);

    const store = configureStore({
        reducer: reducerManager.reduce as Reducer<CombinedState<StateScheme>>,
        devTools: __IS_DEV__,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) => (
            getDefaultMiddleware().concat(rtkApi.middleware)
        ),
    });

    return store;
}
