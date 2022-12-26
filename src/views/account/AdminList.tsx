import React, { FC, useEffect, useState } from 'react';

import { getAdminList } from '@/api/user/admin';
import { Button, Space, Table } from 'antd';
import {
    EditOutlined,
    DeleteOutlined
  } from '@ant-design/icons'
interface IUserListProps {


};

interface DataType {
    adminid: string
    adminname: string
    level: number
}
const UserList: FC<IUserListProps> = () => {
    const [userList, setUserList] = useState<DataType[]>([])
    const getAdminListData = () => {

        getAdminList().then((res) => {
            setUserList(res.data.data);

        })
    }
    useEffect(() => {
        getAdminListData()
    }, [])
    const columns = [
        {
            title: '序号',
            render(_: any, record: any, index: number) {
                return (<span>{index + 1}</span>)
            }
        },
        {
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: '用户等级',
            dataIndex: 'level',
            key: 'level',
        },
        {
            title: '操作',
            render(_: any, record: any, index: any) {
                return (
                    <Space>
                        <Button type='ghost' shape="circle" icon={<EditOutlined />}></Button>
                        <Button danger shape="circle" icon={<DeleteOutlined />}></Button>
                    </Space>
                )
            }
        },
    ];
    return (
        <><Table dataSource={userList} columns={columns}></Table></>
    )

};

export default UserList;