import { useState } from 'react'
import './Room.css'
import io from 'socket.io-client'
import { Chat } from './Chat'
import React, { useRef } from 'react';



//conexion para escuchar y enviar los eventos
const socket = io('http://localhost:3000')
const url = 'http://localhost:3000'

export const Room = () => {

    const [username, setUsername] = useState('')
    const [room, setRoom] = useState('')
    const [showChat, setShowChat] = useState(false)

    const joinRoom = () => {
        if (username !== "" && room !== "") {
            socket.emit("join_room", room)
            setShowChat(true)
        }
    }

    return (
        <div className='contenedorRoom'>
            <div className='contRoom'>
                <div>
                    {!showChat ? (
                        <div className='Cont'>
                            <h3 className='tituloUnirme'>Unirme al chat</h3>
                            <div>
                                <input className='input' type='text' placeholder='Nombre...' onChange={e => setUsername(e.target.value)} />
                                <select className='SelectRoom' type="text" placeholder='ID Sala: ' onChange={e => setRoom(e.target.value)} >
                                    <option>Sala de idioma ...</option>
                                    <option value="Ingles">Inglés</option>
                                    <option value="Frances">Francés</option>
                                    <option value="Aleman">Alemán</option>
                                    <option value="Italiano">Italiano</option>
                                    <option value="Holanes">Holandés</option>
                                    <option value="Portuges">Portugés</option>
                                </select>
                                <button className='button' onClick={joinRoom}>Unirme</button>
                            </div>
                        </div>
                    ) : (
                        <Chat socket={socket} username={username} room={room} />
                    )}
                </div>
            </div>
        </div>
    )
}