import React, { FC, useEffect, useState } from 'react';
import { AudioOutlined } from '@ant-design/icons';
import { Button, Checkbox, Input, message, Popconfirm, Space, Table } from 'antd';
import { deleteMedicine, search } from '@/api/medicine/index'
import { config } from 'process';
import {
    EditOutlined,
    DeleteOutlined
} from '@ant-design/icons'
import usePagination from '@/hooks/usePagination';
const { Search } = Input;

interface IProps {

};
const App: FC<IProps> = () => {

    const [searchString, setSearchString] = useState<string>('')
    const [datasource, setDatasource] = useState([])

    const onSearch = (value: string) => {
        setSearchString(value)
    }

    useEffect(() => {
        search({ string: searchString }).then((res) => {
            setDatasource(res.data.data)
            console.log(datasource);
        })
    }, [searchString])
    const [height] = useState(document.body.offsetHeight)


    const deleteMedicineById = (data: { id: number }) => {
        deleteMedicine(data).then((res) => {
            if (res.data.code == 200) {
                message.success("删除成功！")
                search({ string: searchString }).then((res) => {
                    setDatasource(res.data.data)
                    console.log(datasource);
                })
            } else {
                message.error("删除失败！")

            }
        })
    }

    const config = usePagination({
        position: ['bottomLeft'],
        showSizeChanger: true,
        pageSizeOptions: [1, 2, 3, 4],
        showQuickJumper: true
    })

    const columns = [
        {
            title: '选择',
            render(_: any, record: any, index: number) {
                return (<Checkbox />)
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

    return (
        <>
            <Space
                direction="vertical"
                style={{ width: '100%', height: '' }}
            >
                <Search
                    placeholder="请输入想要搜索的内容"
                    allowClear
                    enterButton="Search"
                    size="large"
                    onSearch={onSearch}
                />

            </Space>

            <Table
                dataSource={datasource}
                columns={columns}
                rowKey={(record) => record.id}
                scroll={{ y: height - 330 }}
                pagination={config}
            ></Table>
        </>
    )

};

export default App;
