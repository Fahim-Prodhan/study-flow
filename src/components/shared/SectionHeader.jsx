import React from "react";

const SectionHeader = ({ title, subTitle }) => {
  console.log({ title, subTitle }, "props");
  return (
    <div className="max-w-[700px] mx-auto space-y-2 text-center">
      <h2 className="font-bold text-5xl">{title}</h2>
      <p className="text-lg">{subTitle}</p>
    </div>
  );
};

export default SectionHeader;
