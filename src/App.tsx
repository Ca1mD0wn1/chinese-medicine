import { FC } from "react";

import Index from './layout/Index'

import Login from '@/views/login/Index'

import { Routes, Route, Navigate } from 'react-router-dom'
import { useAppSelector } from './store/hook';
type IAppProps = {}

const App: FC<IAppProps> = () => {
  const loginState = useAppSelector(state => state.admins.loginState)
  // reactrouterv6版本中需要加* 
  return (
    <Routes>
      <Route path="/login" element={loginState ? <Navigate to="/" /> : <Login />} />
      <Route path="/*" element={loginState ? <Index /> : <Navigate to="/login" />} />
    </Routes>
  )
};
export default App