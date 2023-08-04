import './App.css';

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import LoadingBar from 'react-top-loading-bar'
import News from './components/News';
import './App.css';

const App = () => {

  const [progress, setprogress] = useState(0);

  const pageSize = 15;
  const apiKey = process.env.REACT_APP_NEWS_API

  const setProgress = (progress) => {
    setprogress(progress)
  }

  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <LoadingBar
          color='#f11946'
          progress={progress}
        />
        <Routes>
          <Route exact path="/" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pagesize={pageSize} country="in" category="general" />} />
          <Route exact path="/Business" element={<News setProgress={setProgress} apiKey={apiKey} key="business" pagesize={pageSize} country="in" category="business" />} />
          <Route exact path="/Entertainment" element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" pagesize={pageSize} country="in" category="entertainment" />} />
          <Route exact path="/Health" element={<News setProgress={setProgress} apiKey={apiKey} key="health" pagesize={pageSize} country="in" category="health" />} />
          <Route exact path="/Science" element={<News setProgress={setProgress} apiKey={apiKey} key="science" pagesize={pageSize} country="in" category="science" />} />
          <Route exact path="/Technology" element={<News setProgress={setProgress} apiKey={apiKey} key="technology" pagesize={pageSize} country="in" category="technology" />} />
        </Routes>
      </BrowserRouter>
    </div>
  )

}
export default App;