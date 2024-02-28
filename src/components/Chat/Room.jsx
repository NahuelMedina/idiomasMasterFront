import { useState } from "react";
import "./Room.css";
import io from "socket.io-client";
import { Chat } from "./Chat";
import React, { useRef } from "react";
import { IoMdChatbubbles } from "react-icons/io";
import { CgUserlane } from "react-icons/cg";
import { TbWorldStar } from "react-icons/tb";

//conexion para escuchar y enviar los eventos
const socket = io("http://localhost:3000");
const url = "http://localhost:3000";

export const Room = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="w-full h-[90vh] mt-[80px] flex flex-col bg-white">
      {!showChat ? (
        <div className="w-full h-full">
       <div className="w-full h-20vmin flex items-center justify-center bg-repeat" style={{backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url('/img/bg-title.png')"}}>
            <h3 className="text-[60px] font-bold text-gray-700">Comunidad de Idiomas</h3>
          </div>
          <div className="w-full h-[80%] grid grid-cols-2">
            <div className="w-full h-[95%] flex items-center justify-center  bg-white">
              <img
                src="/img/chat_img.png"
                alt="chat_img"
                className="w-[90%] h-[90%] m-0 rounded-[10px] shadow-lg shadow-black/50"
              ></img>
            </div>

            <div className="w-full h-[90%] bg-white flex items-center justify-center">
              <div className="bg-gradient-to-r from-pink-700 to-purple-600 w-[80%] h-[80%] rounded-[20px] flex flex-col items-center shadow-lg shadow-black/50 animate-fade-left animate-ease-in-out">
                <div className="w-full h-[30%] flex items-center justify-center">
                  <IoMdChatbubbles className="text-white text-[50px] font-bold mr-[20px]" />
                  <h1 className="text-white text-[40px] font-bold">
                    Unete a la Sala
                  </h1>
                </div>
                <div className="w-full h-[40%] grid grid-rows-2">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="h-[60px] w-[80%] rounded-[10px] bg-purple-500 flex flex-row overflow-hidden">
                      <div className="w-[20%] h-full bg-white flex items-center justify-center">
                        <CgUserlane className="text-[40px] text-purple-700" />
                      </div>

                      <input
                       className="text-black w-[80%] h-full pl-[20px] text-[20px]"
                        type="text"
                        placeholder="Nombre de Usuario"
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="w-full h-full flex items-center justify-center">
                  <div className="h-[60px] w-[80%] rounded-[10px] bg-purple-500 flex flex-row overflow-hidden">
                      <div className="w-[20%] h-full bg-white flex items-center justify-center">
                        <TbWorldStar className="text-[40px] text-purple-700" />
                      </div>

                      <select
                  className="text-black w-[80%] h-full pl-[20px] text-[20px]"
                  type="text"
                  placeholder="ID Sala: "
                  onChange={(e) => setRoom(e.target.value)}
                >
                  <option>Seleccione Aula de Idioma</option>
                  <option value="Ingles">Inglés</option>
                  <option value="Frances">Francés</option>
                  <option value="Aleman">Alemán</option>
                  <option value="Italiano">Italiano</option>
                  <option value="Holanes">Holandés</option>
                  <option value="Portuges">Portugés</option>
                </select>
                    </div>
                
                    </div>
                </div>
                <div className="w-full h-[30%] flex items-center justify-center">
                <button className=" bg-white w-[150px] h-[50px] rounded-[5px] text-[20px] hover:bg-yellow-300" onClick={joinRoom}>
                  Unirme!
                </button>
                </div>
              
               
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
};
