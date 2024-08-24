export enum RoomStatusEnum {
  REVEAL = "REVEAL",
  VOTING = "VOTING",
}

export interface RoomDataInterface {
  id: string;
  status: RoomStatusEnum;
  players: PlayerDataInterface[];
}

export enum PlayerRolesEnum {
  ADMIN = "ADMIN",
  OBSERVER = "OBSERVER",
  COMMON = "COMMON",
}

export interface PlayerDataInterface {
  id: string;
  name: string;
  role: PlayerRolesEnum;
  choice: boolean;
}
