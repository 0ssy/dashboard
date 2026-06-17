import TopBar from "../components/TopBar";
import StatCard from "../components/StatCard";
import RevenueChart from "../components/RevenueChart";
import RecentActivity from "../components/RecentActivity";

const stats = [
  { title: "Revenue", value: "$12,400", color: "#CDE990" },
  { title: "Users", value: "532", color: "#FFD56B" },
  { title: "Tasks", value: "28", color: "#FFB37A" },
  { title: "Clients", value: "17", color: "#FFF3B0" },
];

export default function Dashboard({ onMenuClick }) {
  return (
    <div className="w-full flex-1 p-6 md:p-10">
      <TopBar onMenuClick={onMenuClick} />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s, i) => (
          <StatCard key={s.title} {...s} index={i} />
        ))}
      </div>

      <RevenueChart />
      <RecentActivity />
    </div>
  );
}
