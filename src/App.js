import React from 'react';
import ReactGA from 'react-ga4';

import About from './about';
import './App.css';
import FAQ from './faq';

import { Routes, Route } from 'react-router-dom';
import Footer from './footer';
import PrivacyPolicy from './privacyPolicy';
import TermsOfUse from './termsofuse';
import InstallBaseOnForm from './install_base_on_form';
import TopMenu from './header';
import ConsentPopup from './consent';
import { Helmet } from 'react-helmet';

import JanTwo from './week13/Home';
import JanThree from './week14/Home';
import JanFour from './week15/Home';
import JanFive from './week16/Home';
import BLHome from './week16/BL_Home';
import FebOne from './week17/Home';


function App() {
  ReactGA.initialize('G-6PFKTMSP8H');

  return (
    <div className="App" id=' '>
    <Helmet>
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4268079192646406"
            crossorigin="anonymous"
            ></script>
            <meta name="google-adsense-account" content="ca-pub-4268079192646406"></meta>
    </Helmet>
      <TopMenu className='top_menu'/>
      <Routes >
          
          
          <Route path="/" element={<FebOne />} /> 
          
          <Route path="/14-15_Jan" element={<JanTwo />} />
          <Route path="/17-20_Jan" element={<JanThree />} />
          <Route path="/24-27_Jan" element={<JanFour />} />
          <Route path="/31-3_Feb" element={<JanFive />} />
          <Route path="7-10_Feb" element={<FebOne />} />

          <Route path="/about" element={<About />} />
          <Route path="/FAQ" element={<FAQ />} />
          <Route path="/privacy_policy" element={<PrivacyPolicy/>} />
          <Route path="/terms_of_use" element={<TermsOfUse/>} />
          <Route path="/install_app" element={<InstallBaseOnForm/>} />
          <Route path="/bundesliga_predictions" element={<BLHome/>} />
      </Routes>
      <ConsentPopup />
      <Footer />
     
    </div>
  );
}

export default App;