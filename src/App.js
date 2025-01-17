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

import OctTwo from './week8/Home';
import OctThree from './week9/Home';
import NovOne from './week10/Home';
import NovTwo from './week11/Home';
import JanTwo from './week13/Home';
import JanThree from './week14/Home';


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
          
          <Route path="/18-21_Oct" element={<OctTwo />} />
          <Route path="/" element={<JanThree />} />
          <Route path="/08-10_Nov" element={<NovTwo />} />  
          <Route path="/01-04_Nov" element={<NovOne />} />  

          <Route path="/25-28_Oct" element={<OctThree />} />
          <Route path="/14-15_Jan" element={<JanTwo />} />
          <Route path="/17-20_Jan" element={<JanThree />} />

          <Route path="/about" element={<About />} />
          <Route path="/FAQ" element={<FAQ />} />
          <Route path="/privacy_policy" element={<PrivacyPolicy/>} />
          <Route path="/terms_of_use" element={<TermsOfUse/>} />
          <Route path="/install_app" element={<InstallBaseOnForm/>} />
      </Routes>

      <Footer />
     
    </div>
  );
}

export default App;