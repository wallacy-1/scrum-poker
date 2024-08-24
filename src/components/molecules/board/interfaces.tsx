import {
  PlayerDataInterface,
  RoomStatusEnum,
} from "../../../pages/room/interfaces";

export interface BoardPropsInterface {
  players?: PlayerDataInterface[];
  roomStatus?: RoomStatusEnum;
  mainPlayerIsAdmin: boolean;
}
