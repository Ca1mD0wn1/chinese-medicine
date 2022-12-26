// src/router/utils.tsx
import { Menu } from 'antd';
import React from 'react';
import { IMenuProps } from './inter';
import { Navigate, Route } from 'react-router-dom'
// 定义左侧菜单栏数据
export const renderMenu = (menus: IMenuProps[]) => {
    return menus.map(item => {
        if (item.children) {
            return (
                <Menu.SubMenu title={item.label} icon={item.icon} key={item.key}>
                    {
                        renderMenu(item.children)
                    }
                </Menu.SubMenu>
            )
        } else {
            return <Menu.Item key={item.key} icon={item.icon}>{item.label}</Menu.Item>
        }
    })
}
// 定义路由组件
export const renderRoute = (menus: IMenuProps[]) => {
    return menus.map(item => {
        if (item.children) {
            if (!!item.index) {
                return (
                    <React.Fragment key={item.key}>
                        <Route index element={<Navigate to={item.key} replace={true} />} />
                        <Route path={item.key} element={item.element}>
                            {renderRoute(item.children)}
                        </Route>
                    </React.Fragment>
                )
            } else {
                return (
                    <Route key={item.key} path={item.key} element={item.element}>
                        {renderRoute(item.children)}
                    </Route>
                )
            }
        } else {
            if (!!item.index) { // 如果index存在
                return (
                    <React.Fragment key={item.key}>
                        <Route index element={<Navigate to={item.key} replace={true} />} />
                        <Route path={item.key} element={item.element}></Route>
                    </React.Fragment>
                )
            } else {
                return (
                    <Route key={item.key} path={item.key} element={item.element}></Route>
                )
            }
        }
    })
}

export const getSubMenu = (pathname: string) => {
    // 1.以 / 分割 pathname.split('/')  //  ['', 'pro', 'list', 'cart']
    const pathArray = pathname.split('/').slice(1) // ['pro', 'list', 'cart']
    // console.log(pathArray) 
    const result = pathArray.reduce((newArr, item, index) => {
        const str = newArr[index] + '/' + item
        newArr.push(str)
        return newArr
    }, [''])
    return result
}