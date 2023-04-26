import { Carousel, Image } from 'antd';
import { FC } from 'react';

interface IIndexProps {


};
const Index: FC<IIndexProps> = () => {
    const contentStyle: React.CSSProperties = {
        height: '460px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        // background: '#364d79',
    };
    let pictureUrl = [
        "https://cdn.jsdelivr.net/gh/Ca1mD0wn1/chinest-medicine-picture@v0.2/adminBanner1.jpg",
        "https://cdn.jsdelivr.net/gh/Ca1mD0wn1/chinest-medicine-picture@v0.2/adminBanner2.jpg",
        "https://cdn.jsdelivr.net/gh/Ca1mD0wn1/chinest-medicine-picture@v0.2/adminBanner3.jpg",
        "https://cdn.jsdelivr.net/gh/Ca1mD0wn1/chinest-medicine-picture@v0.2/adminBanner4.jpg",
        "https://cdn.jsdelivr.net/gh/Ca1mD0wn1/chinest-medicine-picture@v0.2/adminBanner5.jpg",
        "https://cdn.jsdelivr.net/gh/Ca1mD0wn1/chinest-medicine-picture@v0.2/adminBanner6.jpg",
    ];
    return (<>
        <Carousel autoplay>

            {pictureUrl.map(item => {
                return (<> <div>
                    <h3 style={contentStyle}><Image
                        width={934} style={{
                            // width: "2000px",
                            height: "460px"
                        }} src={item}></Image></h3>
                </div></>)
            })}
        </Carousel>
        <p>
            甘肃省是全国中药材主要产地之一，现有中药资源约2540种，其定西市素有“天然药仓”之称。中药材是甘肃省现代农业“牛、羊、菜、果、薯、药”六大特色产业中的重点产业之一。目前，甘肃省中药材种植面积达460余万亩，年产量约120万吨。
            中药材出口量小、品种单一、出口价格低、出口市场窄等因素，制约了甘肃省中药材产业发展。为支持甘肃省中药材扩大出口，带动产业可持续发展，兰州海关全面梳理甘肃省中药材主要贸易国家和地区相关法规和检验检疫要求，降低企业出口检疫风险。
            同时，持续推进“放管服”改革，落实海关总署“证照分离”改革举措，指导企业运用国际贸易“单一窗口”进行申报，快速出具检验检疫证书，有效压缩通关时长，降低企业贸易成本。
            近年来，甘肃助推中医药产业发展，鼓励企业开拓国际市场，先后在乌克兰、法国、新西兰、匈牙利等“一带一路”沿线国家成立了岐黄中医学院或中医中心，并在新西兰合作成立了中医文化交流中心，推动中医药国际化进程。
            尤其是新冠肺炎疫情以来，甘肃总结了以甘肃道地药材黄芪、党参、当归、大黄、甘草等为主药，包括预防、治疗、康复在内的“甘肃方剂”系列方——扶正避瘟方、宣肺化浊方、清肺通络方等，用于控制新冠肺炎重症、危重症发生率，降低病亡率，并多次走出国门，参与国际抗疫。
        </p>
    </>)
};

export default Index;