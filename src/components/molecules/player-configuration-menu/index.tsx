import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDoorOpen,
  faLock,
  faLockOpen,
  faUpLong,
} from "@fortawesome/free-solid-svg-icons";
import socket from "../../../services/scrum-poker/webSocketService";
import { MenuItem } from "../../atoms";
import { Menu } from "../../organisms";
import { PlayerConfigurationMenuPropsInterface } from "./interfaces";
import { PlayerRolesEnum } from "../../../pages/room/interfaces";

const PlayerConfigurationMenu = ({
  id,
  role,
}: PlayerConfigurationMenuPropsInterface) => {
  const handleRemovePlayer = () => {
    console.log("handleRemovePlayer - called with targetId: " + id);
    //TODO:  open modal confirmation
    socket.emit("kickPlayer", id);
  };

  const handleChangeRole = () => {
    const isCommonRole = role === PlayerRolesEnum.COMMON;
    console.log("handleChangeRole - called with targetId: " + id);

    socket.emit("changeRole", {
      targetId: id,
      role: isCommonRole ? PlayerRolesEnum.OBSERVER : PlayerRolesEnum.COMMON,
    });
  };

  const handleTransferAdmin = () => {
    //TODO:  open modal confirmation
    console.log("handleTransferAdmin");

    socket.emit("transferAdmin", id);
  };

  return (
    <Menu title="Player">
      <MenuItem onClick={() => handleRemovePlayer()}>
        <FontAwesomeIcon icon={faDoorOpen} size="sm" />
        <p>Remove player</p>
      </MenuItem>

      <MenuItem onClick={() => handleChangeRole()}>
        {role === PlayerRolesEnum.COMMON ? (
          <>
            <FontAwesomeIcon icon={faLock} size="sm" />
            <p>Prevent voting</p>
          </>
        ) : (
          <>
            <FontAwesomeIcon icon={faLockOpen} size="sm" />
            <p>Allow voting</p>
          </>
        )}
      </MenuItem>
      <MenuItem onClick={() => handleTransferAdmin()}>
        <FontAwesomeIcon icon={faUpLong} size="sm" />
        <p>Pass admin</p>
      </MenuItem>
    </Menu>
  );
};

export default PlayerConfigurationMenu;
