export enum RoomStatusEnum {
  REVEAL = "REVEAL",
  VOTING = "VOTING",
}

export interface RoomDataInterface {
  id: string;
  status: RoomStatusEnum;
  players: PlayerDataInterface[];
  minChoice?: number;
  maxChoice?: number;
  averageChoice?: number;
}

export enum PlayerRolesEnum {
  ADMIN = "ADMIN",
  COMMON = "COMMON",
}

export interface PlayerDataInterface {
  id: string;
  name: string;
  canVote: boolean;
  role: PlayerRolesEnum;
  choice: string | boolean;
  previousChoiceBeforeAdminChange?: string | boolean;
}
