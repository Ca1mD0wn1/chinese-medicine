import { IMenuProps } from './inter'
import {
  HomeOutlined,
  ProfileOutlined,
  OrderedListOutlined,
  FilterOutlined,
  TeamOutlined,
  UserOutlined,
  SettingOutlined,
  BarChartOutlined
} from '@ant-design/icons'

import Home from '@/views/home/Index'

import Medicine from '@/views/medicine/Index'
import MedicineList from '@/views/medicine/list/Index'
import MedicineSearch from '@/views/medicine/search/Index'
import Setting from '@/views/setting/Index'
import Account from '@/views/account/Index'
import AccountAdminList from '@/views/account/AdminList'
import AccountUserList from '@/views/account/UserList'
import Analyze from '@/views/analyze/Index'

const menus: IMenuProps[] = [
  {
    label: '系统首页',
    key: '/',
    icon: <HomeOutlined />,
    element: <Home></Home>
  },
  {
    label: '药材列表',
    key: '/medicine',
    icon: <ProfileOutlined />,
    element: <Medicine />,
    children: [
      {
        label: '药材列表',
        key: '/medicine/list',
        icon: <OrderedListOutlined />,
        element: <MedicineList />,

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
    label: "统计分析",
    key: '/analyze',
    icon: <BarChartOutlined />,
    element: <Analyze />
  },
  {
    label: '设置',
    key: '/setting',
    icon: <SettingOutlined />,
    element: <Setting />
  }
]


export default menus