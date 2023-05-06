import './App.css';

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  // *render* phle jsx ko html mei compile karega fir screen pe render karega html
  pageSize=5;
  apiKey = process.env.REACT_APP_NEWS_API//environment variable access
  
  state={
    progress:0
  }

  //setProgress is a method isko areow function isleye banaya kyo ki nhi toh "this" will not be available
  setProgress = (progress) => {
    this.setState({progress:progress})
  }

  render() {
    return (
      <div>
        <Router>
           <NavBar/>
           
           <LoadingBar
           height = {3} 
        color='#f11946'
        progress={this.state.progress}
       
      />
           <Routes>
            {/*jab component phle se rakha hua hai to react soche ga ki mei isko wapas se remount kyo karu,but hame update props ke sath usko wapas se remount karna hai
      force remount karne ke leye unique key prop deni padhegyi alag alag key dene se ye samjh jaegya ki hame isko remount karna hai */}
-               <Route path="/" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={this.pageSize} country={"in"} category={"general"} />} />
                <Route path="/business" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="business" pageSize={this.pageSize} country={"in"} category={"business"} />} />
                <Route path="/entertainment" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" pageSize={this.pageSize} country={"in"} category={"entertainment"} />} />
                <Route path="/general" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={this.pageSize} country={"in"} category={"general"} />} />
                <Route path="/health" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="health" pageSize={this.pageSize} country={"in"} category={"health"} />} />
                <Route path="/science" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="science" pageSize={this.pageSize} country={"in"} category={"science"} />} />
                <Route path="/sports" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="sports" pageSize={this.pageSize} country={"in"} category={"sports"} />} />
                <Route path="/technology"element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="technology"  pageSize={this.pageSize} country={"in"} category={"technology"} />} />
            </Routes>
        </Router>
      </div>
    )
  }
}