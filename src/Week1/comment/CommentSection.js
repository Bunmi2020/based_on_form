import React, { useState, useEffect } from 'react';
import { auth, firestore } from './firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, addDoc, query, orderBy, onSnapshot, doc, updateDoc, arrayUnion, serverTimestamp, increment } from 'firebase/firestore';
import LoginPrompt from './LoginPrompt';
import './comment.css';
import AdSenseComponent from '../../AdSense ';

const CommentSection = () => {
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    const q = query(
      collection(firestore, 'comments'),
      orderBy('replyCount', 'desc'),
      
    );
    
    const unsubscribeComments = onSnapshot(q, (snapshot) => {
      setComments(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubscribeAuth();
      unsubscribeComments();
    };
  }, []);

  useEffect(() => {
    if (error ) {
      const timer = setTimeout(() => {
        setError(null);
       
      }, 5000); // Clear error after 5 seconds

      // Cleanup the timer
      return () => clearTimeout(timer);
    }
  }, [error]);

  const getFirstName = (fullName) => {
    return fullName ? fullName.split(' ')[0] : '';
  };

  const isValidComment = (text) => {
    const trimmedText = text.trim();
    const words = trimmedText.split(/\s+/);
    return trimmedText.length >= 7 && words.length >= 2;
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!isValidComment(newComment)) {
      setError('Comment must be at least 8 characters long and contain at least 2 words.');
      return;
    }

    if (user) {
      try {
        await addDoc(collection(firestore, 'comments'), {
          text: newComment,
          user: {
            uid: user.uid,
            displayName: getFirstName(user.displayName),
            photoURL: user.photoURL,
          },
          timestamp: serverTimestamp(),
          replies: [],
          replyCount: 0 // Initialize reply count
        });
        setNewComment('');
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    } else {
      setShowLoginPrompt(true);
    }
  };

  const handleReplySubmit = async (e, commentId, replyText) => {
    e.preventDefault();

   

    if (user) {
      try {
        const reply = {
          text: replyText,
          user: {
            uid: user.uid,
            displayName: getFirstName(user.displayName),
            photoURL: user.photoURL,
          },
          timestamp: new Date().toISOString(),
        };

        const commentRef = doc(firestore, 'comments', commentId);
        await updateDoc(commentRef, {
          replies: arrayUnion(reply),
          replyCount: increment(1) // Increment the reply count
        });
      } catch (error) {
        console.error('Error updating document: ', error);
      }
    } else {
      setShowLoginPrompt(true);
    }
  };

  const handleLogout = () => {
    signOut(auth).catch((error) => setError(error.message));
  };

  return (
    <div>
      {user ? (
        <div>
          <button onClick={handleLogout}>Sign Out</button>
          <p></p>
        </div>
      ) : (
        <></>
      )}

      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          required
          className='comment_box'
        />
          {error && <p className='error_message'>{error}</p>}
        <button type="submit">Post</button>
        <AdSenseComponent />
      </form>
      <div className='comments'>
        {comments.map((comment) => (
          <div key={comment.id} className='each_comment'>
          <span className='id_head'><img src={comment.user.photoURL} alt={comment.user.displayName} /> <h4>{comment.user.displayName}</h4></span>
            <p>{comment.text}</p>
            <div>
              <form onSubmit={(e) => {
                e.preventDefault();
                const replyText = e.target.elements.reply.value;
                handleReplySubmit(e, comment.id, replyText);
                e.target.elements.reply.value = '';
              }}>
                <input
                  type="text"
                  name="reply"
                  placeholder="Write a reply..."
                  required
                  pattern=".*\S.*\S.*" title="Reply must contain at least two non-whitespace characters"
                />
                 <button type="submit">Reply</button>
              </form>
              {comment.replies && comment.replies.map((reply, index) => (
                <div className='each_reply' key={index} style={{ marginLeft: '20px' }}>
                 <h4>{reply.user.displayName}</h4>
                  <p>{reply.text}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {showLoginPrompt && <LoginPrompt onClose={() => setShowLoginPrompt(false)} />}
    </div>
  );
};

export default CommentSection;
