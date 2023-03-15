import React, { FC, useEffect, useState } from 'react';
import { AudioOutlined } from '@ant-design/icons';
import { Button, Checkbox, DatePicker, Drawer, Input, message, Popconfirm, Select, Space, Table } from 'antd';
import { deleteMedicine, search, updated } from '@/api/medicine/index'
import { config } from 'process';
import { useNavigate } from 'react-router-dom';
import {
    EditOutlined,
    DeleteOutlined
} from '@ant-design/icons'
import usePagination from '@/hooks/usePagination';
const { Search } = Input;

interface IProps {

};
const App: FC<IProps> = () => {
    const navigate = useNavigate()
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

    const [updatedIdValue, setUpdatedIdValue] = useState<number>(0)
    const [updatednameValue, setUpdateNameValue] = useState<string>("")
    const [updatednumberValue, setUpdateNumberValue] = useState<number>(0)
    const [updatedtimeValue, setUpdateTimeValue] = useState<string>("")
    const [updatedbuyPriceValue, setUpdateBuyPriceValue] = useState<number>(0)
    const [updatedsalePriceValue, setUpdateSalePriceValue] = useState<number>(0)
    const [updatedgrowPlaceValue, setUpdateGrowPlaceValue] = useState<string>("")
    const [updateOpen, setUpdateOpen] = useState(false);
    const onUpdatedClose = () => {
        setUpdateOpen(false);
    };
    const columns = [

        {
            title: '药品编号',
            render(_: any, record: any, index: number) {
                return (<span>{record.id}</span>)
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
            dataIndex: 'medicine_number',
            key: 'medicine_number',
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
                        <Button
                            type='ghost'
                            shape="circle"
                            icon={<EditOutlined />}
                            onClick={(e) => {
                                e.stopPropagation()

                                setUpdatedIdValue(record.id)
                                setUpdateOpen(true)
                                setUpdateNameValue(record.name)
                                setUpdateNumberValue(record.medicine_number)
                                setUpdateTimeValue(record.last_data)
                                setUpdateBuyPriceValue(record.buy_price)
                                setUpdateSalePriceValue(record.sale_price)
                                setUpdateGrowPlaceValue(record.grow_place)
                            }}
                        ></Button>
                        <Popconfirm
                        
                            title={"确定删除吗？"}
                            
                            onConfirm={(e) => {
                                let data = { id: record.id }
                                deleteMedicineById(data)
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
            <Drawer
                destroyOnClose={true}

                title="修改数据"
                width={350}
                placement={"left"}
                closable={true}
                onClose={onUpdatedClose}
                open={updateOpen}
                extra={<Space>
                    <Button onClick={onUpdatedClose}>取消</Button>
                    <Button type="primary" onClick={() => {
                        if (isNaN(updatednumberValue as unknown as number) || isNaN(updatedbuyPriceValue) || isNaN(updatedsalePriceValue) || updatednameValue.length === 0 || updatedbuyPriceValue === 0 || updatedsalePriceValue === 0 || updatedtimeValue.length === 0 || updatednumberValue < 0) {
                            message.error("输入错误，请检查！")

                        } else if (updatedbuyPriceValue > updatedsalePriceValue) {
                            message.error("进价不能比售价高！")

                        } else {
                            updated(
                                {
                                    id: updatedIdValue,
                                    name: updatednameValue,
                                    medicine_number: updatednumberValue,
                                    last_data: updatedtimeValue,
                                    buy_price: updatedbuyPriceValue,
                                    sale_price: updatedsalePriceValue,
                                    grow_place: updatedgrowPlaceValue
                                }
                            ).then(res => {
                                console.log(res.data);
                                message.success("修改成功")
                                search({ string: searchString }).then((res) => {
                                    setDatasource(res.data.data)
                                })
                            })
                            onUpdatedClose()
                        }
                    }}>
                        确认修改
                    </Button>
                </Space>}
            >
                <Input
                    disabled
                    value={updatednameValue}
                    onChange={(e) => {
                    }}
                    placeholder='请输入药品名'
                    allowClear={true}

                />

                <DatePicker
                    placeholder={updatedtimeValue}
                    style={{ width: "100%", margin: "10px 0" }}
                    onChange={(data, dataString) => {
                        console.log(dataString);

                        setUpdateTimeValue(dataString)
                    }}
                />
                <Input
                    onChange={(e) => {
                        if (isNaN(e.target.value as unknown as number)) {
                            message.error("请输入数字")
                        }
                        setUpdateNumberValue(e.target.value as unknown as number)
                    }}
                    placeholder={updatednumberValue.toString()}
                    allowClear={true}
                />
                <Input
                    placeholder={updatedbuyPriceValue.toString()}
                    style={{ margin: "5px 0" }}
                    allowClear={true}
                    onChange={(e) => {
                        if (isNaN(e.target.value as unknown as number)) {
                            message.error("请输入数字！")
                        }
                        setUpdateBuyPriceValue(e.target.value as unknown as number)
                    }}
                />

                <Input
                    allowClear={true}
                    placeholder={updatedsalePriceValue.toString()}


                    style={{ margin: "5px 0" }}
                    onChange={(e) => {
                        if (isNaN(e.target.value as unknown as number)) {
                            message.error("请输入数字！")
                        } else {
                            setUpdateSalePriceValue(e.target.value as unknown as number)
                        }
                    }}
                />

                <Select
                    onChange={(value) => {
                        setUpdateGrowPlaceValue(value)
                    }}
                    placeholder={updatedgrowPlaceValue}
                    style={{ width: "100%" }}
                    options={[
                        {
                            value: '兰州市',
                            label: '兰州市',
                        },
                        {
                            value: '嘉峪关市',
                            label: '嘉峪关市',
                        },
                        {
                            value: '金昌市',
                            label: '金昌市',
                        },
                        {
                            value: '白银市',
                            label: '白银市',
                        },
                        {
                            value: '天水市',
                            label: '天水市',
                        },
                        {
                            value: '武威市',
                            label: '武威市',
                        },
                        {
                            value: '张掖市',
                            label: '张掖市',
                        },
                        {
                            value: '平凉市',
                            label: '平凉市',
                        },
                        {
                            value: '酒泉市',
                            label: '酒泉市',
                        },
                        {
                            value: '定西市',
                            label: '定西市',
                        },
                        {
                            value: '陇南市',
                            label: '陇南市',
                        },
                        {
                            value: '临夏回族自治州',
                            label: '临夏回族自治州',
                        },
                        {
                            value: '甘南藏族自治州',
                            label: '甘南藏族自治州',
                        }
                    ]}
                />
            </Drawer>
            <Table
                dataSource={datasource}
                columns={columns}
                rowKey={(record) => record.id}
                scroll={{ y: height - 330 }}
                pagination={config}
                onRow={(record) => {
                    return {
                        onClick: () => { 
                            navigate(`details?id=${record.id}`)
                            
                        },
                    }
                }}
            ></Table>

        </>
    )

};

export default App;
