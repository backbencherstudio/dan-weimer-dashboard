import { useEffect, useRef, useState } from "react";
import type { Socket } from "socket.io-client";
import { createRunnerSocket } from "@/lib/socket";

export type RunnerLocationPayload = {
  success: boolean;
  message: string;
  data: {
    runner_id: string;
    availability: "ONLINE" | "OFFLINE" | "BUSY";
    location: { lat: number; lng: number };
  };
};

export function useRunnerTracking(token: string, runnerId: string) {
  const socketRef = useRef<Socket | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!token || !runnerId) return;

    const socket = createRunnerSocket(token);
    socketRef.current = socket;

    socket.on("connect", () => {
      setConnected(true);
      setError("");
      socket.emit("runner.join_room", { runner_id: runnerId });
    });

    socket.on("disconnect", () => {
      setConnected(false);
    });

    socket.on("joined_runner_room", () => {
      // optional: toast / log
    });

    socket.on("runner.location.updated", (payload: RunnerLocationPayload) => {
      if (payload?.data?.runner_id === runnerId) {
        setLocation(payload.data.location);
      }
    });

    socket.on("runner.error", (payload: { message?: string }) => {
      setError(payload?.message ?? "Socket error");
    });

    socket.on("connect_error", (err) => {
      setError(err.message || "Connection failed");
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("joined_runner_room");
      socket.off("runner.location.updated");
      socket.off("runner.error");
      socket.off("connect_error");
      socket.disconnect();
      socketRef.current = null;
    };
  }, [token, runnerId]);

  return { connected, location, error };
}
