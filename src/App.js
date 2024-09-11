import React from 'react';
import ReactGA from 'react-ga4';

import About from './about';
import './App.css';
import FAQ from './faq';
import Home from './week2/Home';

import { Routes, Route } from 'react-router-dom';
import Footer from './footer';
import PrivacyPolicy from './privacyPolicy';
import TermsOfUse from './termsofuse';
import InstallBaseOnForm from './install_base_on_form';
import TopMenu from './header';
import HomeNew from './week3/Home';
import ConsentPopup from './consent';
import { Helmet } from 'react-helmet';
import SeptOne from './week4/Home';


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
      <TopMenu />
      <Routes >
          <Route path="/30-1_sept" element={<HomeNew />} />
          <Route path="/13-16_Sept" element={<SeptOne />} />
          <Route path="/23-26_Aug" element={<Home />} />
          <Route path="/" element={<SeptOne />} />
          <Route path="/about" element={<About />} />
          <Route path="/FAQ" element={<FAQ />} />
          <Route path="/privacy_policy" element={<PrivacyPolicy/>} />
          <Route path="/terms_of_use" element={<TermsOfUse/>} />
          <Route path="/install_app" element={<InstallBaseOnForm/>} />
      </Routes>

      <Footer />
      <ConsentPopup />
     
    </div>
  );
}

export default App;