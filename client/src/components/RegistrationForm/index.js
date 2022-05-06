import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registration } from '../../store/actionCreator'
import styles from "./style.module.css"


const RegistrationForm = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  return (
    <form className={styles.regform} onSubmit={e => e.preventDefault()}>
      <input
        onChange={e => setName(e.target.value)}
        value={name}
        placeholder="Никнейм"
      ></input>
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
      <button onClick={() => dispatch(registration(name, email, password))}>Зарегистрироваться</button>
    </form>
  )
}

export default RegistrationForm