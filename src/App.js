import './App.css';

import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import LoadingBar from 'react-top-loading-bar'
import News from './components/News';
import './App.css';

export default class App extends Component {
  state = {
    progress: 0
  }
  pageSize = 15;
  apiKey = process.env.REACT_APP_NEWS_API

  setProgress = (progress) => {
    this.setState({ progress: progress });
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <NavBar />
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
          />
          <Routes>
            <Route exact path="/" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="general" pagesize={this.pageSize} country="in" category="general" />} />
            <Route exact path="/Business" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="business" pagesize={this.pageSize} country="in" category="business" />} />
            <Route exact path="/Entertainment" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" pagesize={this.pageSize} country="in" category="entertainment" />} />
            <Route exact path="/Health" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="health" pagesize={this.pageSize} country="in" category="health" />} />
            <Route exact path="/Science" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="science" pagesize={this.pageSize} country="in" category="science" />} />
            <Route exact path="/Technology" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="technology" pagesize={this.pageSize} country="in" category="technology" />} />
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}
