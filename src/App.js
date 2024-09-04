import React from 'react';
import ReactGA from 'react-ga4';

import About from './about';
import './App.css';
import FAQ from './faq';
import Home from './week2/Home';
import PreviousHome from './Week1/Home';
import { Routes, Route } from 'react-router-dom';
import Footer from './footer';
import PrivacyPolicy from './privacyPolicy';
import TermsOfUse from './termsofuse';
import InstallBaseOnForm from './install_base_on_form';
import TopMenu from './header';
import HomeNew from './week3/Home';


function App() {
  ReactGA.initialize('G-6PFKTMSP8H');

  return (
    <div className="App" id=' '>
      <TopMenu />
      <Routes >
          <Route path="/" element={<HomeNew />} />
          <Route path="/23-26_Aug" element={<Home />} />
          <Route path="/15-19_Aug" element={<PreviousHome />} />
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
