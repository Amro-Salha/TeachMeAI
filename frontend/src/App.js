import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from "./components/NavBar";
import MainPage from './components/MainPage';
import CurriculumBot1Home from './components/CurriculumBot1';
import CurriculumList from './components/CurriculumList'
import CurriculumDetail from './components/CurriculumDetail';
import { HintBot } from './components/HintBot/HintBot';
import PracticeBot from './components/PracticeBot/PracticeBot'
import PracticeList from './components/PracticeBot/PracticeList'
import PracticeDetail from './components/PracticeBot/PracticeDetail'
import ResetPassword from './components/Account/ResetPassword';
import ResetPasswordConfirm from './components/Account/ResetPasswordConfirm';
import Activate from './components/Account/Activate';

import { useEffect } from "react";

import {connect} from 'react-redux'
import { checkAuthenticated, load_user } from './actions/auth';

function App({ checkAuthenticated, load_user }) {

  useEffect(() => {
    checkAuthenticated();
    load_user();
  }, [checkAuthenticated, load_user])

  return (
    <>
    <div className='website'>

        <NavBar />

        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/curriculums/curriculum-bot" element={<CurriculumBot1Home />} />
              <Route path="/curriculums/curriculum-list" element={<CurriculumList />} />
              <Route path="/curriculums/:id" element={<CurriculumDetail />} />
              <Route path="/hints/" element={<HintBot />} />
              <Route path="/reset-password/" element={<ResetPassword />} />
              <Route path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm />} />
              <Route path="/activate/:uid/:token" element={<Activate />} />
              <Route path="/practice/practice-bot" element={<PracticeBot />} />
              <Route path="/practice/practice-list" element={<PracticeList />} />
              <Route path="/problem-set/:id" element={<PracticeDetail />} />
            </Routes>
          </div>
        </BrowserRouter>
        </div>




    </>
  );
}

export default connect(null, { checkAuthenticated, load_user })(App);
