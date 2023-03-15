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
    username: string
    level: string
    password: string
}
const UserList: FC<IUserListProps> = () => {
    const [userList, setUserList] = useState<DataType[]>([{
        username: '', password: '', level: ''
    }])
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
            },
            key: '序号'
        },
        {
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: '用户身份',
            render(_: any, record: any, index: any) {
                return (
                    <span>管理员</span>
                )
            },
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
            },
            key: "操作"
        },
    ];
    return (
        <>
            <Table dataSource={userList} columns={columns} rowKey={userList[0].username}></Table>
        </>
    )

};

export default UserList;