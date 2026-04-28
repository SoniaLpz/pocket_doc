import './components.css'
import data from '../../../db.json'
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MovieClip from './Video/VideoYoutube'; 
import Ingredients from './ingredientsList/ingredientsList';

function Symptoms() {
  const { id } = useParams();
  const [symptoms, setSymptoms] = useState({});
  const navigate = useNavigate();

  const getData = () => {
    fetch(`http://localhost:3030/symptoms/${id}`)
      .then((response) => response.json())
      .then((result) => setSymptoms(result))
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getData();
  }, [id]);


  return (
    <div className="topic">
    <div className="returnButton">
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
    <h1>
     {symptoms.title}
    </h1>
    {symptoms.sections && symptoms.sections.map((section, index) => (
    <div key={index} className="sections">
    {section.type === 'text' && <p className="officialAdvice">{section.content}</p>}
    <div className="columns">
    {section.type === 'image' &&  (
    <>
    <div className="image-container">
    <p className="captionImage">{section.caption}</p>
    <img className="img-caption" src={section.url} />
    </div>
    <div className="ingredientsList">
    <Ingredients />
    </div>
    </>
    )}
    </div>  
    {section.type === 'list' &&
    <div className="remediesList">
    <h3>{section.title}</h3>
    <ul>
    {section.items.map((item, i) => <li key={i}>{item}</li>)}
    </ul>
    </div>
    }
    </div>
    ))}
    <div className="video">
    <h3>Immune Boosting Movements</h3>
    <MovieClip videoId={symptoms.videoUrl} />
    </div>
    </div>
);
};

export default Symptoms;
