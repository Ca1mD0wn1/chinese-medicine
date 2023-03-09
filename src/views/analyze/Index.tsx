import { FC, useEffect, useRef, useState } from 'react';
import { Col, Row, Statistic, QRCode } from 'antd';
import { selectAllMedicine } from '@/api/medicine';
import * as echarts from 'echarts';
interface IIndexProps {


};
const Index: FC<IIndexProps> = () => {
    const [medicineNumber, setMedicineNumber] = useState(0)
    const [allNumber, setAllNumber] = useState(0)
    const [areaData, setAreaData] = useState([{}])
    const grow_place: any = useRef()

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

    useEffect(() => {
        selectAllMedicine().then(res => {
            let data = res.data.data

            let areaData = [{
                value: 0,
                name: ""
            }]

            data.forEach((item: any) => {

                let flag = false;
                for (let i = 0; i < areaData.length; i++) {
                    if (item.grow_place === areaData[i].name) {
                        areaData[i].value += 1;
                        flag = true;
                        break;
                    }
                }
                if (!flag) {
                    areaData = [
                        ...areaData,
                        {
                            value: 1,
                            name: item.grow_place
                        }
                    ]
                }
            });

            setAreaData(areaData.slice(1, areaData.length))
        })
    }, [])

    //"地区种类分布图"
    useEffect(() => {


        var grow_place_Echarts = echarts.init(grow_place.current)

        grow_place_Echarts.setOption({

            title: {
                text: "甘肃各地区中药材种类数量分布图"
            },
            series: [
                {
                    type: 'pie',
                    data: areaData
                }
            ]
        });
    }, [areaData])


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
                marginTop: 100,
                width: 500,
                height: 500,
            }}>
            </div>
        </>

    )

};

export default Index;