import './components.css'

function CoughPage() {
  return (
    <div className="Topic">
      <h1>Remedies for cough</h1>
      <h2>Based on NHS.uk</h2>
    <div className="Solutions" >
      <p>You should:</p>
      <li>rest</li>
      <li>drink plenty of fluids</li>
      <li>try to stay at home and avoid contact with other people</li>
      <p>You could also try:</p>
      <li>paracetamol or ibuprofen to treat any pain(not suitable for babies under 1 year old)</li>
      <li>hot lemon and honey </li>
      <li>a herbal medicine called pelargonium (suitable for people aged 12 or over)</li>
      <p>But there's limited evidence to show these work. Hot lemon with honey has a similar effect to cough medicines.</p>
    </div>
    <div className="OfficialAdvice">
    <h3>A pharmacist can help if you have a cough</h3>
    <p>If you have a cough, you can ask a pharmacist about:</p>
    <li>cough syrup</li>
    <li>cough medicine (some cough medicines should not be given to children under 12 years old)</li>
    <li>cough sweets</li>
    <p>These will not stop your cough, but may help you cough less. Decongestants and cough medicines containing codeine will not stop your cough.</p>
    <h3>You need to see a doctor if: </h3>
    <li>you've had a cough for more than 3 weeks (persistent cough)</li>
    <li>you're losing weight for no reason</li>
    <li>you have a weakened immune system – for example, because of chemotherapy or diabetes</li>
    <h3>You need to see a doctor urgently if: </h3>
    <li>your cough is very bad or quickly gets worse – for example, you have a hacking cough or cannot stop coughing</li>
    <li>you feel very unwell</li>
    <li>you have chest pain</li>
    <li>the side of your neck feels swollen and painful (swollen glands)</li>
    <li>you find it hard to breathe</li>
    <li>you're coughing up blood</li>
    <p>You can call 111 </p>
    </div>

    </div>
  );
}

export default CoughPage;