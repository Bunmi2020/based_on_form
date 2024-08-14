
import './comment.css';
// src/comment.js

import React, { useState, useEffect } from 'react';
import Auth from './Auth';
import CommentSection from './CommentSection';
import { auth } from './firebaseConfig';

function Comment() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div id='comments'>
      {user ? (
        <div>
          <i class="green">Welcome, {user.displayName}</i>
          <br></br>
         <i>...be nice</i>
        </div>
      ) : (
        
        <Auth />
      )}
      <CommentSection />
    </div>
  );
}

export default Comment;
