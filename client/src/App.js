import { useEffect, useState } from 'react';
import './App.css';
import Registration from "./pages/Registration/index"
import Start from "./pages/Start/index"
import Home from "./pages/Home/index"
import Login from "./pages/Login/index"
import Users from "./pages/Users/index"
import SingleUser from "./pages/SingleUser/index"
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from './store/actionCreator';

function App() {

    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(checkAuth())
    }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="start" element={<Start/>}/>
        <Route path="registration" element={<Registration/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="home">
          <Route index element={<Home/>}/>
          <Route path='users' >
            <Route index element={<Users/>}/>
            <Route path=":id" element={<SingleUser/>}/>
          </Route>
        </Route>
        <Route path="*" element={user.isAuth ? <Navigate to="/home"/> : <Navigate to="/start"/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
