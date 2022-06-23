import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import LoginForm from '../../components/LoginForm'
import { removeError } from '../../store/errorSlice'
import styles from "./style.module.css"

const Login = () => {

    const {isAuth} = useSelector(state => state.user)
    const dispatch = useDispatch()


  return (
    isAuth
    ?
    <Navigate to="/home"></Navigate>
    :
    <div className={styles.reg}>
      <h1>Вход</h1>
      <LoginForm/>
      <Link to="/registration" className={styles.link} onClick={() => dispatch(removeError())}>Регистрация</Link>
    </div>
  )
}

export default Login