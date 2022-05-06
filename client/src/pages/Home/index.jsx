import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { logout } from '../../store/actionCreator'
import styles from "./style.module.css"

const Home = () => {

    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

  return (
      user.isAuth
      ?
      <div className={styles.home}>
          <h1>Ваш профиль</h1>
          <div className={styles.info}>
              <h2>{user.name}</h2>
              <h3>ID: {user.id}</h3>
              <h3>Email: {user.email}</h3>
              <h3>Аккаунт: {user.isActivated ? "активирован" : "не активирован"}</h3>
          </div>
          <div className={styles.btns}>
            <Link to="/home/users" className={styles.link}>Другие пользователи</Link>
            <button onClick={() => dispatch(logout())}>Выйти</button>
          </div>
      </div>
      :
      <Navigate to="/login"></Navigate>
  )
}

export default Home