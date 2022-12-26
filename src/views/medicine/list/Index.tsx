import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

interface IIndexProps {


};
const Index: FC<IIndexProps> = () => {


    return (
        <>
            <Outlet />
        </>
    )

};

export default Index;