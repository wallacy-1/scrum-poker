import {
  PlayerDataInterface,
  RoomStatusEnum,
} from "../../../pages/room/interfaces";

export interface PlayerCardPropsInterface {
  player: PlayerDataInterface;
  roomStatus?: RoomStatusEnum;
  mainPlayerIsAdmin: boolean;
}
