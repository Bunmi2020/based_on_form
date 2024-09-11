import './comment.css';
import ReactGA from 'react-ga4';

import React, { useState, useEffect } from 'react';
import Auth from './Auth';
import CommentSection from './CommentSection';
import { auth } from './firebaseConfig';
import { Helmet } from 'react-helmet';

function Comment() {

  ReactGA.send({
    hitType:"pageview",
    page:"/#comments",
    title:"Comment",
});

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div id='comments'>
     <Helmet>
          
          <script id="hydro_config" type="text/javascript">
          {`
            window.Hydro_tagId = "829d3b89-0fc4-424c-8477-ee88eb2ed1aa";
          `}
            </script>
            <script id="hydro_script" src="https://track.hydro.online/"></script>
            
            <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4268079192646406"
            crossorigin="anonymous"
            ></script>
            <meta name="google-adsense-account" content="ca-pub-4268079192646406"></meta>
        </Helmet>
      {user ? (
        <div>
          <i>Welcome, {user.displayName}</i>
          <i class="green"> ...be nice, and keep calm! You would be alerted when the weekend predictions are in!</i>
        </div>
      ) : (
        
        <Auth />
      )}
      <CommentSection />
    </div>
  );
}

export default Comment;
