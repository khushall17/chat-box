import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import { collection, onSnapshot } from "firebase/firestore"; // Import the specific Firestore methods

import { Avatar, IconButton } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import SidebarChat from './SidebarChat';
import db from './firebase';
import { useStateValue } from './StateProvider';
import './MediaScreen.css';
// import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';


const Sidebar = () => {
    const [rooms, setRooms] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        const roomsCollectionRef = collection(db, "rooms");

        const unsubscribe = onSnapshot(roomsCollectionRef, (snapshot) => {
            setRooms(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            )

        });
        return () => {
            unsubscribe();
        }

    }, []);


    return (
        <div className="sidebar">
            <div className='sidebar_header'>
                <Avatar src={user?.photoURL} />
                <div className="sidebar_headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            {/* <div className='sidebar_search'>
                <div className="sidebar_searchContainer">
                    <SearchIcon />
                    <input type="text" placeholder="Search or start new chat below" />
                </div>

            </div> */}

            <div className='sidebar_chats'>
                <SidebarChat addNewChat />
                {rooms.map(room => (
                    <SidebarChat key={room.id} id={room.id}
                        name={room.data.name} />
                ))}


            </div>
        </div>
    )
        
}

export default Sidebar; 