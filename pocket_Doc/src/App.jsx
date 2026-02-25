import { useState } from 'react'
import './App.css'
import cough from './assets/cough.jpg';
import fever from './assets/fever.jpg';
import backpain from './assets/back-pain.jpg';
import { Routes, Route, useNavigate } from 'react-router-dom';
import CoughPage from './Components/cough';
import FeverPage from './Components/fever';
import BackPainPage from './Components/backpain';

function App() {
  const navigate = useNavigate();
  
  return (
    <>
      <div className='nav-bar'>
      </div>
    <Routes>
      <Route path="/" element={
      <>
      <h1>Select your symptom</h1>
      <div className="box-grid">
        <button onClick={() => navigate('/cough')} >
        <img src={cough} alt="Description" />
        <span>Cough</span>
        </button>
        <button onClick={() => navigate('/fever')} >
        <img src={fever} alt="Description" />
        <span>Fever</span>
        </button>
        <button onClick={() => navigate('/backpain')} >
        <img src={backpain} alt="Description" />
        <span>Back Pain</span>
        </button>
      </div>
      </>
      }/>
      <Route path='/cough' element={<CoughPage />} />
      <Route path='/fever' element={<FeverPage />} />
      <Route path='/backpain' element={<BackPainPage />} />
    </Routes>
    </>
  )
}


export default App
