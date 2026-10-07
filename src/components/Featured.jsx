import React from "react";
import SectionHeader from "./shared/SectionHeader";
import FeaturedCard from "./shared/FeaturedCard";
import { GoArrowLeft, GoCodeOfConduct } from "react-icons/go";

const Featured = () => {
  return (
    <div className="container mx-auto py-[75px] space-y-10">
      <SectionHeader
        title={"Everything a study session needs"}
        subTitle="Nothing you don't need, nothing you have to configure for an hour first."
      />

      <div className="grid grid-cols-4 gap-4">
        <FeaturedCard
          icon={<GoCodeOfConduct className="mx-auto text-[#0e7c66] text-2xl" />}
          title="Goals stay vague"
          description="Without a clear plan, your goals remain abstract and difficult to achieve."
        />
        <FeaturedCard
          icon={<GoCodeOfConduct className="mx-auto text-[#0e7c66] text-2xl" />}
          title="Goals stay vague"
          description="Without a clear plan, your goals remain abstract and difficult to achieve."
        />
        <FeaturedCard
          icon={<GoCodeOfConduct className="mx-auto text-[#0e7c66] text-2xl" />}
          title="Goals stay vague"
          description="Without a clear plan, your goals remain abstract and difficult to achieve."
        />
        <FeaturedCard
          icon={<GoArrowLeft className="mx-auto text-[#0e7c66] text-2xl" />}
          title="Goals stay vague"
          description="Without a clear plan, your goals remain abstract and difficult to achieve."
        />
      </div>
    </div>
  );
};

export default Featured;
