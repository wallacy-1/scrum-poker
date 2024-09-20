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
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useChangeNameModal } from "../../../contexts";

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
  const { openNameModal } = useChangeNameModal();

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

      <MenuItem onClick={() => openNameModal(name, id)}>
        <FontAwesomeIcon icon={faPenToSquare} size="sm" color="#696969" />
        <p>{t("change_name")}</p>
      </MenuItem>
    </Menu>
  );
};

export default PlayerConfigurationMenu;
