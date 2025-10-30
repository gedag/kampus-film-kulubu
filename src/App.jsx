import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import ShowDetail from './pages/ShowDetail';
import Footer from './components/Footer';

// CSS dosyalarımızı import ediyoruz
import './index.css'; 
import './App.css'; 

function App() {
  return (
    <div className="App">
      {/* Sayfa içeriğini sarmalayan yeni konteyner */}
      <div className="page-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/show/:id" element={<ShowDetail />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;