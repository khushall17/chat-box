import React, { useEffect, useState } from 'react'
import "./Chat.css"
import { Avatar, IconButton } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import { useParams } from 'react-router-dom';
import db from "./firebase";
import { doc, onSnapshot, query, orderBy, collection, serverTimestamp, addDoc, Timestamp } from 'firebase/firestore';
import { useStateValue } from './StateProvider';
//import firebase from "./firebase";
import './MediaScreen.css';
//import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
//import Sidebar from './Sidebar'
import "./Sidebar.css"




const Chat = () => {
    const [seed, setSeed] = useState("");
    const [input, setInput] = useState("");
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState();
    const [messages, setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();
    //
   

    // const [SidebarOpen, setSidebarOpen] = useState(false); // State to track sidebar visibility

    useEffect(() => {
        if (roomId) {
            const roomRef = doc(db, "rooms", roomId);

            onSnapshot(roomRef, (snapshot) => setRoomName
                (snapshot.data().name));

            const messagesRef = collection(roomRef, "messages"); // Get sub-collection reference
            const q = query(messagesRef, orderBy("timestamp", "asc")); // Create a query

            // onSnapshot(roomRef.collection("messages").orderBy("timestamp","asc"),(snapshot)=>setMessages(snapshot.docs.map((doc)=>doc.data())))
            onSnapshot(q, (snapshot) => {
                setMessages(snapshot.docs.map((doc) => doc.data()));

            })
        }
    }, [roomId]);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [roomId])

    const sendMessage = (e) => {
        const roomRef = doc(db, "rooms", roomId);
        const messagesRef = collection(roomRef, "messages");


        e.preventDefault();
        //console.log("you types ", input)

        addDoc(messagesRef, {
            message: input,
            name: user.displayName,
            timestamp: serverTimestamp()
            // timestamp: new Date().toLocaleString('en-IN', {
            //     timeZone: 'Asia/Kolkata',
            //     year: 'numeric',
            //     month: '2-digit',
            //     day: '2-digit',
            //     hour: '2-digit',
            //     minute: '2-digit',
            //     second: '2-digit',
            //     hour12: false
            // })
        })
        setInput("");
    }
    
    return (
        <div className='chat'>

            <div className="chat_header">
                {/* <Avatar src={`https://api.dicebear.com/9.x/notionists/svg?seed=child${seed}.svg`} /> */}
                <Avatar src={`https://api.dicebear.com/9.x/pixel-art/svg?seed=child${seed}.svg`} />

                <div className='chat_headerInfo'>
                    <h3>{roomName}</h3>
                    <p>last seen {" "}
                        {/* {new Date(
                            messages[messages.length - 1].timestamp
                        ).toUTCString()} */}

                        {/* {new Date(
                            messages[messages.length - 1]?.timestamp?.toDate()
                        ).toUTCString()} */}

                        {

                            new Date(
                                // If it's a Firestore Timestamp, convert it to a JavaScript Date
                                messages.timestamp instanceof Timestamp
                                    ? messages.timestamp.toDate()
                                    // Else, assume it's already a Date object or string
                                    : messages.timestamp
                            ).toUTCString()

                        }

                    </p>
                </div>
                <div className='chat_headerRight'>
                    <IconButton>
                        <SearchOutlinedIcon />
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <div className="chat_body">

                {messages.map(message => (
                    <p className={`chat_message ${message.name === user.displayName && "chat_reciever"}`}>
                        <span className='chat_name'>{message.name}</span>
                        {message.message}
                        <span className="chat_timestamp">
                            {/* {new Date(message.timestamp?.toDate()).toUTCString()} */}

                            {/* {
                                new Date(
                                    message.timestamp?.toDate ? message.timestamp.toDate():message.timestamp
                                ).toUTCString()
                            } */}

                            {
                                new Date(
                                    message.timestamp instanceof Timestamp
                                        ? message.timestamp.toDate()  // If Firestore Timestamp, use toDate()
                                        : message.timestamp  // Else, use as is (Date object or string)
                                ).toUTCString()
                            }


                        </span>
                    </p>
                ))}
            </div>

            <div className="chat_footer">
                <InsertEmoticonIcon />
                <form>
                    <input value={input} onChange={e => setInput(e.target.value)} placeholder='Type a message...' type="text" />
                    <button onClick={sendMessage}
                        type="submit">Send a message</button>
                </form>
                <MicIcon />
            </div>
        </div>


    )
}

export default Chat