// src/store/modules/app.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit' // PayloadAction 添加类型注解需要 js中不需要

interface IState { // js不需要
    collapsed: boolean
}
const initialState: IState = { // IState js不要
    collapsed: false
}
// 固定写法,定义模块，无法直接被使用，需要暴露相关的内容
const appSlice = createSlice({
    name: 'app', // 模块名称
    initialState, // 初始化状态
    reducers: { // 修改状态的方法

        setCollapsed(state, action: PayloadAction<boolean>) { // js不需要
            // 修改状态
            state.collapsed = action.payload
        }
    }
})

// console.log(appSlice)
// appSlice { reducer: '需要的状态', actions: '改变状态函数', caseReducers: '类似actions', getInitialState: '获取初始化状态', name: '模块名称'}

// 暴露后续组件中可以修改状态的函数
export const { setCollapsed } = appSlice.actions // appSlice.actions 实际上就是 上面模块 reducers内的函数

// 默认暴露出去 模块的reducer
export default appSlice.reducer