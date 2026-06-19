import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import Nanobot from "./Nanobot";

const palette = ["#FFE98A", "#FFBC6A", "#DDF0A5", "#FFD76A", "#FFF4D2", "#F7E39B"];

function seededUnit(seed) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function betweenFromSeed(seed, min, max) {
  return seededUnit(seed) * (max - min) + min;
}

function randomPoint(seedX, seedY, width, height) {
  return {
    x: betweenFromSeed(seedX, 40, Math.max(width - 40, 80)),
    y: betweenFromSeed(seedY, 80, Math.max(height - 80, 160)),
  };
}

function makeWanderPath(width, height, seed) {
  const path = Array.from({ length: 5 }).map((_, i) =>
    randomPoint(seed * 17 + i * 3.1, seed * 23 + i * 5.7, width, height),
  );
  path.push(path[0]);
  return { path, times: undefined };
}

function makeClimberPath(width, height, seed, cardCenters) {
  const card =
    cardCenters[Math.floor(seededUnit(seed * 29) * cardCenters.length) % cardCenters.length];

  const p0 = randomPoint(seed * 11, seed * 13, width, height);
  const p2 = randomPoint(seed * 19, seed * 31, width, height);
  const p3 = randomPoint(seed * 37, seed * 41, width, height);

  const path = [p0, card, card, p2, p3, p0];
  const times = [0, 0.2, 0.4, 0.55, 0.8, 1];
  return { path, times };
}

function readDocumentBounds() {
  if (typeof document === "undefined") {
    return { width: 1200, height: 900 };
  }
  return {
    width: document.documentElement.scrollWidth,
    height: document.documentElement.scrollHeight,
  };
}

function readCardCenters() {
  if (typeof document === "undefined") return [];
  const els = Array.from(document.querySelectorAll('[data-nanobot-target="card"]'));
  return els.map((el) => {
    const rect = el.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2 + window.scrollX,
      y: rect.top + rect.height / 2 + window.scrollY,
    };
  });
}

const FOLLOW_RADIUS = 180;
const MAX_PULL = 55;
const DAMPING = 0.12;
const CELEBRATE_RADIUS = 260;
const GATHER_GROUP_SIZE = 5;
const GATHER_HOLD_MS = 2600;

