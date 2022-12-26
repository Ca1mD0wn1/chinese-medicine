import React, { FC, useEffect, useState } from 'react';

import { selectAllOrderByBuy, deleteMedicine } from '@/api/medicine/index'
import { Button, Checkbox, DatePicker, Drawer, DrawerProps, Input, message, Popconfirm, Select, Space, Table } from 'antd';
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
    const getMedicineListData = () => {
        selectAllOrderByBuy().then((res) => {
            setMedicineList(res.data.data)
        })
    }
    useEffect(() => {
        getMedicineListData()

    }, [])

    const config = usePagination({
        position: ['bottomLeft'],
        showSizeChanger: true,
        pageSizeOptions: [1, 2, 3, 4],
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
    const [height] = useState(document.body.offsetHeight)

    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState<DrawerProps['placement']>('right');

    const [nameValue, setNameValue] = useState<string>("")
    const [timeValue, setTimeValue] = useState<string>("")
    const [buyPriceValue, setBuyPriceValue] = useState<number>(0)
    const [salePriceValue, setSalePriceValue] = useState<number>(0)
    const [growPlaceValue, setGrowPlaceValue] = useState<string>("")

    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };


    return (
        <>
            <div style={{
                width: "100%",
            }}>
                <Button type="primary"
                    onClick={() => {
                    }}
                >批量删除</Button>
                <Button
                    type="primary"
                    style={{
                        position: "absolute", right: "50px"

                    }}
                    onClick={() => {
                        showDrawer()
                    }}
                >添加数据</Button>
            </div>
            <Table
                dataSource={medicineList}
                columns={columns}
                rowKey={(record) => record.id}
                scroll={{ y: height - 330 }}
                pagination={config}
            ></Table>

            <Drawer
                title="添加药材数据"
                placement={placement}
                width={500}
                onClose={onClose}
                open={open}
                extra={
                    <Space>
                        <Button onClick={onClose}>取消</Button>
                        <Button type="primary" onClick={() => {


                            if (1) {
                                setOpen(false);

                            }
                        }}>
                            确认添加
                        </Button>
                    </Space>
                }

            >
                <Input
                    onChange={(e) => { 
                        setNameValue(e.target.value)
                    console.log(nameValue);
                                            
                    }}
                    
                    placeholder='请输入药品名'
                    allowClear={true}

                />

                <DatePicker

                    placeholder={"请选择入库时间"}
                    style={{ width: "100%", margin: "10px 0" }}
                    onChange={(data, dataString) => {
                        setTimeValue(dataString)
                        console.log(dataString);


                    }}
                />
                <Input
                    onChange={(e) => { 
                        setNameValue(e.target.value)
                    console.log(nameValue);
                                            
                    }}
                    
                    placeholder='请输入数量/斤'
                    allowClear={true}

                />
                <Input
                    placeholder='请输入进价'
                    style={{ margin: "5px 0" }}
                    allowClear={true}
                    onChange={(value) => {
                        console.log(value);

                    }}
                />

                <Input
                    allowClear={true}

                    placeholder='请输入售价'
                    style={{ margin: "5px 0" }}
                />

                <Select
                    onChange={(value) => {
                        setGrowPlaceValue(value)
                    }}
                    defaultValue="兰州市"
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
        </>

    )

};

export default Index;