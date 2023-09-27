import {
    AnyAction, combineReducers, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { MountedReducers, StateScheme, StateSchemeKeys } from './StateScheme';

export function createReducerManager(initialReducers: ReducersMapObject<StateScheme>) {
    const reducers = { ...initialReducers };
    let combineReducer = combineReducers(reducers);
    let keysToRemove: Array<StateSchemeKeys> = [];
    const mountedReducers: MountedReducers = {};

    return {
        getReducerMap: () => reducers,
        getMountedReducers: () => mountedReducers,
        reduce: (state: StateScheme, action: AnyAction) => {
            if (keysToRemove.length > 0) {
                state = { ...state };
                keysToRemove.forEach((key) => delete state[key]);
                keysToRemove = [];
            }
            return combineReducer(state, action);
        },
        add: (key: StateSchemeKeys, reducer: Reducer) => {
            if (!key || reducers[key]) {
                return;
            }
            reducers[key] = reducer;
            mountedReducers[key] = true;
            combineReducer = combineReducers(reducers);
        },
        remove: (key:StateSchemeKeys) => {
            if (!key || reducers[key]) {
                return;
            }
            delete reducers[key];
            keysToRemove.push(key);
            mountedReducers[key] = false;
            combineReducer = combineReducers(reducers);
        },
    };
}
