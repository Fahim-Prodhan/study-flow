import React from "react";
import { GoArrowLeft, GoGoal } from "react-icons/go";
import SectionHeader from "./shared/SectionHeader";
import FeaturedCard from "./shared/FeaturedCard";

const Studying = () => {
  return (
    <section className="container mx-auto text-center py-[75px] space-y-10">
      <SectionHeader
        title="Studying without a system is exhausting"
        subTitle="You're not lacking discipline. You're lacking a place where your goals turn into today's tasks."
      />

      <div className="grid grid-cols-3 gap-4">
        <FeaturedCard
          icon={<GoGoal className="mx-auto text-[#0e7c66] text-2xl" />}
          title="Goals stay vague"
          description="Without a clear plan, your goals remain abstract and difficult to achieve."
        />
        <FeaturedCard
          icon={<GoGoal className="mx-auto text-[#0e7c66] text-2xl" />}
          title="Goals stay vague"
          description="Without a clear plan, your goals remain abstract and difficult to achieve."
        />
        <FeaturedCard
          icon={<GoArrowLeft className="mx-auto text-[#0e7c66] text-2xl" />}
          title="Goals stay vague"
          description="Without a clear plan, your goals remain abstract and difficult to achieve."
        />
      </div>
    </section>
  );
};

export default Studying;
