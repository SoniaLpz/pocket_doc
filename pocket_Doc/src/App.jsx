import './App.css';
import cough from '../public/assets/cough.jpg';
import fever from '../public/assets/fever.jpg';
import backpain from '../public/assets/back-pain.jpg';
import migraine from '../public/assets/migraine.jpg';
import stomachache from '../public/assets/stomachache.jpg';
import insomnia from '../public/assets/insomnia.jpg';
import Logo from './assests/Logo.png';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Symptoms from './Components/symptoms';

function App() {
  const navigate = useNavigate();
  
  return (
    <>
      <nav className='nav-bar'>
      <img src={Logo} alt="Logo"/>
      </nav>
    <Routes>
      <Route path="/" element={
      <>
      <h1>Select your symptom</h1>
      <div className="box-grid">
        <button onClick={() => navigate('/symptoms/cough')} >
        <img src={cough} alt="Cough" />
        <span>Cough</span>
        </button>
        <button onClick={() => navigate('/symptoms/fever')} >
        <img src={fever} alt="Fever" />
        <span>Fever</span>
        </button>
        <button onClick={() => navigate('/symptoms/backpain')} >
        <img src={backpain} alt="Back Pain" />
        <span>Back Pain</span>
        </button>
        <button onClick={() => navigate('/symptoms/migraine')} >
        <img src={migraine} alt="Migraine" />
        <span>Migraine</span>
        </button>
        <button onClick={() => navigate('/symptoms/stomachache')} >
        <img src={stomachache} alt="Stomachache" />
        <span>Stomach Ache</span>
        </button>
        <button onClick={() => navigate('/symptoms/insomnia')} >
        <img src={insomnia} alt="Insomnia" />
        <span>Insomnia</span>
        </button>
      </div>
      </>
      }/>
      <Route path='/symptoms/:id' element={<Symptoms />} />
    </Routes>
    </>
  )
}


export default App
