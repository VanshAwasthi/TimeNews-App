import './App.css';

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export default class App extends Component {
  // *render* phle jsx ko html mei compile karega fir screen pe render karega html
  render() {
    return (
      <div>
        <Router>
           <NavBar/>
           {/* <News pageSize={5} country={"in"} category={"general"} /> */}
           <Routes>
            {/*jab component phle se rakha hua hai to react soche ga ki mei isko wapas se remount kyo karu,but hame update props ke sath usko wapas se remount karna hai
      force remount karne ke leye unique key prop deni padhegyi alag alag key dene se ye samjh jaegya ki hame isko remount karna hai */}
-               <Route path="/" element={<News key="general" pageSize={5} country={"in"} category={"general"} />} />
                <Route path="/business" element={<News key="business" pageSize={5} country={"in"} category={"business"} />} />
                <Route path="/entertainment" element={<News key="entertainment" pageSize={5} country={"in"} category={"entertainment"} />} />
                <Route path="/general" element={<News key="general" pageSize={5} country={"in"} category={"general"} />} />
                <Route path="/health" element={<News key="health" pageSize={5} country={"in"} category={"health"} />} />
                <Route path="/science" element={<News key="science" pageSize={5} country={"in"} category={"science"} />} />
                <Route path="/sports" element={<News key="sports" pageSize={5} country={"in"} category={"sports"} />} />
                <Route path="/technology"element={<News key="technology"  pageSize={5} country={"in"} category={"technology"} />} />
            </Routes>
        </Router>
      </div>
    )
  }
}