import React from 'react';
import "./Login.css";
import { Button } from '@mui/material';
 import {auth, provider} from  "./firebase";
 import { signInWithPopup } from "firebase/auth";
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';
import './MediaScreen.css';
//const auth = getAuth(); // Initialize auth object
//const provider = new GoogleAuthProvider(); // Set up Google provider


 function Login() {
   const [{},dispatch] = useStateValue();
   const signIn = ()=>{
        //auth.signInWithPopup(provider)
        signInWithPopup(auth, provider) 
        .then((result) =>{
            dispatch({
                type:actionTypes.SET_USER,
                user:result.user,
            });
        })
        .catch((error)=>alert(error.message));



     };

  return (
    <div className="login">
        <div className="login_container">
            <img 
                src="https://barnraisersllc.com/wp-content/uploads/2019/06/respage_chatbot_bubbletalk_dribbble.gif" alt=""
            />
            <div className="login_text">
                <h1>Sign in to Chatbox</h1>
            </div>
            <Button onClick={signIn}>
                Sign In with Google
            </Button>
        </div>
    </div>
  )
}

export default Login;