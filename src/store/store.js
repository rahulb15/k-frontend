/* eslint-disable */
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
    FLUSH,
    PAUSE,
    PERSIST,
    persistReducer,
    persistStore,
    PURGE,
    REGISTER,
    REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "src/features/authSlice";
import launchpadReducer from "src/features/launchpadSlice";
import searchReducer from "src/features/searchSlice";
import { launchpadApi } from "src/services/launchpad.service";
import { nftApi } from "src/services/nft.service";
import balanceReducer from "src/features/balanceSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    search: searchReducer,
    launchpad: launchpadReducer,
    balance: balanceReducer,
    [launchpadApi.reducerPath]: launchpadApi.reducer,
    [nftApi.reducerPath]: nftApi.reducer,
});

const persistConfig = {
    key: "root",
    version: 1,
    storage,
    whitelist: ["auth", "search", "launchpad", "balance"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const loggerMiddleware = () => (next) => (action) => {
    const result = next(action);
    return result;
};

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }).concat(loggerMiddleware, launchpadApi.middleware, nftApi.middleware),
});

export const persistor = persistStore(store);
