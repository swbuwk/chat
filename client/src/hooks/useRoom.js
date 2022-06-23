import { useEffect, useState } from "react"

import api, {SERVER_URL} from "../http/index"
import io from "socket.io-client"
import ChatService from "../services/ChatService"
const socket = io.connect(SERVER_URL)
export {socket}


function useRoom(setMembers, setMessage, setMessageHistory, setTrueRoomId) {

    const joinRoom = async (room, user) => {
        socket.emit("join_room", `room${room}`)
        const membersAfterPost = await api.post(`/chat/room${room}/members`, {user_id: user.id}).then(res => res.data)
        setMembers(membersAfterPost)

        sendMessage(user, `Пользователь ${user.name} присоединился`, room, "action")
    }

    const leaveRoom = async (room, user) => {
        socket.emit("leave_room", `room${room}`)
        await api.delete(`/chat/room${room}/members?user=${user.id}`)
        setMembers([])

        sendMessage(user, `Пользователь ${user.name} вышел`, room, "action")
    }
      
    const sendMessage = (user, message, roomId, type) => {
        if (message.replace(/\s+/g, '').length === 0) return
        socket.emit("send_message", {id: user.id, name: user.name, message, room: `room${roomId}`, type})
        
        setMessage("")
    }

    const joinPrivateRoom = async (id1, id2) => {
        const roomId1 = `${id1}-${id2}`
        const roomId2 = `${id2}-${id1}`


        const privateCandidate1 = await ChatService.checkPrivateChat(roomId1)
        const privateCandidate2 = await ChatService.checkPrivateChat(roomId2)

        let roomId

        if (privateCandidate1.data.length === 1) {
            roomId = roomId1
            setTrueRoomId(roomId)
        } else if (privateCandidate2.data.length === 1) {
            roomId = roomId2
            setTrueRoomId(roomId)
        } else {
            await ChatService.createPrivateChat(roomId1)
            await api.post(`/chat/room${roomId1}/members`, {user_id: id1})
            await api.post(`/chat/room${roomId1}/members`, {user_id: id2})
        }
        const privateMessages = await ChatService.getMessagesFromChat(roomId)
        setMessageHistory(privateMessages.data.reverse())

    }

    return {joinRoom, joinPrivateRoom, leaveRoom, sendMessage}
}

export default useRoom