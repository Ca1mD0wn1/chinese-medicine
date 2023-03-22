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
    </>)
};

export default Index;