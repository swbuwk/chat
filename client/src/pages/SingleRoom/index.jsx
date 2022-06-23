import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useParams } from 'react-router-dom'
import styles from "./style.module.css"

import useRoom, { socket } from '../../hooks/useRoom'
import ChatService from '../../services/ChatService';
import useFetch from '../../hooks/useFetch'
import Loader from '../../components/Loader'

import api, { API_URL } from '../../http'
import UserService from '../../services/UserService'


const SingleRoom = () => {
    const [message, setMessage] = useState("")
    const [messageHistory, setMessageHistory] = useState([])
    const [members, setMembers] = useState([])
    const [modalMembersVisible, setModalMembersVisible] = useState(false)
    const [isUserInitialized, setIsUserInitialized] = useState(true)

    const {id} = useParams()

    const [trueRoomId, setTrueRoomId] = useState(id)

    const user = useSelector(state => state.user)

    const {joinRoom, joinPrivateRoom, leaveRoom, sendMessage} = useRoom(setMembers, setMessage, setMessageHistory, setTrueRoomId)

    const [isLoading, fetchRoomInfo] = useFetch(async () => {
        const messages = await ChatService.getMessagesFromChat(id)
        const members = await ChatService.getMembersFromChat(id)

        setMessageHistory(messages.data.reverse())
        setMembers(members.data)

        if (!user.isAuth) {
            setIsUserInitialized(false)
        }

        if (members.data.some(member => member.id == user.id)) {
            socket.emit("join_room", `room${id}`)
        }

        socket.on("receive_message", (data) => {
            setMessageHistory(prev => [data, ...prev])
        })
    })


    function handleKeydown(e) {
        if (e.key === "Enter") {
            sendMessage(user, message, id, "message")
        }
    }

    useEffect(() => {
        fetchRoomInfo();

        return () =>{
            socket.emit("leave_room", `room${id}`)
        }            

    }, [])

    if (!isUserInitialized) return (
        <Navigate to="/rooms"></Navigate>
    )

    if (trueRoomId !== id) return (
        <Navigate to={`/rooms/${trueRoomId}`}></Navigate>
    )

    if (isLoading) return (<Loader/>)

    if (id === "3" && !user.isActivated) return (
        <>
            <div className={styles.locked}>
                <div>Данная комната доступна только для пользователей с активированным аккаунтом.</div><br></br>
                <Link to="/rooms" className={styles.back}>Назад</Link>
            </div>

        </>
    ) 

  return (
      <>
        <div className={styles.room} onLoad={() => {console.log(user)}}>
            <Link to="/rooms" className={styles.close}>Назад</Link>
            <h1>Room {id}</h1>
            {
                members.some(member => member.id == user.id) && !isLoading
                ?
                <div className={styles.room_options}>
                    <button onClick={() => setModalMembersVisible(true)}>Участники</button>
                    <button onClick={() => leaveRoom(id, user)}>Выйти из комнаты</button>
                </div>
                :
                <></>
            }
            {
                members.some(member => member.id == user.id)
                ?
                <>
                    <div className={id === "3" ? styles.history_vip : styles.history}>
                        {messageHistory.map(mess =>
                        mess.type == "message"
                        ?
                        <div 
                            className={styles.message} 
                            key={Math.random()}
                            style={{alignSelf: (mess.id === user.id ? "flex-end": "flex-start"),
                                    textAlign: (mess.id === user.id ? "end": "start")}}>
                            <Link
                                to={`/home/users/${mess.id}`}
                                className={styles.username}
                                >{mess.name}</Link><br></br>
                            {mess.message}
                        </div>
                        :
                        <div className={styles.action_message} key={Math.random()}>
                            <Link to={`/home/users/${mess.id}`} className={styles.username}>{mess.message}</Link><br></br>
                        </div>
                        )}
                    </div>
                    <div className={styles.send}>
                        <input
                            placeholder="Введите сообщение"
                            onChange={e => setMessage(e.target.value)}
                            value={message}
                            onKeyDown={e => handleKeydown(e)}>
                        </input>
                        <button onClick={() => sendMessage(user, message, id, "message")}>Отправить</button>
                    </div> 
                </>
                :
                <div className={styles.history}>
                    <button onClick={() => joinRoom(id, user)}>Войти</button>
                </div>
            }
        </div>
        {
            modalMembersVisible 
            ?
            <div className={styles.modal_bg} onClick={() => setModalMembersVisible(false)}>
                <div className={styles.modal_members}>
                    {members.map(member =>
                        <div key={member.id} className={styles.modal_item}>
                            <Link to={`/home/users/${member.id}`} className={styles.modal_link}>
                                {member.name}
                            </Link>
                            {(user.id != member.id && id.indexOf("-") == -1)
                            ?
                            <Link to={`/rooms/${trueRoomId}`} onClick={() => joinPrivateRoom(user.id, member.id)} className={styles.modal_link}>ЛС</Link>
                            :
                            <></>}
                        </div>
                    )}
                </div>
            </div>
            :
            <></>
        }
      </>
  )
}

export default SingleRoom