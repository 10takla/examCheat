import { rtkApi } from '@/shared/api/rtkApi';

export interface StateScheme {
    dictionary: string
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>
}

export type StateSchemeKeys = keyof StateScheme
export type MountedReducers = OptionalRecord<StateSchemeKeys, boolean>
