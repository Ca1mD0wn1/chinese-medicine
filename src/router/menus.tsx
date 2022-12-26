import { IMenuProps } from './inter'
import {
  HomeOutlined,
  ProfileOutlined,
  OrderedListOutlined,
  FilterOutlined,
  TeamOutlined,
  UserOutlined,
  SettingOutlined
} from '@ant-design/icons'

import Home from '@/views/Index'

import Medicine from '@/views/medicine/Index'
import MedicineList from '@/views/medicine/list/Index'
import MedicineSearch from '@/views/medicine/search/Index'
import MedicineListBuy from '@/views/medicine/list/Buy'
import MedicineListProfit from '@/views/medicine/list/Profit'
import MedicineListSale from '@/views/medicine/list/Sale'
import Setting from '@/views/setting/Index'
import Account from '@/views/account/Index'
import AccountAdminList from '@/views/account/AdminList'
import AccountUserList from '@/views/account/UserList'

const menus: IMenuProps[] = [
  {
    label: '系统首页',
    key: '/',
    icon: <HomeOutlined />,
    element: <Home></Home>
  },
  {
    label: '药材管理',
    key: '/medicine',
    icon: <ProfileOutlined />,
    element: <Medicine />,
    children: [
      {
        label: '药材列表',
        key: '/medicine/list',
        icon: <OrderedListOutlined />,
        element: <MedicineList />,
        children: [
          {
            label: '进价排序',
            key: '/medicine/list/buy',
            icon: <OrderedListOutlined />,
            element: <MedicineListBuy />,
            index: 1
          },
          {
            label: '售价排序',
            key: '/medicine/list/sale',
            icon: <OrderedListOutlined />,
            element: <MedicineListSale />
          },
          {
            label: '利润排序',
            key: '/medicine/list/profit',
            icon: <OrderedListOutlined />,
            element: <MedicineListProfit />
          },
        ]
      },
      {
        label: '查询药材',
        key: '/medicine/search',
        icon: <FilterOutlined />,
        element: <MedicineSearch />
      },
    ]
  },
  {
    label: '账户管理',
    key: '/account',
    icon: <TeamOutlined />,
    element: <Account />,
    children: [
      {
        label: '用户列表',
        key: '/account/userlist',
        icon: <UserOutlined />,
        element: <AccountUserList />,
        index: 1,
      },
      {
        label: '管理员列表',
        key: '/account/adminlist',
        icon: <UserOutlined />,
        element: <AccountAdminList />
      }
    ]
  },
  {
    label: '设置',
    key: '/setting',
    icon: <SettingOutlined />,
    element: <Setting />
  }
]


export default menus