import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineHome,
  HiOutlineChartBar,
  HiOutlineClipboardList,
  HiOutlineUserGroup,
  HiOutlineCog,
  HiOutlineMenuAlt2,
  HiOutlineX,
} from "react-icons/hi";

const links = [
  { label: "Home", icon: HiOutlineHome },
  { label: "Analytics", icon: HiOutlineChartBar },
  { label: "Tasks", icon: HiOutlineClipboardList },
  { label: "Clients", icon: HiOutlineUserGroup },
  { label: "Settings", icon: HiOutlineCog },
];

export default function Sidebar({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}) {
  const fullWidth = collapsed && !mobileOpen;

  return (
    <>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-30 bg-black/40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ width: fullWidth ? 84 : 250 }}
        className={`
          fixed md:static top-0 left-0 h-screen z-40
          bg-[#FFF3B0] border-r-4 border-black
          flex flex-col p-6 overflow-hidden
          transition-transform duration-300
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="mb-10 flex items-center justify-between">
          {!fullWidth && (
            <h1 className="whitespace-nowrap text-xl font-extrabold">Dashboard</h1>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-xl border-2 border-black transition-colors hover:bg-black hover:text-[#FFF3B0] md:flex"
          >
            <HiOutlineMenuAlt2 size={18} />
          </button>

          <button
            onClick={() => setMobileOpen(false)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border-2 border-black md:hidden"
          >
            <HiOutlineX size={18} />
          </button>
        </div>

        <nav className="flex flex-col gap-3">
          {links.map(({ label, icon: Icon }) => (
            <a
              key={label}
              href="#"
              className="flex items-center gap-3 whitespace-nowrap rounded-xl px-3 py-3 font-semibold transition-colors hover:bg-black hover:text-[#FFF3B0]"
            >
              <Icon size={20} className="shrink-0" />
              {!fullWidth && <span>{label}</span>}
            </a>
          ))}
        </nav>
      </motion.aside>
    </>
  );
}
