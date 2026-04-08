"use client";

import { useEffect, useState } from "react";
import { authConfig } from "@/config/auth.config";
import { cookie } from "@/lib/cookie";
import { useRunnerTracking } from "@/hooks/useRunnerTracking";

type LiveOperationSocketProps = {
  /** Backend runner id to join and filter location updates. */
  runnerId?: string;
};

export default function LiveOperationSocket({
  runnerId="",
}: LiveOperationSocketProps) {
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(cookie.get(authConfig.cookieName) ?? "");
  }, []);

  const { connected, location, error } = useRunnerTracking(token, runnerId);

  const hasCredentials = Boolean(token && runnerId);


  console.log("Connected:", connected);
  console.log("Location:", location);
  console.log("Error:", error);

  return (
    <div className="w-full rounded-2xl border border-[#EDEDED] bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-bold text-[#1E293B]">
        Runner live tracking
      </h2>

      {!token && (
        <p className="text-sm text-[#64748B]">
          Sign in to connect the runner socket.
        </p>
      )}

      {token && !runnerId && (
        <p className="text-sm text-amber-700">
          Pass a <code className="rounded bg-amber-50 px-1">runnerId</code> prop
          to subscribe to a runner&apos;s location.
        </p>
      )}

      {hasCredentials && (
        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-[#64748B]">Socket:</span>
            <span
              className={
                connected ? "font-medium text-emerald-600" : "text-[#94A3B8]"
              }
            >
              {connected ? "Connected" : "Disconnected"}
            </span>
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-red-800">{error}</p>
          )}

          {location && (
            <div className="rounded-lg bg-slate-50 px-3 py-2 text-[#334155]">
              <p className="font-medium text-[#1E293B]">Last location</p>
              <p>
                lat {location.lat.toFixed(6)}, lng {location.lng.toFixed(6)}
              </p>
            </div>
          )}

          {connected && !location && !error && (
            <p className="text-[#64748B]">Waiting for location updates…</p>
          )}
        </div>
      )}
    </div>
  );
}
