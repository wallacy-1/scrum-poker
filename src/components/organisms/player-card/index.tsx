import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCrown,
  faEye,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import socket from "../../../services/scrum-poker/webSocketService";
import { PokerCard } from "../../atoms";
import { getShortString } from "../../../utils/getShortString.utils";
import { PlayerCardPropsInterface } from "./interfaces";
import {
  PlayerRolesEnum,
  RoomStatusEnum,
} from "../../../pages/room/interfaces";
import { useMemo } from "react";
import { PlayerConfigurationMenu } from "../../molecules";
import { useTranslation } from "react-i18next";
import { useChangeChoiceModal } from "../../../contexts";

//=> will be removed in the future with custom choices
const fibonacciDefault = [
  "0",
  "1",
  "2",
  "3",
  "5",
  "8",
  "13",
  "21",
  "34",
  "55",
  "89",
  "?",
];

const PlayerCard: React.FC<PlayerCardPropsInterface> = ({
  player,
  roomStatus,
  mainPlayerIsAdmin,
  isHighlighted,
}) => {
  const { t } = useTranslation("", {
    keyPrefix: "organisms.player_card",
  });
  const { openChoiceModal } = useChangeChoiceModal();
  const { name, choice, id, role, canVote } = player;

  const cardColor = useMemo(
    () => (choice === false ? "red" : "green"),
    [choice]
  );
  const isAdmin = useMemo(() => {
    return role === PlayerRolesEnum.ADMIN;
  }, [role]);

  return (
    <div
      className={`flex flex-col justify-end px-1 w-34 transition-all duration-700 ${
        isHighlighted ? "mb-4" : ""
      }`}
    >
      <div className="flex flex-col w-full">
        {isAdmin && (
          <FontAwesomeIcon
            title={t("admin_icon_title")}
            icon={faCrown}
            size="xl"
            color="#FFDF00"
          />
        )}

        <div className="flex text-center">
          <p className="w-9/12 text-white" title={name}>
            {getShortString(name, 9)}
          </p>
          {(mainPlayerIsAdmin || id === socket.id) && (
            <PlayerConfigurationMenu
              id={id}
              name={name}
              canVote={canVote}
              isAdmin={isAdmin}
              showAdminActions={mainPlayerIsAdmin}
            />
          )}
        </div>
      </div>
      <PokerCard color={canVote ? cardColor : "blue"} highlight={isHighlighted}>
        <div className="relative flex flex-col items-center justify-center w-full h-full">
          {player.previousChoiceBeforeAdminChange && (
            <FontAwesomeIcon
              title={t("admin_forced_choice_title", {
                previousChoice: player.previousChoiceBeforeAdminChange,
                choice: player.choice,
              })}
              className="absolute top-6"
              icon={faCrown}
              size="xl"
              color="#595b5f"
            />
          )}
          {!canVote ? (
            <FontAwesomeIcon
              title={t("observer_icon_title")}
              className="mb-3 ml-1"
              icon={faEye}
              color="#224ba5"
              size="4x"
            />
          ) : (
            roomStatus === RoomStatusEnum.REVEAL && (
              <>
                <p className="pb-4 text-4xl">
                  {choice === false ? t("no_choice_text") : choice}
                </p>

                {mainPlayerIsAdmin && (
                  <FontAwesomeIcon
                    onClick={() => openChoiceModal(name, fibonacciDefault, id)}
                    className="absolute cursor-pointer top-6 right-1"
                    title={t("admin_change_choice_icon_title")}
                    icon={faPenToSquare}
                    color="#696969"
                    size="lg"
                  />
                )}
              </>
            )
          )}
        </div>
      </PokerCard>
    </div>
  );
};

export default PlayerCard;
