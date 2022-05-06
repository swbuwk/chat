import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, Navigate, useParams } from 'react-router-dom'
import UserService from '../../services/UserService'
import styles from "./style.module.css"

const SingleUser = () => {
    const [currUser, setCurrUser] = useState({})
    const {id} = useParams()
    const user = useSelector(state => state.user)

    useEffect(() => {
        const fetchOneUser = async () => {
            const res = await UserService.getUser(id)
            setCurrUser(res.data)
        }
        fetchOneUser()
    }, [])

  return (
        (id != user.id)
        ?
        <Navigate to="/home"></Navigate>
        :
        <div className={styles.about}>
            <Link to="/home/users" className={styles.link}>Назад</Link>
            <h1>О пользователе {currUser.name}</h1>
            <h2>ID: {currUser.id}</h2>
            <h2>Email: {currUser.email}</h2>
        </div>
  )
}

export default SingleUser