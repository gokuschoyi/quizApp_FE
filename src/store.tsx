import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
    persistReducer, persistStore, FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import localforage from 'localforage';

import authSlice from './Components/auth/authSlice'
import quizSlice from './Components/quiz/quizSlice'


const reducer = combineReducers({
    auth: authSlice,
    quiz: quizSlice
})

type RootState = ReturnType<typeof reducer>;

const persistConfig = {
    key: 'root',
    storage: localforage,
    stateReconciler: autoMergeLevel2,
    serialize: true,
    version: 1, // Update this number anytime changes are made to any of the redux slices. This will trigger the migration function below
    migrate: (state: any, currentVersion: number) => {
        if (state && state._persist.version !== currentVersion) {
            console.log(`New state version ${currentVersion}. Clearing state`); // If the versions don't match, clear the state
            return Promise.resolve(undefined); // This clears the old state
        } else {
            console.log(`State version ${currentVersion}. No migration needed`)
            return Promise.resolve(state); // Otherwise, return the state as is
        }
    }
}

const persistedReducer = persistReducer<RootState>(persistConfig, reducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

const persistor = persistStore(store);

export { persistor }
export default store;