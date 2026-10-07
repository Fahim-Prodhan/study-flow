const Banner = () => {
  return (
    <div className="container mx-auto text-center py-[75px] space-y-16">
      <span className="badge">Built for students who like to see progress</span>
      <h2 className="font-semibold text-5xl max-w-[700px] mx-auto">
        Turn big goals into daily tasks you'll actually finish
      </h2>
      <p className="max-w-[700px] mx-auto">
        Set a goal, break it into tasks, and watch a progress bar move every
        time you check one off. No spreadsheets, no guessing what to study
        next.s
      </p>

      <div className="flex gap-2 items-center justify-center">
        <button className="btn bg-[#0e7c66] text-white border-none">
          Get Started
        </button>
        <button className="btn">See how it works</button>
      </div>

      <div className="card bg-base-100 w-[550px] mx-auto shadow-sm space-y-4 text-black py-4 px-[20px]">
        <div className="flex justify-between items-center gap-4">
          <h2 className="font-bold text-2xl">Today's progress</h2>
          <p>50% complete</p>
        </div>
        <progress
          className="progress text-[#0e7c66] h-[15px]"
          value="50"
          max="100"
        ></progress>

        <ul className="space-y-5">
          <li className="flex items-center gap-4 border border-[#0e7c66] rounded-md p-2 font-semibold text-xl">
            <span>✅</span> Solve 5 math problems 
          </li>
          <li className="flex items-center gap-4 border border-[#0e7c66] rounded-md p-2 font-semibold text-xl">
            <span>✅</span> Read 20 pages of a book 
          </li>
          <li className="flex items-center gap-4 border border-[#0e7c66] rounded-md p-2 font-semibold text-xl line-through">
            <span>❌</span> Write a journal entry 
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Banner;
