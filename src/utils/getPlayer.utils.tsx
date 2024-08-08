import socket from "../services/scrum-poker/webSocketService";

export function getPlayer(participants: any[]) {
  const id = socket.id;

  if (!id || participants.length === 0) return {};

  const player = participants.find((participant) => participant.id === id);

  return player ?? {};
}
