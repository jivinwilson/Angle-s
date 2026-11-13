"use client";

import { useEffect, useRef, useState } from "react";

function capable() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  const nav = navigator as Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };
  if (nav.connection?.saveData) return false;
  if (nav.deviceMemory !== undefined && nav.deviceMemory < 4) return false;
  try {
    return !!document.createElement("canvas").getContext("webgl2");
  } catch {
    return false;
  }
}

export function SilkCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!capable()) return;
    let stop: (() => void) | undefined;
    let cancelled = false;
    const idle = window.requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 200));
    idle(() => {
      import("./silk").then(({ startSilk }) => {
        if (cancelled || !ref.current) return;
        stop = startSilk(ref.current, () => setReady(true));
      });
    });
    return () => {
      cancelled = true;
      stop?.();
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={`absolute inset-0 size-full transition-opacity duration-[2000ms] ${ready ? "opacity-100" : "opacity-0"}`} />;
}
