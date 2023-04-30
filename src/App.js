import './App.css';

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';

export default class App extends Component {
  // *render* phle jsx ko html mei compile karega fir screen pe render karega html
  render() {
    return (
      <div>
           <NavBar/>
           <News/>
      </div>
    )
  }
}