import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Lander from './components/notes/lander';
import Error404 from './components/errorPage/404error';


function App() {
  return (
    // <Lander></Lander>
    <BrowserRouter>
      <Routes>
        <Route active path="/" element={<Lander/>} />
        <Route path="*" exact={true} element={<Error404/>} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
