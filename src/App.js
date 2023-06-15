import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Loading02 from './full_wall_paper/full_wall_paper';
import Home from './home/home';
import CardComponent from "./page3/test2";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
          <Route path="full_wall_paper" element={<Loading02 />} />
          <Route path="page3" element={<CardComponent />} />
          <Route path="/" element={<Home />} />
        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
