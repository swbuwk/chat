import { useSelector } from "react-redux"
import { Link, Navigate } from "react-router-dom"
import styles from "./style.module.css"

const Start = () => {

  const {isAuth} = useSelector(state => state.user)

  return (
    isAuth
    ?
    <Navigate to="/home"></Navigate>
    :
    <div className={styles.start}>
      <div>
        <h1>Привет!</h1>
        <Link to="/registration" className={styles.link}>Начать</Link>
      </div>
    </div>
  )
}

export default Start