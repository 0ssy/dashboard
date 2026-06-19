import { useId, useMemo } from "react";
import { motion } from "framer-motion";

export default function Nanobot({
  color = "#FFD76A",
  size = 50,
  isWalking = true,
  facing = "right",
  speed = 1,
}) {
  const id = useId();
  const flip = facing === "left" ? -1 : 1;
  const seed = useMemo(
    () => [...id].reduce((acc, ch) => (acc * 31 + ch.charCodeAt(0)) % 9973, 7),
    [id],
  );
  const blinkDelay = (seed % 17) * 0.1;
  const blinkDuration = 2.2 + ((seed % 11) * 0.14);
  const legDuration = Math.max(0.3, 0.7 / Math.max(speed, 0.1));

  return (
    <div
      className="relative inline-flex items-end justify-center"
      style={{ width: size, height: size * 1.4, transform: `scaleX(${flip})` }}
    >
      {/* legs */}
      <motion.div
        className="absolute rounded-full border-2 border-black bg-black"
        style={{
          width: Math.max(4, size * 0.12),
          height: Math.max(14, size * 0.38),
          left: size * 0.3,
          bottom: 0,
          transformOrigin: "top center",
        }}
        animate={{ rotate: isWalking ? [16, -16, 16] : 0 }}
        transition={{ duration: legDuration, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full border-2 border-black bg-black"
        style={{
          width: Math.max(4, size * 0.12),
          height: Math.max(14, size * 0.38),
          left: size * 0.58,
          bottom: 0,
          transformOrigin: "top center",
        }}
        animate={{ rotate: isWalking ? [-16, 16, -16] : 0 }}
        transition={{ duration: legDuration, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* body */}
      <div
        className="relative rounded-lg border-[3px] border-black"
        style={{
          width: size,
          height: size,
          background: color,
          marginBottom: size * 0.22,
        }}
      />

      {/* eyes (blink) */}
      <motion.span
        className="absolute rounded-full bg-black"
        style={{
          width: Math.max(5, size * 0.13),
          height: Math.max(5, size * 0.13),
          top: size * 0.36,
          left: size * 0.26,
          transformOrigin: "center center",
        }}
        animate={{ scaleY: [1, 1, 0.08, 1] }}
        transition={{
          duration: blinkDuration,
          repeat: Infinity,
          ease: "linear",
          delay: blinkDelay,
          times: [0, 0.8, 0.86, 1],
        }}
      />
      <motion.span
        className="absolute rounded-full bg-black"
        style={{
          width: Math.max(5, size * 0.13),
          height: Math.max(5, size * 0.13),
          top: size * 0.36,
          left: size * 0.6,
          transformOrigin: "center center",
        }}
        animate={{ scaleY: [1, 1, 0.08, 1] }}
        transition={{
          duration: blinkDuration + 0.15,
          repeat: Infinity,
          ease: "linear",
          delay: blinkDelay + 0.05,
          times: [0, 0.8, 0.86, 1],
        }}
      />

      {/* smile */}
      <div
        className="absolute rounded-b-full border-b-[3px] border-black"
        style={{
          width: size * 0.3,
          height: size * 0.16,
          top: size * 0.58,
          left: size * 0.35,
        }}
      />
    </div>
  );
}
