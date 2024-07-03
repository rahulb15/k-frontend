import { Action, ThunkAction, configureStore, combineReducers } from '@reduxjs/toolkit'
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authReducer from 'src/features/authSlice'
import { authApi } from 'src/services/authApi'

const persistConfig = {
    key: 'root',
    version: 1,
    storage
}

const rootReducers = combineReducers({
    auth: authReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducers)

export const store = configureStore({
    reducer: {
        persistedReducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        }).concat(authApi.middleware)
})
export const persistor = persistStore(store)

// These lines replace the TypeScript type definitions
export const RootState = store.getState
export const AppDispatch = store.dispatch
export const AppThunk = (asyncFunction) => (dispatch, getState) => {
    return asyncFunction(dispatch, getState)
}

import { useDispatch, useSelector } from 'react-redux'

export const useAppDispatch = () => useDispatch()
export const useAppSelector = useSelector