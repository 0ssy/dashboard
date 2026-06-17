import { motion } from "framer-motion";

export default function StatCard({ title, value, color, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className="w-full rounded-[25px] border-4 border-black p-6"
      style={{ background: color }}
    >
      <h2 className="text-base font-semibold">{title}</h2>
      <h1 className="mt-3 text-3xl font-extrabold">{value}</h1>
    </motion.div>
  );
}