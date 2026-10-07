import React from "react";

const Stats = () => {
  return (
    <div className="bg-[#f0f1eb] text-black text-center py-12">
      <div className="container mx-auto grid grid-cols-4 gap-8">
        <div className="">
          <h2 className="font-bold text-4xl text-[#0e7c66]">12,400+</h2>
          <p className="text-lg">Students using StudyFlow</p>
        </div>
        <div className="">
          <h2 className="font-bold text-4xl text-[#0e7c66]">1.2M</h2>
          <p className="text-lg">Tasks completed</p>
        </div>
        <div className="">
          <h2 className="font-bold text-4xl text-[#0e7c66]">1.2M</h2>
          <p className="text-lg">Hours of study</p>
        </div>
        <div className="">
          <h2 className="font-bold text-4xl text-[#0e7c66]">12,400+</h2>
          <p className="text-lg">Happy users</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
