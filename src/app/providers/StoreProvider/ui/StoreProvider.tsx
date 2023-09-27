import { useTranslation } from 'react-i18next';
import { memo, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { createReduxStore } from '@/app/providers/StoreProvider/config/store';
import { StateScheme } from '@/app/providers/StoreProvider/config/StateScheme';

interface StoreProviderProps {
    children?: ReactNode
    initialState?: DeepPartial<StateScheme>
}

export function StoreProvider({ initialState, children }: StoreProviderProps) {
    const store = createReduxStore(
        initialState as StateScheme,
    );

    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
}
