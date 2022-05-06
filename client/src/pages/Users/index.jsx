import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import UserService from '../../services/UserService'
import styles from "./style.module.css"

const Users = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await UserService.getUsers()
            setUsers(res.data)
        }
        fetchUsers()
    }, [])

  return (
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
  )
}

export default Users