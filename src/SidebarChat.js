import React, { useEffect, useState } from 'react'
import "./SidebarChat.css"
import { Avatar } from '@mui/material';
import db from './firebase';
import { collection, addDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { doc, onSnapshot, query, orderBy } from 'firebase/firestore';
import './MediaScreen.css';

const SidebarChat = ({ id, name, addNewChat }) => {
    const [seed, setSeed] = useState("");
    const [messages, setMessages] = useState("")
    useEffect(() => {
        if (id) {
            const roomRef = doc(db, "rooms", id);
            const messagesRef = collection(roomRef, "messages"); // Get sub-collection reference
            const q = query(messagesRef, orderBy("timestamp", "desc")); // Create a query
            onSnapshot(q, (snapshot) => {
                setMessages(snapshot.docs.map((doc) => doc.data()));
            })
        }
    }, [id]);



    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [])

    const createChat = () => {
        const roomName = prompt("Please Enter Name for Chat Room.");
        if (roomName) {
            // Reference the "rooms" collection
            const roomsCollectionRef = collection(db, "rooms");

            // Add a new document with the room name
            addDoc(roomsCollectionRef, {
                name: roomName,
            })

        }

    };

    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className='sidebarChat'>
                {/* <Avatar src={`https://api.dicebear.com/9.x/notionists/svg?seed=child${seed}.svg`}/> */}
                {/* <Avatar src="https://api.dicebear.com/9.x/lorelei/svg"/> */}
                <Avatar src={`https://api.dicebear.com/9.x/pixel-art/svg?seed=child${seed}.svg`} />
                <div className="sidebarChat_info">
                    <h2>{name}</h2>
                    <p>{messages[0]?.message}</p>
                </div>
               
            </div>
            
        </Link>

    ) : (
        <div onClick={createChat}
            className="sidebarChat">
            <h2>Add New Chat</h2>
        </div>
    )
}

export default SidebarChat