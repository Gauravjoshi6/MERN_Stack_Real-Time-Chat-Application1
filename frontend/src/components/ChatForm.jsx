import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Moment from "react-moment";
const { io } = require("socket.io-client");

const ChatForm = () => {
  const location = useLocation();
  const msgBoxRef = useRef()
  const [data, setData] = useState({});
  const [msg, setMsg] = useState("");
  const [allMsg, setAllmsg] = useState([]);
  const [socket, setSocket] = useState();


  useEffect(() => {
    const socket = io("http://localhost:8000");
    setSocket(socket);

    socket.on("connect", () => {
      console.log(socket.id); // x8WIv7-mJelg7on_ALbx
      socket.emit("joinRoom", location.state.room);
    });
  }, [location]);

  useEffect(() => {
    if (socket) {
      socket.on("getLatestMassage", (newMassage) => {
        setAllmsg( [...allMsg, newMassage]) 
       
      }, [allMsg]);
    
    }
  }, [socket, allMsg]);

  useEffect(() =>{
    if (msgBoxRef.current) {
      msgBoxRef.current.scrollIntoView({behavior: "smooth"})

    }
  })

  useEffect(() => {
    
      setData(location.state);
   
  }, [location]);

  const handleChange = (e) => {
    setMsg(e.target.value);
  };

  const handleEnter = (e) => e.keyCode === 13 ? onSubmit() : null;

  const onSubmit = () => {
    setMsg(" ");
    if (msg) { 
      const newMassage = { time: new Date(), msg, name: data.name };
      socket.emit("newMassage", { newMassage, room: data.room });
    }
  };

  return (
    <div className="w-full bg-slate-50  justify-center flex flex-col items-center min-h-[100vh]">
      <div className="bg-slate-300 w-[65%] text-center rounded-lg h-[600px] mb-4 py-8 px-2 flex flex-col justify-center items-center">
        <div>
          <h1 className="text-2xl font-bold text-orange-500 mb-4">
            {data?.room ? data.room : "Loading..."} Chat Room
          </h1>
        </div>

        <div className="bg-slate-50 w-full rounded-lg mb-4 p-4 text-center relative  h-[450px]  overflow-y-scroll">
          {allMsg.map((msg, index) => {
            const isCurrentUser = data?.name === msg.name;
            return (
              <div key={index} className={`flex flex-col ${isCurrentUser ? "items-end" : "justify-start"}`}>
                <div
                  className={`mt-6  ${isCurrentUser ? "mr-4  bg-blue-400 " : "ml-4 bg-slate-100"} rounded-lg shadow-black shadow-md flex flex-col p-1 md:p-4 text-start`}
                >
                  <div className="flex gap-1 justify-center items-center">
                  <strong>{msg.name}</strong>
                  <small>
                    <Moment fromNow>{msg.time}</Moment>
                  </small>
                  </div>
                  <h4 className="m-1 font-bold text-xl ">{msg.msg}</h4>
                </div>
              </div>
            );
          })}
             <div ref={msgBoxRef} ></div>
        </div>
         
        <div className="mt-7 w-full flex">
          <input
            type="text"
            placeholder="Enter Your Message"
            className="w-full outline-none border-none"
            onChange={handleChange}
            onKeyDown={handleEnter}
            value={msg}
          />
          <button className="bg-yellow-400 p-2 rounded-lg ml-2" onClick={onSubmit}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatForm;
