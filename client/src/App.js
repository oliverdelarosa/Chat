import "./App.css";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
const socket = io("http://localhost:4000/");

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", message);
    const newmessage = {
      body: message,
      from: "me",
    };
    setMessages([newmessage, ...messages]);
    setMessage("");
  };

  useEffect(() => {
    const recivirmensaje = (message) => {
      setMessages([message, ...messages]);
    };
    socket.on("message", recivirmensaje);
    return () => {
      socket.off("message", recivirmensaje);
    };
  }, [messages]);
  return (
    <div className="h-screen bg-zinc-800 text-white flex items-center justify-center">
      <form onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold my-2">Chat React</h1>
        <input
          type="text"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          className="border-2 border-zinc-500 p-2 text-black w-full"
        />

        <ul className="h-80 overflow-y-auto">
          {messages.map((message, index) => (
            <li
              key={index}
              className={`my-2 p-2 table text-sm rounded-md ${
                message.from === "me" ? "bg-sky-700 ml-auto" : "bg-black"
              }`}
            >
              <p>
                {message.from}:{message.body}
              </p>
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
}

export default App;
