import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import api from '../../http'
import { logout } from '../../store/actionCreator'
import { setError } from '../../store/errorSlice'
import styles from "./style.module.css"

const Home = () => {

    const user = useSelector(state => state.user)
    const error = useSelector(state => state.error)
    const dispatch = useDispatch()

    const sendActivation = async (id) => {
      try {
        await api.post(`/activate/send/${id}`)
      } catch(e) {
        dispatch(setError(e.response.data))
      }
    }

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
            <Link to="/rooms" className={styles.link}>Чаты</Link>
            {user.isActivated
            ?
            <></>
            :
            <button onClick={() => sendActivation(user.id)}>Отправить письмо активации</button>
            }
            <button onClick={() => dispatch(logout(user.email))}>Выйти</button>
          </div>
      </div>
      :
      <Navigate to="/login"></Navigate>
  )
}

export default Home