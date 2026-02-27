import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import './list.css'

function Ingredients() {
  const { id } = useParams();
  const [ingredients, setIngredients] = useState([]);

   const getData = async () => {
    await fetch(`http://localhost:3000/ingredients/${id}`)
      .then((response) => response.json())
      .then((result) => setIngredients(result))
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getData();
  }, [id]);


  return (
    <div className="List">
    <h1>
     {ingredients.title}   
    </h1>
    {ingredients.sections && ingredients.sections.map((section) => (
    <div key={section.id} className="sections">
    <span>{section.name}</span>
    </div>
    ))}
    </div>
);
};

export default Ingredients;
