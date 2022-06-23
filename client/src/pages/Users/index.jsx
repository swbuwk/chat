import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import Loader from '../../components/Loader'
import useFetch from '../../hooks/useFetch'
import UserService from '../../services/UserService'
import styles from "./style.module.css"

const Users = () => {
    const [users, setUsers] = useState([])

    const {isAuth} = useSelector(state => state.user)

    const [isLoading, fetchUsers] = useFetch(async () => {
        const res = await UserService.getUsers()
        setUsers(res.data)
    })

    useEffect(() => {
        fetchUsers()
    }, [])

    if (isLoading) return (<Loader/>)

  return (
    isAuth 
    ?
    <div className={styles.userpage}>
        <Link to="/home" className={styles.link}>Назад</Link>
        <h1>Пользователи</h1>
        <div className={styles.userlist}>
            {users.map(user => 
                <Link to={`${user.id}`} key={user.id} className={styles.useritem}>
                    {user.name}
                </Link>
            )}    
        </div>    
    </div>
    :
    <Navigate to="/login"></Navigate>
  )
}

export default Users