import React from 'react'
import { useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import LoginForm from '../../components/LoginForm'
import styles from "./style.module.css"

const Login = () => {

    const {isAuth} = useSelector(state => state.user)

  return (
    isAuth
    ?
    <Navigate to="/home"></Navigate>
    :
    <div className={styles.reg}>
      <h1>Вход</h1>
      <LoginForm/>
      <Link to="/registration" className={styles.link}>Регистрация</Link>
    </div>
  )
}

export default Login