
import './App.css';

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import News from './components/News';
import './App.css';

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<News key="general" pagesize={6} country="in" category="general" />} />
          <Route exact path="/Business" element={<News key="business" pagesize={6} country="in" category="business" />} />
          <Route exact path="/Entertainment" element={<News key="entertainment" pagesize={6} country="in" category="entertainment" />} />
          <Route exact path="/Health" element={<News key="health" pagesize={6} country="in" category="health" />} />
          <Route exact path="/Science" element={<News key="science" pagesize={6} country="in" category="science" />} />
          <Route exact path="/Technology" element={<News key="technology" pagesize={6} country="in" category="technology" />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

