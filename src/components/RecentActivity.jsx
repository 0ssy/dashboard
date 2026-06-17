const activity = [
  {
    name: "Sarah Lin",
    action: "Closed deal with Acme Co.",
    time: "2m ago",
    status: "Completed",
  },
  {
    name: "James Otieno",
    action: "Created new task: Q3 Report",
    time: "18m ago",
    status: "In Progress",
  },
  {
    name: "Priya Shah",
    action: "Updated client profile",
    time: "1h ago",
    status: "Completed",
  },
  {
    name: "Tom Becker",
    action: "Uploaded invoice #2291",
    time: "3h ago",
    status: "Pending",
  },
  {
    name: "Aisha Bello",
    action: "Scheduled meeting with Nova Inc.",
    time: "5h ago",
    status: "Completed",
  },
];

const statusColor = {
  Completed: "#CDE990",
  "In Progress": "#FFD56B",
  Pending: "#FFB37A",
};

export default function RecentActivity() {
  return (
    <section className="mt-8 rounded-[25px] border-4 border-black bg-white p-6">
      <h2 className="mb-4 text-xl font-extrabold">Recent Activity</h2>

      <div className="overflow-x-auto">
        <table className="min-w-[700px] w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="text-left">
              <th className="pb-2 pr-4">Name</th>
              <th className="pb-2 pr-4">Action</th>
              <th className="pb-2 pr-4">Time</th>
              <th className="pb-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {activity.map((row, i) => (
              <tr key={`${row.name}-${i}`} className="align-middle">
                <td className="rounded-l-xl border-y-2 border-l-2 border-black bg-[#FFF9E8] px-4 py-3 font-semibold">
                  {row.name}
                </td>
                <td className="border-y-2 border-black bg-[#FFF9E8] px-4 py-3">
                  {row.action}
                </td>
                <td className="border-y-2 border-black bg-[#FFF9E8] px-4 py-3">
                  {row.time}
                </td>
                <td className="rounded-r-xl border-y-2 border-r-2 border-black bg-[#FFF9E8] px-4 py-3">
                  <span
                    className="inline-flex rounded-full border-2 border-black px-3 py-1 text-sm font-semibold"
                    style={{ background: statusColor[row.status] }}
                  >
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
