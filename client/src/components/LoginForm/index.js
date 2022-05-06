import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../store/actionCreator'
import styles from "./style.module.css"

const LoginForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  return (
    <form className={styles.loginform} onSubmit={e => e.preventDefault()}>
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
      <button onClick={() => dispatch(login(email, password))}>Войти</button>
    </form>
  )
}

export default LoginForm