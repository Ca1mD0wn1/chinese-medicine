import { FC } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Layout } from 'antd';
import { useAppSelector, useAppDispatch } from '@/store/hook';
import { setCollapsed } from '@/store/modules/app'
import { changeLoginState } from '@/store/modules/admin';
import store2 from 'store2'
import type { MenuProps } from 'antd';

import { Dropdown, Space } from 'antd';

const { Header } = Layout;

interface IHeaderIndexProps {


};





const HeaderIndex: FC<IHeaderIndexProps> = () => {
  const navigate = useNavigate()

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a onClick={() => {
          store2.remove('user')
          dispatch(changeLoginState(false))
        }}>
          退出登录
        </a>
      )
    }
  ];

  const username = store2.get('user')['username']
  const collapsed = useAppSelector(state => state.app.collapsed);
  const dispatch = useAppDispatch()
  return (
    <Header className="site-layout-background" style={{ padding: 0 }}>
      {
        collapsed ? <MenuUnfoldOutlined className="trigger" onClick={() => {
          dispatch(setCollapsed(!collapsed))
        }} /> : <MenuFoldOutlined className="trigger" onClick={() => {
          dispatch(setCollapsed(!collapsed))
        }} />
      }
      <div style={{ position: 'absolute', right: '16px', top: '10px' }}>
        <Dropdown menu={{ items }} trigger={['click']}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              {username}
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
    </Header>
  )

};

export default HeaderIndex;