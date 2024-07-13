// src/store/store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authReducer from 'src/features/authSlice'
import searchReducer from 'src/features/searchSlice'
import launchpadReducer from 'src/features/launchpadSlice';
import { launchpadApi } from 'src/services/launchpad.service'

const rootReducer = combineReducers({
    auth: authReducer,
    search: searchReducer,
    launchpad: launchpadReducer,
    [launchpadApi.reducerPath]: launchpadApi.reducer,
})

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: ['auth', 'search', 'launchpad'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const loggerMiddleware = (store) => (next) => (action) => {
    console.log('Dispatching', action)
    let result = next(action)
    console.log('Next State', store.getState())
    return result
  }

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                // If you know specific paths that contain non-serializable values, you can ignore them:
                // ignoredActionPaths: ['register'],
                // ignoredPaths: ['auth.register'],
            },
        }).concat(loggerMiddleware, launchpadApi.middleware),
})

export const persistor = persistStore(store)