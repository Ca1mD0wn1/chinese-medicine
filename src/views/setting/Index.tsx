import { FC } from 'react';
import userpng from '@/assets/user.png'
import { Badge, Descriptions, Image } from 'antd';
import store2 from 'store2';
import { selectAllMedicine } from "@/api/medicine/index"
interface IIndexProps {
};
const Index: FC<IIndexProps> = () => {

    const userinfo = store2.get("user")
    return (<>
        <Image src={userpng.toString()}></Image>
        <Descriptions title="管理员信息" bordered style={{marginTop:"15px"}}>
            <Descriptions.Item label="系统名">甘肃省中医药材管理系统</Descriptions.Item>
            <Descriptions.Item label="用户名">{userinfo.username}</Descriptions.Item>
            <Descriptions.Item label="用户昵称">{userinfo.nickName}</Descriptions.Item>
            <Descriptions.Item label="区块链状态" span={3}>
                <Badge status="processing" text="运行中" />
            </Descriptions.Item>
            <Descriptions.Item label="单区块大小">25kb</Descriptions.Item>
            <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
            <Descriptions.Item label="Official Receipts">$60.00</Descriptions.Item>
            <Descriptions.Item label="配置信息">
                Data disk type: MongoDB
                <br />
                Database version: 3.4
                <br />
                Package: dds.mongo.mid
                <br />
                Storage space: 10 GB
                <br />
                Replication factor: 3
                <br />
                Region: East China 1
                <br />
            </Descriptions.Item>
        </Descriptions>
    </>)
};

export default Index;