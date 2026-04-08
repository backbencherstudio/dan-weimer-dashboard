import { io, Socket } from "socket.io-client";

const runnerBaseUrl = process.env.NEXT_PUBLIC_API_URL2 || "https://wall-charleston-carolina-exercise.trycloudflare.com";

export function createRunnerSocket(token: string): Socket {
  return io(`${runnerBaseUrl}/runner`, {
    transports: ["websocket"],
    auth: { token },
    withCredentials: true,
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 1000,
  });
}
