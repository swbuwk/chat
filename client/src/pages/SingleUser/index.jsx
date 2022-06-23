import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, Navigate, useParams } from 'react-router-dom'
import Loader from '../../components/Loader'
import useFetch from '../../hooks/useFetch'
import UserService from '../../services/UserService'
import styles from "./style.module.css"

const SingleUser = () => {
    const [currUser, setCurrUser] = useState({})
    const {id} = useParams()
    const user = useSelector(state => state.user)

    const {isAuth} = useSelector(state => state.user)

    const [isLoading, fetchOneUser] = useFetch(async () => {
        const res = await UserService.getUser(id)
        setCurrUser(res.data)
    })

    useEffect(() => {
        fetchOneUser()
    }, [])

    if (isLoading) return (<Loader/>)

  return (
    isAuth
    ?
        (id == user.id)
        ?
        <Navigate to="/home"></Navigate>
        :
        <div className={styles.about}>
            <Link to="/home/users" className={styles.link}>К списку пользователей</Link>
            <h1>О пользователе {currUser.name}</h1>
            <h2>ID: {currUser.id}</h2>
            <h2>{currUser.isonline ? "Онлайн" : "Оффлайн"}</h2>
            <h3>{currUser.is_activated ? "Аккаунт активирован" : "Аккаунт не активирован"}</h3>
        </div>
    :
    <Navigate to="/login"></Navigate>
  )
}

export default SingleUser