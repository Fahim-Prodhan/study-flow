import React from "react";
import { FaCheck } from "react-icons/fa";

const PricingCard = ({ plan }) => {
  return (
    <div
      key={plan.id}
      className={`bg-white p-6 mb-4 card shadow-md rounded-lg space-y-2 ${plan.pricingType === "Pro" ? "border-2 border-[#0e7c66]" : ""}`}
    >
      <h3 className="text-xl font-bold">{plan.pricingType}</h3>
      <p className="text-gray-500">{plan.description}</p>
      <p className="text-lg font-semibold">
        ${plan.price} /{" "}
        <span className="text-sm text-gray-500">{plan.expiration}</span>
      </p>
      <ul className="list-inside text-gray-700 ">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex gap-2 items-center">
            <FaCheck className="text-[#0e7c66]" />
            {feature}
          </li>
        ))}
      </ul>

      <button
        className={`btn  ${plan.pricingType === "Pro" ? "bg-[#0e7c66] text-white" : ""} `}
      >
        Get Started
      </button>
    </div>
  );
};

export default PricingCard;
