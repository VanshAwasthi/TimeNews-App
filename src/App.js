import "./App.css";

import React, { useState } from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App = () => {
  // *render* phle jsx ko html mei compile karega fir screen pe render karega html
  const pageSize = 5;
  const apiKey = process.env.REACT_APP_NEWS_API; //environment variable access

  const [progress, setProgress] = useState(0);

  return (
    <div>
      <Router>
        <NavBar />

        <LoadingBar height={3} color="#f11946" progress={progress} />
        <Routes>
          {/*jab component phle se rakha hua hai to react soche ga ki mei isko wapas se remount kyo karu,but hame update props ke sath usko wapas se remount karna hai
      force remount karne ke leye unique key prop deni padhegyi alag alag key dene se ye samjh jaegya ki hame isko remount karna hai */}
          -{" "}
          <Route
            path="/"
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key="general"
                pageSize={pageSize}
                country={"in"}
                category={"general"}
              />
            }
          />
          <Route
            path="/business"
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key="business"
                pageSize={pageSize}
                country={"in"}
                category={"business"}
              />
            }
          />
          <Route
            path="/entertainment"
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key="entertainment"
                pageSize={pageSize}
                country={"in"}
                category={"entertainment"}
              />
            }
          />
          <Route
            path="/general"
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key="general"
                pageSize={pageSize}
                country={"in"}
                category={"general"}
              />
            }
          />
          <Route
            path="/health"
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key="health"
                pageSize={pageSize}
                country={"in"}
                category={"health"}
              />
            }
          />
          <Route
            path="/science"
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key="science"
                pageSize={pageSize}
                country={"in"}
                category={"science"}
              />
            }
          />
          <Route
            path="/sports"
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key="sports"
                pageSize={pageSize}
                country={"in"}
                category={"sports"}
              />
            }
          />
          <Route
            path="/technology"
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key="technology"
                pageSize={pageSize}
                country={"in"}
                category={"technology"}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  )
}

export default App;
