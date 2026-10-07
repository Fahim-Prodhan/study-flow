import React from "react";

const FeaturedCard = ({ icon, title, description }) => {
  return (
    <div className="space-y-4 bg-white p-4 rounded-xl shadow-lg text-center">
      {/* <GoGoal className="mx-auto text-[#0e7c66] text-2xl" /> */}
      {icon}
      <h2 className="font-bold text-2xl">{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default FeaturedCard;
