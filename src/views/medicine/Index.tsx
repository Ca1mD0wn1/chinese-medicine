import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

interface IAppProps {


};
const App: FC<IAppProps> = () => {


    return (
        <>
            <Outlet />
        </>
    )

};

export default App;