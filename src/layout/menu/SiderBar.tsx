import { FC, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'

import { Layout, Menu, MenuProps } from 'antd';
import menus from '@/router/menus';
import { useAppSelector } from '@/store/hook';
import { renderMenu, getSubMenu } from '@/router/utils'
const { Sider } = Layout;
const rootSubmenuKeys: string[] = [];
menus.forEach(item => {
    item.children && rootSubmenuKeys.push(item.key)
})
interface ISiderProps {


};
const SiderBar: FC<ISiderProps> = () => {
    const collapsed = useAppSelector(state => state.app.collapsed);
    const { pathname } = useLocation()
    const [selectedKeys, setSelectedKeys] = useState([pathname])
    const [openKeys, setOpenKeys] = useState<string[]>(getSubMenu(pathname))
    const onOpenChange: MenuProps['onOpenChange'] = keys => {

        const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    }

    const navigate = useNavigate()
    const changeUrl = ({ key }: { key: string }) => {
        navigate(key, { replace: false })
        setSelectedKeys([key])
    }
    return (
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="logo" />
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                openKeys={openKeys}
                onOpenChange={onOpenChange}
                onClick={changeUrl}
                selectedKeys = { selectedKeys }
            >
                {
                    renderMenu(menus)
                }
            </Menu>
        </Sider>
    )

};

export default SiderBar;