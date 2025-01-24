import React, { useState, useEffect } from 'react';

const ConsentPopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const consentGiven = localStorage.getItem('consentGiven');
    
    if (!consentGiven) {
      // Show the popup after 10 seconds if no consent is found
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 10000); // 10 seconds

      return () => clearTimeout(timer); // Clear the timer when the component unmounts
    }
  }, []);

  const handleAccept = () => {
    setShowPopup(false);
    // Save consent to localStorage or make API call for consent tracking
    localStorage.setItem('consentGiven', true);
  };

  const handleReject = () => {
    alert("You must accept cookies and age verification to proceed.");
    window.location.href = 'https://basedonform.com/#/terms_of_use'; // Redirect or block access
  };

  if (!showPopup) return null;

  return (
    <div style={popupStyle}>
      <div style={popupContentStyle}>
        <h4>We Value Your Privacy and Age Verification</h4>
        <p>
          We use cookies to enhance your experience, analyze site performance, 
          and deliver relevant content. By clicking <strong>‘Accept All’</strong>, you confirm 
          that you are over 18 years of age and consent to our use of cookies.
        </p>
        <div style={buttonContainerStyle}>
          <button onClick={handleAccept} style={acceptButtonStyle}>
            Accept All
          </button>
          <button onClick={handleReject} style={rejectButtonStyle}>
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

// Simple styles for the popup
const popupStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const popupContentStyle = {
    fontSize: 'medium',
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '10px',
  textAlign: 'center',
  maxWidth: '500px',
  width: '100%',
};

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  marginTop: '20px',
};

const acceptButtonStyle = {
  padding: '10px 20px',
  backgroundColor: 'green',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const rejectButtonStyle = {
  padding: '10px 20px',
  backgroundColor: 'brown',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default ConsentPopup;
