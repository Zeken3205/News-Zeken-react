
import './App.css';

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import News from './components/News';
import './App.css';

export default function App() {
  let pageSize = 15;
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<News key="general" pagesize={pageSize} country="in" category="general" />} />
          <Route exact path="/Business" element={<News key="business" pagesize={pageSize} country="in" category="business" />} />
          <Route exact path="/Entertainment" element={<News key="entertainment" pagesize={pageSize} country="in" category="entertainment" />} />
          <Route exact path="/Health" element={<News key="health" pagesize={pageSize} country="in" category="health" />} />
          <Route exact path="/Science" element={<News key="science" pagesize={pageSize} country="in" category="science" />} />
          <Route exact path="/Technology" element={<News key="technology" pagesize={pageSize} country="in" category="technology" />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

