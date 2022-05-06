import styles from "./style.module.css"
import RegistrationForm from "../../components/RegistrationForm/index"
import { useSelector } from "react-redux"
import { Link, Navigate } from "react-router-dom"

const Registration = () => {

  const {isAuth} = useSelector(state => state.user)

  return (
      isAuth
      ?
      <Navigate to="/home"></Navigate>
      :
      <div className={styles.reg}>
        <h1>Регистрация</h1>
        <RegistrationForm/>
        <Link to="/login" className={styles.link}>Вход</Link>
      </div>
  )
}

export default Registration