import { useEffect, useState } from "react";

const TOTAL_TIME = 25 * 60;

const Focus = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [isRunning, setIsRunning] = useState(false);

  // Fetch tasks
  useEffect(() => {
    fetch("/api/tasks", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch tasks");
        }

        return res.json();
      })
      .then((data) => {
        console.log(data);

        const taskData = data.data || [];

        setTasks(taskData);

        // Select first task by default
        // if (taskData.length > 0) {
        //   setSelectedTask(taskData[0]);
        // }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Timer
  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning]);

  // Format MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  // Progress percentage
  const progress = (timeLeft / TOTAL_TIME) * 100;

  // Start / Pause
  const handleStartPause = () => {
    if (timeLeft === 0) return;

    setIsRunning((prev) => !prev);
  };

  // Reset
  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(TOTAL_TIME);
  };

  // Select task
  const handleSelectTask = (task) => {
    setSelectedTask(task);

    // Reset timer when changing task
    setIsRunning(false);
    setTimeLeft(TOTAL_TIME);
  };

  // Check if task is selected
  const isTaskSelected = (task) => {
    if (!selectedTask) return false;

    // If API has _id
    if (task._id && selectedTask._id) {
      return task._id === selectedTask._id;
    }

    // If API has id
    if (task.id && selectedTask.id) {
      return task.id === selectedTask.id;
    }

    // Fallback: compare object reference
    return task === selectedTask;
  };

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl font-medium">Focus</h1>

        <p className="text-base-content/60">
          One task, one timer, zero distractions.
        </p>
      </div>

      {/* ================= MAIN FOCUS AREA ================= */}
      <div className="flex h-[70vh] min-h-0 flex-col gap-6 lg:flex-row">
        {/* ================= TIMER 60% ================= */}
        <div className="min-h-0 w-full lg:w-[60%]">
          <div className="card h-full border border-base-300 bg-base-100 shadow-sm">
            <div className="card-body min-h-0 items-center justify-center overflow-hidden py-6 text-center">
              {/* Status Badge */}
              <div className="badge badge-primary badge-outline mb-3">
                {isRunning
                  ? "Focus Session"
                  : timeLeft === 0
                  ? "Session Complete"
                  : "Ready to Focus"}
              </div>

              {/* ================= CIRCULAR TIMER ================= */}
              <div
                className="radial-progress text-primary transition-all duration-300"
                style={{
                  "--value": progress,
                  "--size": "15rem",
                  "--thickness": "9px",
                }}
                role="progressbar"
                aria-valuenow={Math.round(progress)}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <div className="flex flex-col items-center">
                  <span className="text-5xl font-semibold tabular-nums tracking-tight">
                    {formatTime(timeLeft)}
                  </span>

                  <span className="mt-2 text-xs text-base-content/50">
                    {Math.round(progress)}% remaining
                  </span>
                </div>
              </div>

              {/* Status Text */}
              <p className="mt-4 text-sm text-base-content/60">
                {isRunning
                  ? "Stay focused. You're doing great!"
                  : timeLeft === 0
                  ? "Session complete! Great work."
                  : "Ready when you are."}
              </p>

              {/* ================= CONTROLS ================= */}
              <div className="mt-4 flex items-center gap-3">
                <button
                  onClick={handleStartPause}
                  disabled={timeLeft === 0}
                  className="btn btn-primary min-w-28"
                >
                  {isRunning ? "Pause" : "Start"}
                </button>

                <button
                  onClick={handleReset}
                  className="btn btn-outline min-w-28"
                >
                  Reset
                </button>
              </div>

              {/* ================= CURRENT TASK ================= */}
              <div className="mt-5 w-full rounded-xl bg-base-200 p-4 text-left">
                <p className="text-xs font-semibold uppercase tracking-wider text-base-content/50">
                  Current Task
                </p>

                {selectedTask ? (
                  <>
                    <h3 className="mt-2 text-lg font-semibold">
                      {selectedTask.title}
                    </h3>

                    <p className="mt-1 text-sm text-base-content/60">
                      {selectedTask.subject?.name || "No subject"}
                    </p>
                  </>
                ) : (
                  <p className="mt-2 text-sm text-base-content/60">
                    Select a task from the list to get started.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ================= TASKS 40% ================= */}
        <div className="min-h-0 w-full lg:w-[40%]">
          <div className="card h-full border border-base-300 bg-base-100 shadow-sm">
            <div className="card-body min-h-0">
              {/* Tasks Header */}
              <div className="shrink-0">
                <h2 className="text-lg font-semibold">
                  Your Tasks
                </h2>

                <p className="text-sm text-base-content/60">
                  Choose one task to focus on.
                </p>
              </div>

              {/* ================= TASK LIST ================= */}
              <div className="mt-3 min-h-0 flex-1 space-y-3 overflow-y-auto pr-1">
                {tasks.length > 0 ? (
                  tasks.map((task, index) => {
                    const selected = isTaskSelected(task);

                    return (
                      <button
                        key={task._id || task.id || index}
                        onClick={() => handleSelectTask(task)}
                        className={`w-full rounded-xl border p-4 text-left transition-all ${
                          selected
                            ? "border-primary bg-primary/10"
                            : "border-base-300 hover:border-primary/50 hover:bg-base-200"
                        }`}
                      >
                        <h3 className="font-medium">
                          {task.title}
                        </h3>

                        <p className="mt-1 text-sm text-base-content/60">
                          {task.subject?.name || "No subject"}
                        </p>

                        {selected && (
                          <span className="mt-2 inline-block text-xs font-medium text-primary">
                            Selected
                          </span>
                        )}
                      </button>
                    );
                  })
                ) : (
                  <p className="py-6 text-center text-sm text-base-content/60">
                    No tasks available.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Focus;