// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import appReducer from './modules/app'
import adminsReducer from './modules/admin'
const store = configureStore({
    reducer: { // 整合模块
        app: appReducer,
        admins: adminsReducer,
    }
});

// redux store  store.getState  store.subscribe  store.dispatch
// 定义State和dispatch类型  从 store 本身推断出 `RootState` 和 `AppDispatch` 类型
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


export default store;