import React, { FC, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Checkbox, message, Popconfirm } from 'antd';
import { deleteMedicine, selectAllOrderBySale } from '@/api/medicine/index'
import { Button, Space, Table } from 'antd';
import {
    EditOutlined,
    DeleteOutlined
} from '@ant-design/icons'
import usePagination from '@/hooks/usePagination';
interface IIndexProps {

};

interface DataType {
    id: number;
    name: string;
    number: number;
    last_data: string;
    buy_price: string,
    sale_price: string
}


const Index: FC<IIndexProps> = () => {



    const [medicineList, setMedicineList] = useState<DataType[]>([])

    const [checkGroup, setcheckGroup] = useState([])

    const getMedicineListData = () => {
        selectAllOrderBySale().then((res) => {
            setMedicineList(res.data.data)
        })
    }
    useEffect(() => {
        getMedicineListData()

    }, [])

    const config = usePagination({
        position: ['bottomLeft'],
        showSizeChanger: true,
        pageSizeOptions: [1, 2, 3, 4, 10],
        showQuickJumper: true
    })
    const deleteMedicineById = (data: { id: number }) => {
        deleteMedicine(data).then((res) => {
            if (res.data.code == 200) {
                message.success("删除成功！")
                getMedicineListData()

            } else {
                message.error("删除失败！")

            }
        })
    }

    const groupDelete = () => { }

    const setGroup = (id: number) => {
        let group = checkGroup;

    }

    const columns = [
        {
            title: '选择',
            render(_: any, record: any, index: number) {
                return (<Checkbox onClick={() => {
                    setGroup(record.id)
                }} />)
            }
        },
        {
            title: '序号',
            render(_: any, record: any, index: number) {
                return (<span>{(config.current - 1) * config.pageSize + index + 1}</span>)
            }
        },
        {
            title: '药材名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '进价/斤',
            dataIndex: 'buy_price',
            key: 'buy_price',
        },
        {
            title: '售价/斤',
            dataIndex: 'sale_price',
            key: 'sale_price',
        },

        {
            title: '剩余数量/斤',
            dataIndex: 'number',
            key: 'number',
        },
        {
            title: '最后进货时间',
            dataIndex: 'last_data',
            key: 'last_data',
        },
        {
            title: '主要发源地',
            dataIndex: 'grow_place',
            key: 'grow_place',
        },
        {
            title: '操作',
            render(_: any, record: any, index: any) {
                return (
                    <Space>
                        <Button type='ghost' shape="circle" icon={<EditOutlined />}></Button>
                        <Popconfirm
                            title={"确定删除吗？"}
                            onConfirm={() => {
                                let data = { id: record.id }
                                deleteMedicineById(data)
                            }}
                        >
                            <Button danger shape="circle"
                                icon={<DeleteOutlined />}>
                            </Button>
                        </Popconfirm>
                    </Space>
                )
            }
        },
    ];
    const [height] = useState(document.body.offsetHeight)


    return (
        <>
            <div style={{
                width: "100%",
            }}>
                <Button type="primary"
                    onClick={() => {
                        groupDelete()
                    }}
                >批量删除</Button>
                <Button type="primary" style={{
                    position: "absolute", right: "50px"

                }}>添加数据</Button></div>

            <Table
                dataSource={medicineList}
                columns={columns}
                rowKey={(record) => record.id}
                scroll={{ y: height - 330 }}
                pagination={config}
            ></Table>
        </>

    )

};

export default Index;