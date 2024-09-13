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
import { useTranslation } from "react-i18next";

const PlayerConfigurationMenu = ({
  id,
  name,
  canVote,
  isAdmin,
  showAdminActions,
}: PlayerConfigurationMenuPropsInterface) => {
  const { t } = useTranslation("", {
    keyPrefix: "molecules.player_configuration_menu",
  });
  const [alterNameModal, setAlterNameModal] = useState(false);

  const handleRemovePlayer = useCallback(() => {
    console.log(`handleRemovePlayer - called with targetId: ${id}`);
    // TODO: open modal confirmation
    socket.emit("kickPlayer", id);
  }, [id]);

  const handleToggleVotingStatus = useCallback(() => {
    console.log(`handleToggleVotingStatus - called with targetId: ${id}`);
    socket.emit("updateVotingStatus", { targetId: id, canVote: !canVote });
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
          <MenuItem onClick={handleToggleVotingStatus}>
            <FontAwesomeIcon
              icon={canVote ? faLock : faLockOpen}
              size="sm"
              color="#696969"
            />
            <p className="text-right">
              {t(`${canVote ? "prevent" : "allow"}_voting`)}
            </p>
          </MenuItem>

          {!isAdmin && (
            <>
              <MenuItem onClick={handleRemovePlayer}>
                <FontAwesomeIcon icon={faDoorOpen} size="sm" color="#696969" />
                <p>{t("remove_player")}</p>
              </MenuItem>
              <MenuItem onClick={handleTransferAdmin}>
                <FontAwesomeIcon
                  className="pr-1 pl-0.5"
                  icon={faUpLong}
                  size="sm"
                  color="#696969"
                />
                <p>{t("pass_admin")}</p>
              </MenuItem>
            </>
          )}
        </>
      )}

      <MenuItem onClick={() => setAlterNameModal(true)}>
        <FontAwesomeIcon icon={faPenToSquare} size="sm" color="#696969" />
        <p>{t("change_name")}</p>
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
