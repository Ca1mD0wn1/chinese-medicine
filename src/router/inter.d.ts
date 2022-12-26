import { ReactNode } from 'react'

// key属性可以使用 左侧菜单的路由地址，因为它具有唯一性
export interface IMenuProps {
  label: string
  key: string
  icon?: ReactNode
  children?: IMenuProps[]
  element: ReactNode,
  index?: 1 | 0
}