import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDoorOpen,
  faLock,
  faLockOpen,
  faPenToSquare,
  faUpLong,
} from "@fortawesome/free-solid-svg-icons";
import socket from "../../../services/scrum-poker/webSocketService";
import { MenuItem } from "../../atoms";
import { Menu } from "../../organisms";
import { PlayerConfigurationMenuPropsInterface } from "./interfaces";
import { useCallback, useState } from "react";
import ChangeNameModal from "../change-name-modal";

const PlayerConfigurationMenu = ({
  id,
  name,
  canVote,
  isAdmin,
  showAdminActions,
}: PlayerConfigurationMenuPropsInterface) => {
  const [alterNameModal, setAlterNameModal] = useState(false);

  const handleRemovePlayer = useCallback(() => {
    console.log(`handleRemovePlayer - called with targetId: ${id}`);
    // TODO: open modal confirmation
    socket.emit("kickPlayer", id);
  }, [id]);

  const handleVoteToggle = useCallback(() => {
    console.log(`handleVoteToggle - called with targetId: ${id}`);
    socket.emit("changeRole", { targetId: id, canVote: !canVote });
  }, [canVote, id]);

  const handleTransferAdmin = useCallback(() => {
    // TODO: open modal confirmation
    console.log("handleTransferAdmin");
    socket.emit("transferAdmin", id);
  }, [id]);

  const handleChangeName = useCallback(
    (newName: string) => {
      socket.emit("changeName", { targetId: id, newName });
      setAlterNameModal(false);
    },
    [id]
  );

  return (
    <Menu title="Player">
      {showAdminActions && (
        <>
          <MenuItem onClick={handleVoteToggle}>
            <FontAwesomeIcon icon={canVote ? faLock : faLockOpen} size="sm" />
            <p>{canVote ? "Prevent voting" : "Allow voting"}</p>
          </MenuItem>

          {!isAdmin && (
            <>
              <MenuItem onClick={handleRemovePlayer}>
                <FontAwesomeIcon icon={faDoorOpen} size="sm" />
                <p>Remove player</p>
              </MenuItem>
              <MenuItem onClick={handleTransferAdmin}>
                <FontAwesomeIcon icon={faUpLong} size="sm" />
                <p>Pass admin</p>
              </MenuItem>
            </>
          )}
        </>
      )}

      <MenuItem onClick={() => setAlterNameModal(true)}>
        <FontAwesomeIcon icon={faPenToSquare} size="sm" />
        <p>Change name</p>
      </MenuItem>

      {alterNameModal && (
        <ChangeNameModal
          oldName={name}
          onSuccessFunction={handleChangeName}
          onCancelFunction={() => setAlterNameModal(false)}
        />
      )}
    </Menu>
  );
};

export default PlayerConfigurationMenu;
