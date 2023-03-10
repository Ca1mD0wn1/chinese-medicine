import { FC } from 'react';
import menus from '@/router/menus';
import { Layout } from 'antd';
import { renderRoute } from '@/router/utils';
import { Routes, Route } from 'react-router-dom'
import Page404 from '@/views/error/Page404';
import Details from '@/views/medicine/detail/Index'
const { Content } = Layout;
interface IContentIndexProps {


};
const ContentIndex: FC<IContentIndexProps> = () => {

    return (
        <Content
            className="site-layout-background"
            style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
            }}
        >
            <Routes>
                {
                    renderRoute(menus)
                }
                <Route path='/medicine/list/details' element = {<Details/>}></Route>
                <Route path='/medicine/search/details' element = {<Details/>}></Route>
                <Route path="*" element={<Page404 />} />
            </Routes>
        </Content>
    )

};

export default ContentIndex;