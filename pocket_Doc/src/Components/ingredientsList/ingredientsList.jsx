import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './list.css'
import generatePdf  from '../Pdf Generator/PdfGenerate.jsx'

function Ingredients() {
  const { id } = useParams();
  const [ingredients, setIngredients] = useState({});
  const [checkedValues, setCheckedValues] = useState([]); 

   const getData = () => {
    fetch(`http://localhost:3000/ingredients/${id}`)
      .then((response) => response.json())
      .then((result) => setIngredients(result))
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getData();
  }, [id]);

  const handleSelect = (event) => {
    const {value, checked} = event.target
    if(checked){
      setCheckedValues(pre => [...pre, value])
    } else ( 
      setCheckedValues(pre =>{
        return [...pre.filter(ingredients => ingredients !== value)]
      })
    )
    }

    const PdfGenerator = () => {
    let jsonData = checkedValues; 
    generatePdf(jsonData);
  };

  return (
    <div className="List">
    <h1>
     {ingredients.title}   
    </h1>
    {ingredients.sections && ingredients.sections.map((section) => (
    <div key={section.id} className="sections">
     <input 
      type="checkbox"
      name="ingredients"
      id={section.id}
      value={section.name}
      onChange={handleSelect}
      />
      <label htmlFor={section.id}>{section.name}</label>
    </div>
    ))}
    <div className="buttonPdf">
      <button onClick={PdfGenerator}>Print PDF</button>
    </div>
    </div>
);
};

export default Ingredients;
