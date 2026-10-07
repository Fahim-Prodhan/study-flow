import React from "react";

const HowItWorksCard = ({ index, step }) => {
  return (
    <div className="space-y-2 bg-white p-4 rounded-xl shadow-lg text-center">
      <h1 className="font-bold text-6xl text-[#0e7c66]">{index + 1}</h1>
      <h3 className="font-semibold text-2xl">{step.title}</h3>
      <p>{step.description}</p>
    </div>
  );
};

export default HowItWorksCard;
