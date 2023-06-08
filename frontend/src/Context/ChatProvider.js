import React, { useEffect, useState } from 'react'
import { createContext,useContext } from 'react'
import { useHistory } from 'react-router-dom'
const ChatContext = createContext()


const ChatProvider = ({children}) => {
    const [user,setUser]= useState()
    const [selectedChat, setSelectedChat] = useState();
        const [chats, setChats] = useState([]);//populating our chats in this chat state
       const[notification,setNotification]= useState([])

    const history = useHistory()
  
   useEffect(() => {
     const fetchUserData = async () => {
       const userInfo = await JSON.parse(localStorage.getItem("userInfo"));
       setUser(userInfo);
       if (!userInfo) {
         history.push("/");
       }
     };
     fetchUserData();
   }, [history]);
  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
        notification,
        setNotification,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export const ChatState=()=>{
    return useContext(ChatContext)
}

export default ChatProvider
