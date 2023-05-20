import { FC, useEffect, useState } from 'react';
import { selectAllMedicine, selectAllOrderByBuy, deleteMedicine, insert, updated, selectAllOrderBySale, selectAllOrderByProfit } from '@/api/medicine/index'
import { Button, DatePicker, Drawer, DrawerProps, Input, message, Popconfirm, Select, Space, Table } from 'antd';
import {
    EditOutlined,
    DeleteOutlined
} from '@ant-design/icons'
import usePagination from '@/hooks/usePagination';
import dayjs from 'dayjs';
import { useNavigate } from "react-router-dom";
import { reverse } from 'lodash';
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
    const [roule, setRoule] = useState<string>("Default")
    const [sortRoule, setSortRoule] = useState<string>("up")
    const [medicineList, setMedicineList] = useState<DataType[]>([])
    const getMedicineListData = () => {

        switch (roule) {
            case "Default":
                selectAllMedicine().then((res) => {
                    if (sortRoule === "down") {
                        setMedicineList(reverse(res.data.data))
                    }
                    setMedicineList(res.data.data)
                })
                break;
            case "Buy": selectAllOrderByBuy().then((res) => {
                if (sortRoule === "down") {
                    setMedicineList(reverse(res.data.data))
                }
                setMedicineList(res.data.data)
            })
                break;
            case "Sale": selectAllOrderBySale().then((res) => {
                if (sortRoule === "down") {
                    setMedicineList(reverse(res.data.data))
                }
                setMedicineList(res.data.data)
            })
                break;
            case "Profit": selectAllOrderByProfit().then((res) => {
                if (sortRoule === "down") {
                    setMedicineList(reverse(res.data.data))
                }
                setMedicineList(res.data.data)
            })
                break;
        }


    }
    useEffect(() => {
        getMedicineListData()

    }, [roule,sortRoule])

    const config = usePagination({
        position: ['bottomLeft'],
        showSizeChanger: true,
        pageSizeOptions: [1, 2, 3, 4],
        showQuickJumper: true
    })

    const deleteMedicineById = (data: { id: number }) => {
        deleteMedicine(data).then((res) => {
            if (res.data.code === 200) {
                message.success("删除成功！")
                getMedicineListData()
            } else {
                message.error("删除失败！")
            }
        })
    }
    const [updatedIdValue, setUpdatedIdValue] = useState<number>(0)
    const [updatednameValue, setUpdateNameValue] = useState<string>("")
    const [updatednumberValue, setUpdateNumberValue] = useState<number>(0)
    const [updatedtimeValue, setUpdateTimeValue] = useState<string>("")
    const [updatedbuyPriceValue, setUpdateBuyPriceValue] = useState<number>(0)
    const [updatedsalePriceValue, setUpdateSalePriceValue] = useState<number>(0)
    const [updatedgrowPlaceValue, setUpdateGrowPlaceValue] = useState<string>("")
    const columns = [

        {
            title: '药材编号',
            dataIndex: "id",
            key: "id"
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
                            onConfirm={() => {
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

    const [height] = useState(document.body.offsetHeight)

    const [open, setOpen] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false);
    const [placement] = useState<DrawerProps['placement']>('right');

    const [nameValue, setNameValue] = useState<string>("")
    const [numberValue, setNumberValue] = useState<Number>(0)
    const [timeValue, setTimeValue] = useState<string>("")
    const [buyPriceValue, setBuyPriceValue] = useState<number>(0)
    const [salePriceValue, setSalePriceValue] = useState<number>(0)
    const [growPlaceValue, setGrowPlaceValue] = useState<string>("兰州市")

    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const onUpdatedClose = () => {
        setUpdateOpen(false);
    };

    const navigate = useNavigate();

    return (
        <>
            <div style={{
                width: "100%",
                position: "relative",
                height: "45px"
            }}>
                <Button type={roule === "Default" ? "primary" : "default"}
                    onClick={() => {
                        setRoule("Default")
                    }}
                    style={{ marginLeft: "10px" }}
                >编号排序</Button>
                <Button type={roule === "Buy" ? "primary" : "default"}
                    onClick={() => {
                        setRoule("Buy")
                    }}
                    style={{ marginLeft: "10px" }}
                >进价排序</Button>
                <Button type={roule === "Sale" ? "primary" : "default"}
                    onClick={() => {
                        setRoule("Sale")
                    }}
                    style={{ marginLeft: "10px" }}
                >售价排序</Button>
                <Button type={roule === "Profit" ? "primary" : "default"}
                    onClick={() => {
                        setRoule("Profit")
                    }}
                    style={{ marginLeft: "10px" }}
                >利润排序</Button>

                <Button
                    danger={sortRoule === 'up'}
                    onClick={() => {
                        setSortRoule("up")

                    }}
                    style={{ marginLeft: "10px" }}
                >升序</Button>
                <Button
                    danger={sortRoule === 'down'}

                    onClick={() => {
                        setSortRoule("down")
                    }}
                    style={{ marginLeft: "10px" }}
                >降序</Button>
                <Button
                    type="primary"
                    style={{
                        position: "absolute",
                        right: "0"
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
                onRow={(record) => {
                    return {
                        onClick: (e) => {
                            if ((e.target as HTMLElement).tagName !== "TD") {
                                return null
                            };
                            navigate(`details?id=${record.id}`)
                        },
                    }
                }}
            ></Table>
            <Drawer
                title="添加药材数据"
                placement={placement}
                width={350}
                onClose={onClose}
                open={open}
                extra={
                    <Space>
                        <Button onClick={onClose}>取消</Button>
                        <Button type="primary" onClick={() => {
                            if (isNaN(numberValue as unknown as number) || isNaN(buyPriceValue) || isNaN(salePriceValue) || nameValue.length === 0 || buyPriceValue === 0 || salePriceValue === 0 || timeValue.length === 0 || numberValue < 0) {
                                message.error("输入错误，请检查！")

                            } else if (buyPriceValue > salePriceValue) {
                                message.error("进价不能比售价高！")

                            } else {
                                insert({ name: nameValue, medicine_number: numberValue, last_data: timeValue, buy_price: buyPriceValue, sale_price: salePriceValue, grow_place: growPlaceValue }).then(res => {
                                    if (res.data.code === 200) {
                                        message.success("添加成功")
                                        getMedicineListData()

                                        setOpen(false);
                                    } else {
                                        message.error("添加失败")
                                    }
                                })

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
                    }}

                    placeholder='请输入药品名'
                    allowClear={true}

                />

                <DatePicker

                    placeholder={"请选择入库时间"}
                    style={{ width: "100%", margin: "10px 0" }}
                    onChange={(data, dataString) => {
                        // console.log(data);

                        setTimeValue(dataString)
                    }}
                />
                <Input
                    onChange={(e) => {
                        if (isNaN(e.target.value as unknown as number)) {
                            message.error("请输入数字")
                        }
                        setNumberValue(e.target.value as unknown as number)

                    }}

                    placeholder='请输入数量/斤'
                    allowClear={true}


                />
                <Input
                    placeholder='请输入进价'
                    style={{ margin: "5px 0" }}
                    allowClear={true}
                    onChange={(e) => {
                        if (isNaN(e.target.value as unknown as number)) {
                            message.error("请输入数字！")
                        }
                        setBuyPriceValue(e.target.value as unknown as number)
                    }}
                />

                <Input
                    allowClear={true}

                    placeholder='请输入售价'
                    style={{ margin: "5px 0" }}
                    onChange={(e) => {
                        if (isNaN(e.target.value as unknown as number)) {
                            message.error("请输入数字！")
                        }
                        setSalePriceValue(e.target.value as unknown as number)
                    }}
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

            <Drawer
                title="修改数据"
                width={350}
                placement={"left"}
                closable={true}
                destroyOnClose={true}
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
                                // console.log(res.data);
                                message.success("修改成功")
                                getMedicineListData()
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
                    allowClear={true}

                />

                <DatePicker
                    defaultValue={dayjs(updatedtimeValue)}
                    style={{ width: "100%", margin: "10px 0" }}
                    onChange={(data, dataString) => {
                        // console.log(dataString);

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
                    defaultValue={updatednumberValue.toString()}
                    allowClear={true}
                />
                <Input
                    defaultValue={updatedbuyPriceValue.toString()}
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
                    defaultValue={updatedsalePriceValue.toString()}


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
                    defaultValue={updatedgrowPlaceValue}
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