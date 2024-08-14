import React, { useEffect } from 'react';

const AdSenseComponent = () => {
  useEffect(() => {
    if (window.adsbygoogle) {
      window.adsbygoogle.push({});
    }
  }, []);

  return (
    <ins className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-XXXXXX"
      data-ad-slot="1234567890"
      data-ad-format="auto"></ins>
  );
};

export default AdSenseComponent;
