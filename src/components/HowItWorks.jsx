import React from "react";
import SectionHeader from "./shared/SectionHeader";
import HowItWorksCard from "./shared/HowItWorksCard";

const HowItWorks = () => {
  const steps = [
    {
      title: "Set a goal",
      description: "This is the first step of the process.",
    },
    {
      title: "Break it into daily tasks",
      description: "This is the second step of the process.",
    },
    {
      title: "Track your progress",
      description: "This is the third step of the process.",
    },
    {
      title: "Celebrate your achievements",
      description: "This is the fourth step of the process.",
    },
    {
      title: "Reflect and improve",
      description: "This is the fifth step of the process.",
    },
    {
      title: "Share your success",
      description: "This is the sixth step of the process.",
    },
  ];

  return (
    <div className="container mx-auto py-[70px] space-y-4">
      <SectionHeader title={"How it Works"} />

      <div className="grid grid-cols-3 gap-4">
        {steps.map((step, index) => {
          console.log(step, index);
          return <HowItWorksCard key={index} index={index} step={step} />;
        })}
      </div>
    </div>
  );
};

export default HowItWorks;
