import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Loading02 from './full_wall_paper/full_wall_paper';
import Home from './home/home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="full_wall_paper" element={<Loading02 />} />
        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
