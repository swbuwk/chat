import styles from "./style.module.css"
import RegistrationForm from "../../components/RegistrationForm/index"
import { useDispatch, useSelector } from "react-redux"
import { Link, Navigate } from "react-router-dom"
import { removeError } from "../../store/errorSlice"

const Registration = () => {

  const {isAuth} = useSelector(state => state.user)
  const dispatch = useDispatch()

  return (
      isAuth
      ?
      <Navigate to="/home"></Navigate>
      :
      <div className={styles.reg}>
        <h1>Регистрация</h1>
        <RegistrationForm/>
        <Link to="/login" className={styles.link} onClick={() => dispatch(removeError())}>Вход</Link>
      </div>
  )
}

export default Registration