import './components.css'
import data from '../../../db.json'
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import MovieClip from './Video/VideoYoutube'

function Symptoms() {
  const { id } = useParams();
  const [symptoms, setSymptoms] = useState([]);

   const getData = async () => {
    await fetch(`http://localhost:3030/symptoms/${id}`)
      .then((response) => response.json())
      .then((result) => setSymptoms(result))
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getData();
  }, [id]);


  return (
    <div className="Topic">
    <h1>
     {symptoms.title}
    </h1>
    {symptoms.sections && symptoms.sections.map((section, index) => (
    <div key={index} className="sections">
    {section.type === 'text' && <p className="officialAdvice">{section.content}</p>}
    {section.type === 'image' && 
    <div className="image-container">
    <p className="captionImage">{section.caption}</p>
    <img src={section.url} />
    </div>
    }
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
    <div className="Video">
    <MovieClip videoId={symptoms.videoUrl} />
    </div>
    </div>
);
};

export default Symptoms;
