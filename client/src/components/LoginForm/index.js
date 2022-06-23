import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../store/actionCreator'
import { removeError, setError } from '../../store/errorSlice'
import styles from "./style.module.css"

const LoginForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const error = useSelector(state => state.error)

  const formLogin = (email, password) => {
    dispatch(login(email, password))
    dispatch(removeError())
  }

  return (
    <form className={styles.loginform} onSubmit={e => e.preventDefault()}>
      <span>{error.type != "unauthorized" ? error.message : ""}</span>
      <input
        onChange={e => setEmail(e.target.value)}
        value={email}
        placeholder="Адрес электронной почты"
      ></input>
      <input
        onChange={e => setPassword(e.target.value)}
        value={password}
        type="password"
        placeholder="Пароль"
      ></input>
      <button onClick={() => formLogin(email, password)}>Войти</button>
    </form>
  )
}

export default LoginForm