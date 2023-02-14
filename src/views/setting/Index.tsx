import React, { createRef, FC, useEffect, useRef, useState } from 'react';
import { Button, Col, Row, Statistic } from 'antd';
import { selectAllMedicine } from '@/api/medicine';
import { getAdminList, getUserList } from '@/api/user/admin';
import * as echarts from 'echarts';
interface IIndexProps {


};
const Index: FC<IIndexProps> = () => {
    const [medicineNumber, setMedicineNumber] = useState(0)
    const [allNumber, setAllNumber] = useState(0)

    useEffect(() => {
        selectAllMedicine().then((res) => {
            let a = 0;
            setMedicineNumber(res.data.data.length)
            res.data.data.forEach((item: any) => {
                a = a + item.medicine_number
            })
            setAllNumber(a)

        })

    }, [])

    const grow_place: any = useRef()
    useEffect(() => {
        var grow_place_Echarts = echarts.init(grow_place.current)
        grow_place_Echarts.setOption({
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            xAxis: {
                data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
            },
            yAxis: {},
            series: [
                {
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }
            ]
        });
    }, [grow_place])


    return (
        <>
            <Row gutter={12}>
                <Col span={12}>
                    <Statistic title="中药种类总数量" value={medicineNumber} />
                </Col>


                <Col span={99}>
                    <Statistic title="中药总数量/斤" value={allNumber} />
                </Col>
                {/* <Col span={12}>
            <Statistic title="Active Users" value={112893} loading />
        </Col> */}
            </Row>

            <div ref={grow_place} style={{
                width: 600,
                height: 400,
            }}>
            </div>

        </>

    )

};

export default Index;