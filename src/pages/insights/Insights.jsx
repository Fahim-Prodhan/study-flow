import { useEffect, useState } from "react";
import {
  FiCheckCircle,
  FiClock,
  FiList,
  FiTrendingUp,
} from "react-icons/fi";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const Insights = () => {
  const [stats, setStats] = useState({
    totalTasks: 0,
    completed: 0,
    pending: 0,
    streak: 0,
    focusHours: 0,
  });

  const [weeklyStats, setWeeklyStats] = useState([]);
  const [subjectStats, setSubjectStats] = useState([]);

  const [loading, setLoading] = useState(true);
  const [weeklyLoading, setWeeklyLoading] = useState(true);
  const [subjectLoading, setSubjectLoading] = useState(true);

  // Fetch overview stats
  useEffect(() => {
    fetch("/api/stats/overview", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch stats");
        }

        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setStats(data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching overview stats:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Fetch weekly stats
  useEffect(() => {
    fetch("/api/stats/weekly", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch weekly stats");
        }

        return res.json();
      })
      .then((data) => {
        if (data.success) {
          const formattedData = data.data.map((item) => {
            const percentage =
              item.total > 0
                ? Math.round((item.completed / item.total) * 100)
                : 0;

            return {
              ...item,
              day: new Date(item.date).toLocaleDateString("en-US", {
                weekday: "short",
              }),
              percentage,
            };
          });

          setWeeklyStats(formattedData);
        }
      })
      .catch((error) => {
        console.error("Error fetching weekly stats:", error);
      })
      .finally(() => {
        setWeeklyLoading(false);
      });
  }, []);

  // Fetch subject stats
  useEffect(() => {
    fetch("/api/stats/by-subject", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch subject stats");
        }

        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setSubjectStats(data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching subject stats:", error);
      })
      .finally(() => {
        setSubjectLoading(false);
      });
  }, []);

  const statCards = [
    {
      title: "Tasks",
      value: `${stats.totalTasks}`,
      icon: FiList,
    },
    {
      title: "Completed",
      value: stats.completed,
      icon: FiCheckCircle,
    },
    {
      title: "Pending",
      value: stats.pending,
      icon: FiClock,
    },
    {
      title: "Focus Hours",
      value: `${stats.focusHours}h`,
      icon: FiTrendingUp,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-medium">Insights</h1>

        <p className="text-base-content/60">
          A quick look at how your studying has been going.
        </p>
      </div>

      {/* ================= STAT CARDS ================= */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="card border border-base-300 bg-base-100 shadow-sm"
            >
              <div className="card-body">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon size={23} />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-base-content/60">
                      {stat.title}
                    </p>

                    {loading ? (
                      <div className="skeleton mt-1 h-8 w-16" />
                    ) : (
                      <h2 className="text-2xl font-semibold">
                        {stat.value}
                      </h2>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ================= BAR + LINE CHART ================= */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* BAR CHART */}
        <div className="card border border-base-300 bg-base-100 shadow-sm">
          <div className="card-body">
            <div className="mb-4">
              <h2 className="text-lg font-semibold">
                Weekly Task Activity
              </h2>

              <p className="text-sm text-base-content/60">
                Your task activity over the last 7 days.
              </p>
            </div>

            {weeklyLoading ? (
              <div className="flex h-[320px] items-center justify-center">
                <span className="loading loading-spinner loading-md text-primary" />
              </div>
            ) : weeklyStats.length > 0 ? (
              <div className="h-[320px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={weeklyStats}
                    margin={{
                      top: 10,
                      right: 10,
                      left: -10,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                    />

                    <XAxis
                      dataKey="day"
                      tickLine={false}
                      axisLine={false}
                    />

                    <YAxis
                      allowDecimals={false}
                      tickLine={false}
                      axisLine={false}
                    />

                    <Tooltip cursor={{ opacity: 0.1 }} />

                    <Legend />

                    <Bar
                      dataKey="total"
                      name="Total Tasks"
                      radius={[5, 5, 0, 0]}
                    />

                    <Bar
                      dataKey="completed"
                      name="Completed"
                      radius={[5, 5, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex h-[320px] items-center justify-center">
                <p className="text-sm text-base-content/50">
                  No weekly data available.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* LINE CHART */}
        <div className="card border border-base-300 bg-base-100 shadow-sm">
          <div className="card-body">
            <div className="mb-4">
              <h2 className="text-lg font-semibold">
                Weekly Completion
              </h2>

              <p className="text-sm text-base-content/60">
                Your task completion percentage over the week.
              </p>
            </div>

            {weeklyLoading ? (
              <div className="flex h-[320px] items-center justify-center">
                <span className="loading loading-spinner loading-md text-primary" />
              </div>
            ) : weeklyStats.length > 0 ? (
              <div className="h-[320px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={weeklyStats}
                    margin={{
                      top: 10,
                      right: 10,
                      left: 0,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                    />

                    <XAxis
                      dataKey="day"
                      tickLine={false}
                      axisLine={false}
                    />

                    <YAxis
                      domain={[0, 100]}
                      ticks={[0, 25, 50, 75, 100]}
                      tickFormatter={(value) => `${value}%`}
                      tickLine={false}
                      axisLine={false}
                    />

                    <Tooltip
                      formatter={(value) => [
                        `${value}%`,
                        "Completion",
                      ]}
                    />

                    <Legend />

                    <Line
                      type="monotone"
                      dataKey="percentage"
                      name="Completion"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex h-[320px] items-center justify-center">
                <p className="text-sm text-base-content/50">
                  No weekly data available.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ================= SUBJECT PROGRESS ================= */}
      <div className="card border border-base-300 bg-base-100 shadow-sm">
        <div className="card-body">
          <div className="mb-5">
            <h2 className="text-lg font-semibold">
              Subject Progress
            </h2>

            <p className="text-sm text-base-content/60">
              Your progress across each subject.
            </p>
          </div>

          {subjectLoading ? (
            <div className="space-y-5">
              {[1, 2, 3].map((item) => (
                <div key={item}>
                  <div className="skeleton mb-2 h-5 w-32" />
                  <div className="skeleton h-3 w-full" />
                </div>
              ))}
            </div>
          ) : subjectStats.length > 0 ? (
            <div className="space-y-6">
              {subjectStats.map((subject) => {
                const progress =
                  subject.total > 0
                    ? Math.round(
                        (subject.completed / subject.total) * 100
                      )
                    : 0;

                return (
                  <div key={subject.subject}>
                    {/* Subject name + percentage */}
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className="h-3 w-3 rounded-full"
                          style={{
                            backgroundColor: subject.color,
                          }}
                        />

                        <span className="font-medium">
                          {subject.name}
                        </span>
                      </div>

                      <span className="text-sm text-base-content/60">
                        {subject.completed}/{subject.total}{" "}
                        <span className="ml-2 font-medium">
                          {progress}%
                        </span>
                      </span>
                    </div>

                    {/* Full width progress bar */}
                    <div className="h-3 w-full overflow-hidden rounded-full bg-base-200">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${progress}%`,
                          backgroundColor: subject.color,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex h-32 items-center justify-center">
              <p className="text-sm text-base-content/50">
                No subject data available.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Insights;