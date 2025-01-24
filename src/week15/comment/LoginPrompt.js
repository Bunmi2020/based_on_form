// src/components/LoginPrompt.js
import './comment.css';
import React from 'react';
import { auth, googleProvider, facebookProvider } from './firebaseConfig';
import { signInWithPopup } from 'firebase/auth';
import facebook from '../../media/facebook_log.png';
import google from '../../media/google.png';


const LoginPrompt = ({ onClose }) => {
  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider).catch((error) => alert(error.message));
    onClose();
  };

  const signInWithFacebook = () => {
    signInWithPopup(auth, facebookProvider).catch((error) => alert(error.message));
    onClose();
  };

  return (
    <div className="login-prompt">
          <div className="login-prompt-content">
              <p onClick={onClose} className='x_bold'> X </p>
              <h3>Please Sign In</h3>
            
            <div className='login_button'>
              <button className='google_signin_button' onClick={signInWithGoogle}><img src={google} alt="Google" /> Sign in</button>
              <button className='facebook_signin_button' onClick={signInWithFacebook}><img src={facebook} alt="facebook" /> Sign in</button>
                
            </div>
          
          </div>
        
    </div>

  );
};

export default LoginPrompt;