function WanderingBot({ bot, mouseRef, celebration, gather, positionsRef }) {
  const [facing, setFacing] = useState("right");
  const [isWalking, setIsWalking] = useState(true);
  const [bounceKey, setBounceKey] = useState(0);
  const [override, setOverride] = useState(null);

  const lastCelebrationId = useRef(null);
  const lastGatherId = useRef(null);
  const overrideRef = useRef(null);
  const posRef = useRef({ x: bot.path[0].x, y: bot.path[0].y });
  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);

  useEffect(() => {
    if (!celebration || celebration.id === lastCelebrationId.current) return;
    lastCelebrationId.current = celebration.id;

    const dist = Math.hypot(
      celebration.x - posRef.current.x,
      celebration.y - posRef.current.y,
    );
    if (dist < CELEBRATE_RADIUS) {
      setBounceKey((k) => k + 1);
    }
  }, [celebration]);

  useEffect(() => {
    if (!gather || gather.id === lastGatherId.current) return;
    if (!gather.botIds.includes(bot.id)) return;
    lastGatherId.current = gather.id;

    const stackIndex = gather.botIds.indexOf(bot.id);
    const target = {
      x: gather.target.x,
      y: gather.target.y - stackIndex * bot.size * 0.55,
    };

    overrideRef.current = target;
    const enterTimer = setTimeout(() => {
      setOverride({ ...target, stackIndex });
    }, 0);

    const releaseTimer = setTimeout(() => {
      overrideRef.current = null;
      setOverride(null);
    }, GATHER_HOLD_MS + stackIndex * 150);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(releaseTimer);
    };
  }, [gather, bot.id, bot.size]);

  function handleUpdate(latest) {
    const { x, y } = latest;
    const prev = posRef.current;

    if (x > prev.x + 0.5) setFacing("right");
    else if (x < prev.x - 0.5) setFacing("left");

    const moving = Math.hypot(x - prev.x, y - prev.y) > 0.05;
    setIsWalking((was) => (was === moving ? was : moving));

    posRef.current = { x, y };
    if (positionsRef) positionsRef.current[bot.id] = { x, y };

    if (overrideRef.current) {
      offsetX.set(0);
      offsetY.set(0);
      return;
    }

    const mouse = mouseRef.current;
    const dx = mouse.x - x;
    const dy = mouse.y - y;
    const dist = Math.hypot(dx, dy);

    let targetX = 0;
    let targetY = 0;
    if (dist > 0 && dist < FOLLOW_RADIUS) {
      const pull = MAX_PULL * (1 - dist / FOLLOW_RADIUS);
      targetX = (dx / dist) * pull;
      targetY = (dy / dist) * pull;
    }

    offsetX.set(offsetX.get() + (targetX - offsetX.get()) * DAMPING);
    offsetY.set(offsetY.get() + (targetY - offsetY.get()) * DAMPING);
  }

  return (
    <motion.div
      className="pointer-events-none absolute"
      style={{ zIndex: override ? 50 + (override.stackIndex ?? 0) : 1 }}
      animate={
        override
          ? { x: override.x, y: override.y }
          : { x: bot.path.map((p) => p.x), y: bot.path.map((p) => p.y) }
      }
      transition={
        override
          ? { duration: 0.8, ease: "easeInOut" }
          : {
              duration: bot.duration,
              delay: bot.delay,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
              times: bot.times,
            }
      }
      onUpdate={handleUpdate}
    >
      <motion.div style={{ x: offsetX, y: offsetY }}>
        <motion.div
          key={bounceKey}
          initial={{ y: 0, rotate: 0 }}
          animate={bounceKey > 0 ? { y: [0, -26, 0], rotate: [0, -8, 8, 0] } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Nanobot
            color={bot.color}
            size={bot.size}
            speed={bot.speed}
            facing={facing}
            isWalking={isWalking}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function NanobotWorld({ count = 24 }) {
  const [bounds, setBounds] = useState(null);
  const [bots, setBots] = useState(null);
  const [celebration, setCelebration] = useState(null);
  const [gather, setGather] = useState(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const positionsRef = useRef({});
  const celebrationIdRef = useRef(0);
  const gatherIdRef = useRef(0);

  useEffect(() => {
    function handleMove(e) {
      mouseRef.current = { x: e.clientX + window.scrollX, y: e.clientY + window.scrollY };
    }
    function handleLeave() {
      mouseRef.current = { x: -9999, y: -9999 };
    }
    window.addEventListener("pointermove", handleMove, { passive: true });
    document.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  useEffect(() => {
    function handleCelebrate(e) {
      celebrationIdRef.current += 1;
      setCelebration({ id: celebrationIdRef.current, x: e.detail.x, y: e.detail.y });
    }
    window.addEventListener("nanobot-celebrate", handleCelebrate);
    return () => window.removeEventListener("nanobot-celebrate", handleCelebrate);
  }, []);

  useEffect(() => {
    function handleGather(e) {
      if (!bots) return;
      const target = { x: e.detail.x, y: e.detail.y };

      const withDist = bots.map((b) => {
        const p = positionsRef.current[b.id] || target;
        return { id: b.id, dist: Math.hypot(p.x - target.x, p.y - target.y) };
      });
      withDist.sort((a, b) => a.dist - b.dist);
      const botIds = withDist.slice(0, GATHER_GROUP_SIZE).map((b) => b.id);

      gatherIdRef.current += 1;
      setGather({ id: gatherIdRef.current, target, botIds });
    }
    window.addEventListener("nanobot-gather", handleGather);
    return () => window.removeEventListener("nanobot-gather", handleGather);
  }, [bots]);

  useEffect(() => {
    function measure() {
      setBounds(readDocumentBounds());
    }
    measure();

    const settleTimer = setTimeout(() => {
      const settled = readDocumentBounds();
      const cardCenters = readCardCenters();
      setBounds(settled);

      setBots((prev) => {
        if (prev) return prev;
        return Array.from({ length: count }).map((_, i) => {
          const seed = i + 1;
          const isClimber = cardCenters.length > 0 && i % 3 === 0;
          const { path, times } = isClimber
            ? makeClimberPath(settled.width, settled.height, seed, cardCenters)
            : makeWanderPath(settled.width, settled.height, seed);

          return {
            id: i,
            color: palette[i % palette.length],
            size: betweenFromSeed(seed * 2.3, 36, 56),
            speed: betweenFromSeed(seed * 3.7, 0.7, 1.4),
            duration: betweenFromSeed(seed * 4.9, 14, 26),
            delay: betweenFromSeed(seed * 6.1, 0, 6),
            path,
            times,
          };
        });
      });
    }, 500);

    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(settleTimer);
      window.removeEventListener("resize", measure);
    };
  }, [count]);

  if (!bots || !bounds) return null;

  return (
    <div
      className="pointer-events-none absolute left-0 top-0 z-20"
      style={{ width: bounds.width, height: bounds.height }}
      aria-hidden="true"
    >
      {bots.map((bot) => (
        <WanderingBot
          key={bot.id}
          bot={bot}
          mouseRef={mouseRef}
          celebration={celebration}
          gather={gather}
          positionsRef={positionsRef}
        />
      ))}
    </div>
  );
}
