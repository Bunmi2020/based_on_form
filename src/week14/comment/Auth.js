// src/components/Auth.js
import React, { useState, useEffect } from 'react';
import './comment.css';
import { auth, googleProvider, facebookProvider } from './firebaseConfig';
import { signInWithPopup, fetchSignInMethodsForEmail, linkWithCredential, EmailAuthProvider } from 'firebase/auth';
import facebook from '../../media/facebook_log.png';
import google from '../../media/google.png';
const Auth = ({ user }) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 10000); // Clear error after 10 seconds

      // Cleanup the timer
      return () => clearTimeout(timer);
    }
  }, [error]);
  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider).catch(async (error) => {
      if (error.code === 'auth/cancelled-popup-request' || error.code === 'auth/popup-closed-by-user') {
        // Ignore this error and do nothing
        return;
      } else if (error.code === 'auth/account-exists-with-different-credential') {
        const email = error.customData.email;
        const methods = await fetchSignInMethodsForEmail(auth, email);

        if (methods[0] === 'password') {
          const password = prompt(`An account already exists with the email ${email}. Please enter your password to link it with Google.`);
          if (password) {
            const credential = EmailAuthProvider.credential(email, password);
            await linkWithCredential(auth.currentUser, credential);
            await signInWithPopup(auth, googleProvider);
          }
        } else {
          setError(`An account already exists with the email ${email}. Please use the previous method to sign in.`);
        }
      } else {
        setError(error.message);
      }
    });
  };

  const signInWithFacebook = () => {
    signInWithPopup(auth, facebookProvider).catch(async (error) => {
      if (error.code === 'auth/cancelled-popup-request') {
        // Ignore this error and do nothing
        return;
      } else if (error.code === 'auth/account-exists-with-different-credential') {
        const email = error.customData.email;
        const methods = await fetchSignInMethodsForEmail(auth, email);

        if (methods[0] === 'password') {
          const password = prompt(`An account already exists with the email ${email}. Please enter your password to link it with Facebook.`);
          if (password) {
            const credential = EmailAuthProvider.credential(email, password);
            await linkWithCredential(auth.currentUser, credential);
            await signInWithPopup(auth, facebookProvider);
          }
        } else {
          setError(`An account already exists with the email ${email}. Please use the previous method to sign in.`);
        }
      } else {
        setError(error.message);
      }
    });
  };

  const handleLogout = () => {
    auth.signOut().catch((error) => setError(error.message));
  };

  return (
    <div>
      {user ? (
        <>
        <button onClick={handleLogout}>Sign Out</button>
        </>
      ) : (
        <>
        <p className='signup_info'>Sign in to join the conversation, receive notifications when new insights and predictions are posted, and stay up-to-date on the latest updates!</p>
          <button className='google_signin_button' onClick={signInWithGoogle}><img src={google} alt="Google" /> Sign in</button>
          <button className='facebook_signin_button' onClick={signInWithFacebook}><img src={facebook} alt="facebook" /> Sign in</button>
          {error && <p className='error_message'>{error}</p>}
          <p></p>
        </>
      )}
    </div>
  );
};

export default Auth;
