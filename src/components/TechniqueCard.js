import React from 'react';

const TechniqueCard = ({ technique }) => {
  return (
    <div className="technique-card">
      <h3>{technique.name}</h3>
      <ul>
        {technique.steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ul>
    </div>
  );
};

export default TechniqueCard;
