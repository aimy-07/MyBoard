import { createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { reducer } from './reducers/reducer';

// const Store = createStore(reducer);
// export default Store;

// 永続化の設定
const persistConfig = {
    key: 'root', // Storageに保存されるキー名を指定する
    storage, // 保存先としてlocalStorageがここで設定される
    // whitelist: ['todos'], // Stateは`todos`のみStorageに保存する
    // blacklist: ['visibilityFilter'] // `visibilityFilter`は保存しない
};

// 永続化設定されたReducerとして定義
const persistedReducer = persistReducer(persistConfig, reducer);

const Store = createStore(
    persistedReducer,
);

export const persistor = persistStore(Store);
export default Store;
