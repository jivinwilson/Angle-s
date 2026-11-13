"use client";

import { useEffect, useState } from "react";
import { isCallOpen, telUrl } from "@/lib/contact";
import { PhoneIcon } from "./icons";

export function useCallOpen() {
  const [open, setOpen] = useState(true);
  useEffect(() => {
    const tick = () => setOpen(isCallOpen());
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);
  return open;
}

export function CallLink({ label, closedLabel, className = "" }: { label: string; closedLabel: string; className?: string }) {
  const open = useCallOpen();
  if (!open) return <p className="self-center text-sm opacity-75">{closedLabel}</p>;
  return (
    <a href={telUrl} className={className} data-track="call">
      <PhoneIcon className="size-[1.1rem]" />
      {label}
    </a>
  );
}
