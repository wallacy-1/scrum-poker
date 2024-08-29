import socket from "../../../services/scrum-poker/webSocketService";
import { PlayerRolesEnum, RoomStatusEnum } from "../interfaces";

export function createMockRoom(numPlayers: number): any {
  const createMockPlayer = (index: number): any => ({
    id: index === 0 ? socket.id : index,
    // id: index,
    name: `Player ${index + 1}`,
    canVote: Math.random() > 0.5,
    choice: Math.random() > 0.5 ? true : false,
    // previousChoiceBeforeAdminChange: Math.random() > 0.5 ? true : false,
    role: index === 0 ? PlayerRolesEnum.ADMIN : PlayerRolesEnum.COMMON,
  });

  const players = [];
  for (let i = 0; i < numPlayers; i++) {
    const player = createMockPlayer(i);
    players.push(player);
  }

  return {
    id: "yy",
    status: RoomStatusEnum.VOTING,
    players: players,
  };
}
