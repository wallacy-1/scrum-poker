import {
  PlayerRolesEnum,
  RoomStatusEnum,
} from "../../../pages/room/interfaces";

export interface PlayerCardPropsInterface {
  id: string;
  name: string;
  roomStatus?: RoomStatusEnum;
  choice: string | number | boolean;
  role: PlayerRolesEnum;
  mainPlayerIsAdmin: boolean;
  canVote: boolean;
}
