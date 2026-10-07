import React from "react";
import { FaArrowRight } from "react-icons/fa";

const NextStudySession = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white px-[150px] py-[50px] text-center space-y-4">
      <h2 className="text-3xl font-bold">
        Set your first goal in under two minutes. No credit card required.
      </h2>
      <p className="text-lg">
        Your next study session could be the one that sticks
      </p>
      <button className="btn bg-[#0e7c66] text-white">
        Get Started <FaArrowRight />
      </button>
    </div>
  );
};

export default NextStudySession;
