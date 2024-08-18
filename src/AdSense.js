import React, { useEffect } from 'react';

const AdSenseComponent = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
    document.head.appendChild(script);

    if (window.adsbygoogle) {
      window.adsbygoogle.push({});
    }
  }, []);

  return (
    <ins className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-4268079192646406"  // Your AdSense Publisher ID
      data-ad-format="auto"                    // Auto format for responsive ads
      data-full-width-responsive="true"></ins> // Ensures responsive behavior
  );
};

export default AdSenseComponent;

