import React from "react";
import { BiStar } from "react-icons/bi";

const AIDayPlanning = () => {
  return (
    <section className="container mx-auto bg-[#14231f] grid grid-cols-2 items-center gap-4 py-[55px] px-4 text-white rounded-xl">
      <div className="space-y-4">
        <h3 className="text-yellow-500 text-lg font-semibold flex gap-2 items-center">
          <BiStar /> AI day planning
        </h3>
        <h2 className="font-bold text-4xl">
          Not sure where to start? Let StudyFlow suggest a plan
        </h2>
        <p>
          One click on "Plan my day" turns your open tasks into a simple,
          realistic schedule - so the hardest part, starting, is already done
          for you.
        </p>
      </div>
      <div className="space-y-4">
        <div className="bg-[#ffffff32] rounded-xl border border-[#ffffff32] p-4 space-y-2 ">
          <h2 className="text-yellow-500">Today's suggested plan</h2>

          <ul>
            <li>9:00 - 9:45 Deep work on your hardest task</li>
            <li>10:00 - 10:45 Next task, same subject</li>
            <li>11:00 - 11:30 Quick review and recall</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AIDayPlanning;
