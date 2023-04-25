import React, { FC, useEffect, useState } from 'react';

import { deleteUser, getUserList, register, updateUser } from '@/api/user/admin';
import { Button, Drawer, Input, Popconfirm, Select, Space, Table, message } from 'antd';
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
    const getUserListData = () => {

        getUserList().then((res) => {
            setUserList(res.data.data);

        })
    }
    useEffect(() => {
        getUserListData()
    }, [])
    const [open, setOpen] = useState(false);
    const [updateopen, setUpdateOpen] = useState(false);
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [level, setLevel] = useState("1")
    const [nickname, setNickname] = useState("")
    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
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
            title: '昵称',
            dataIndex: 'nickname',
            key: 'nickname',
        },
        {
            title: '用户身份',
            render(_: any, record: any, index: any) {

                return (
                    <span>
                        {record.level == 1 ? "消费者" : "生产者"}
                    </span>
                )
            },
            key: 'level',
        },
        {
            title: '   操作',
            render(_: any, record: any, index: any) {
                return (
                    <Space>
                        <Button type='ghost'
                            shape="circle"
                            icon={<EditOutlined />}
                            onClick={() => {
                                setUsername(record.username)
                                setPassword(record.password)
                                setNickname(record.nickname)
                                setLevel(record.level)
                                setUpdateOpen(true)

                            }}
                        ></Button>
                        <Popconfirm
                            title={"确定删除吗？"}
                            onConfirm={() => {
                                deleteUser({ username: record.username })
                                getUserListData()
                            }}
                        >
                            <Button
                                danger
                                onClick={(e) => {
                                    e.stopPropagation()
                                }}
                                shape="circle"
                                icon={<DeleteOutlined />}>
                            </Button>
                        </Popconfirm>
                    </Space>
                )
            }
        },
    ];
    return (
        <><div>
            <Button
                type="primary"
                style={{
                    position: "relative",
                    right: "0",
                    marginBottom: "5px"
                }}
                onClick={() => {
                    showDrawer()
                }}
            >添加用户数据</Button>
            <Table dataSource={userList} columns={columns}></Table></div>

            <Drawer title="添加用户信息" placement="right" onClose={onClose} open={open}>
                <Input placeholder="请输入用户名" style={{ marginBottom: "10px" }}
                    onChange={(e) => {
                        setUsername(e.target.value)

                    }} />
                <Input placeholder="请输入密码" style={{ marginBottom: "10px" }}
                    onChange={(e) => {
                        setPassword(e.target.value)

                    }} />
                <Input placeholder="请输入昵称" style={{ marginBottom: "10px" }}
                    onChange={(e) => {
                        setNickname(e.target.value)


                    }} />
                <p>请选择用户权限等级</p>
                <Select
                    onChange={(value) => {
                        setLevel(value)
                    }}
                    defaultValue="消费者"
                    style={{ width: "100%" }}
                    options={[
                        // { value: 3, label: '管理员' },
                        { value: 2, label: '生产者' },
                        { value: 1, label: '消费者' },
                    ]}
                />
                <Button
                    type="primary"
                    style={{ marginTop: "10px" }}
                    onClick={() => {
                        if (username === "" || password === "" || nickname === "") {
                            message.error("输入有误！")
                            return 0
                        }
                        register({ username, password, nickname, level }).then((res) => {
                            if (res.data.code === 200) {
                                message.success("添加成功")
                                setOpen(false)
                                getUserListData()
                            } else {
                                message.error("添加失败")
                            }

                        })
                    }}>确认添加</Button>
            </Drawer>
            <Drawer title="修改用户信息" placement="left" onClose={() => {
                setUpdateOpen(false)
            }} open={updateopen}>

                <Input defaultValue={username} style={{ marginBottom: "10px" }}
                    disabled
                    onChange={(e) => {
                        setUsername(e.target.value)

                    }} />
                <Input defaultValue={password} style={{ marginBottom: "10px" }}
                    onChange={(e) => {
                        setPassword(e.target.value)

                    }} />
                <Input defaultValue={nickname} style={{ marginBottom: "10px" }}
                    onChange={(e) => {
                        setNickname(e.target.value)
                    }} />
                <p>请选择用户权限等级</p>
                <Select
                    onChange={(value) => {
                        setLevel(value)
                    }}
                    defaultValue={level === "1" ? "消费者" : "生产者"}
                    style={{ width: "100%" }}
                    options={[
                        { value: "2", label: '生产者' },
                        { value: "1", label: '消费者' },
                    ]}
                />
                <Button
                    type="primary"
                    style={{ marginTop: "10px" }}
                    onClick={() => {
                        if (username === "" || password === "" || nickname === "") {
                            message.error("输入有误！")
                            return 0
                        }
                        updateUser({ username, password, nickname, level }).then((res) => {
                            if (res.data.code === 200) {
                                message.success("修改成功")
                                setOpen(false)
                                getUserListData()
                            } else {
                                message.error("修改失败")
                            }

                        })
                    }}>确认修改</Button>
            </Drawer>
        </>
    )

};

export default UserList;