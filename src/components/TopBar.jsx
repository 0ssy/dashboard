import { HiOutlineMenuAlt2 } from "react-icons/hi";

export default function TopBar({ onMenuClick }) {
  function dispatchAt(eventName, e) {
    window.dispatchEvent(
      new CustomEvent(eventName, {
        detail: { x: e.clientX + window.scrollX, y: e.clientY + window.scrollY },
      }),
    );
  }

  function handleAvatarClick(e) {
    dispatchAt("nanobot-celebrate", e);
  }

  function handleGatherClick(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    window.dispatchEvent(
      new CustomEvent("nanobot-gather", {
        detail: {
          x: rect.left + rect.width / 2 + window.scrollX,
          y: rect.top + rect.height / 2 + window.scrollY,
        },
      }),
    );
  }

  return (
    <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-black md:hidden"
        >
          <HiOutlineMenuAlt2 size={20} />
        </button>

        <div>
          <h1 className="text-2xl font-extrabold">Overview</h1>
          <p className="text-gray-600">Welcome back.</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          onClick={handleGatherClick}
          className="whitespace-nowrap rounded-2xl border-4 border-black bg-[#CDE990] px-4 py-3 font-semibold transition-colors hover:bg-black hover:text-[#CDE990]"
        >
          Gather Team
        </button>

        <input
          placeholder="Search..."
          className="w-36 rounded-2xl border-4 border-black bg-white px-4 py-3 outline-none sm:w-64"
        />
        <div
          onClick={handleAvatarClick}
          className="h-12 w-12 shrink-0 cursor-pointer rounded-2xl border-4 border-black bg-[#FFD56B]"
        />
      </div>
    </div>
  );
}