import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Modules from './class/Modules.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>IT Recruitment test</h2>
        </div>
        <p className="App-intro">
          Task creator as test for recruitment
        </p>
        <Modules/>
      </div>
    );
  }
}

export default App;
