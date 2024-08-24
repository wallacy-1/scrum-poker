import { PlayerDataInterface } from "../pages/room/interfaces";
import socket from "../services/scrum-poker/webSocketService";

export function getMainPlayer(
  players?: PlayerDataInterface[]
): PlayerDataInterface | null {
  const id = socket.id;

  if (!id || !players || players.length === 0) return null;

  const player = players.find((player) => player.id === id);

  return player ?? null;
}
