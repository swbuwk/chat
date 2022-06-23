import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import Loader from '../../components/Loader'
import useFetch from '../../hooks/useFetch'
import ChatService from '../../services/ChatService'
import { checkAuth } from '../../store/actionCreator'
import styles from "./style.module.css"

const Rooms = () => {
  const [rooms, setRooms] = useState([])
  const [privateRooms, setPrivateRooms] = useState([])
  const [isUserInitialized, setIsUserInitialized] = useState(true)

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const [isLoading, fetchRooms] = useFetch(async () => {
    const res = await ChatService.getGlobalChatsInfo()
    const roomsFromServer = res.data.map(room => {
      room.id = room.id.replace("room", "")
      return room
    }).reverse()
    setRooms(roomsFromServer)

    if (!user.isAuth) {
      setIsUserInitialized(false)
    }
    const res2 = await ChatService.getPrivateChatsInfo(user.id)
    const privateRoomsFromServer = res2.data.map(room => {
      room.id = room.id.replace("room", "")
      return room
    }).reverse()
    setPrivateRooms(privateRoomsFromServer)
  })

  useEffect(() => {
    fetchRooms()
  }, [])
  

  if (!isUserInitialized) return (
    <Navigate to="/home"></Navigate>
  )

  if (isLoading) return (<Loader/>)

  return (
  <div className={styles.roompage}>
    <h1>Публичные комнаты</h1>
    <div className={styles.rooms}>
      {rooms.map(room => 
        <Link to={room.id} className={room.id == "3" ? styles.vip : styles.room} key={room.id}>
          <h2>{room.name}</h2>
          {room.description}
        </Link>
      )}
    </div>
    <h2>Личные сообщения</h2>
    <div className={styles.private_rooms}>
      {privateRooms.map(room => 
        <Link to={room.id} className={styles.private_room} key={room.id}>
          <h5>{room.name}</h5>
          {room.description}
        </Link>
      )}
    </div>
    <Link to="/home" className={styles.link}>Домой</Link>
  </div>

  )
}

export default Rooms