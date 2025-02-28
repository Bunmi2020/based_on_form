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

import JanFour from './week15/Home';
import JanFive from './week16/Home';
import FebOne from './week17/Home';
import BundesligaPredictions from './week18/league_predictions/bundelsiga_pre';
import LigueOnePredictions from './week18/league_predictions/ligue_1_pre';
import LaLigaPredictions from './week18/league_predictions/laliga_pre';
import PLPredictions from './week18/league_predictions/pl_pre';
import SerieAPredictions from './week18/league_predictions/serie_a_pre';
import FebTwo from './week18/Home';
import FebThree from './week19/Home';
import BundesligaPredictionsN from './week19/league_predictions/bundelsiga_pre';
import SerieAPredictionsN from './week19/league_predictions/serie_a_pre';
import PLPredictionsN from './week19/league_predictions/pl_pre';
import LaLigaPredictionsN from './week19/league_predictions/laliga_pre';
import LigueOnePredictionsN from './week19/league_predictions/ligue_1_pre';

import BundesligaPredictionsNN from './week20/league_predictions/bundelsiga_pre';
import SerieAPredictionsNN from './week20/league_predictions/serie_a_pre';
import PLPredictionsNN from './week20/league_predictions/pl_pre';
import LaLigaPredictionsNN from './week20/league_predictions/laliga_pre';
import LigueOnePredictionsNN from './week20/league_predictions/ligue_1_pre';
import FebFour from './week20/Home';


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
          
          
          <Route path="/" element={<FebFour />} /> 
          
          <Route path="/24-27_Jan" element={<JanFour />} />
          <Route path="/31-3_Feb" element={<JanFive />} />
          <Route path="/7-10_Feb" element={<FebOne />} />
          <Route path="/14-17_Feb" element={<FebTwo />} />
          <Route path="/21-23_Feb" element={<FebThree />} />
          <Route path="/28-3_March" element={<FebFour />} />

          <Route path="/about" element={<About />} />
          <Route path="/FAQ" element={<FAQ />} />
          <Route path="/privacy_policy" element={<PrivacyPolicy/>} />
          <Route path="/terms_of_use" element={<TermsOfUse/>} />
          <Route path="/install_app" element={<InstallBaseOnForm/>} />

          <Route path="/bundesliga_predictions_week_22" element={<BundesligaPredictions/>} />
          <Route path="/serie_a_predictions_week_25" element={<SerieAPredictions/>} />
          <Route path="/pl_predictions_week_25" element={<PLPredictions/>} />
          <Route path="/laliga_predictions_week_24" element={<LaLigaPredictions/>} />
          <Route path="/ligue_1_predictions_week_22" element={<LigueOnePredictions/>} />

          <Route path="/bundesliga_predictions_week_23" element={<BundesligaPredictionsN/>} />
          <Route path="/serie_a_predictions_week_26" element={<SerieAPredictionsN/>} />
          <Route path="/pl_predictions_week_26" element={<PLPredictionsN/>} />
          <Route path="/laliga_predictions_week_25" element={<LaLigaPredictionsN/>} />
          <Route path="/ligue_1_predictions_week_23" element={<LigueOnePredictionsN/>} />

          <Route path="/bundesliga_predictions_week_24" element={<BundesligaPredictionsNN/>} />
          <Route path="/serie_a_predictions_week_27" element={<SerieAPredictionsNN/>} />
          <Route path="/pl_predictions_week_27" element={<PLPredictionsNN/>} />
          <Route path="/laliga_predictions_week_26" element={<LaLigaPredictionsNN/>} />
          <Route path="/ligue_1_predictions_week_24" element={<LigueOnePredictionsNN/>} />
      </Routes>
      <ConsentPopup />
      <Footer />
     
    </div>
  );
}

export default App;