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
import { useCallback, useMemo, useState } from "react";
import { ChangeChoiceModal, PlayerConfigurationMenu } from "../../molecules";

const PlayerCard = ({
  player,
  roomStatus,
  mainPlayerIsAdmin,
}: PlayerCardPropsInterface) => {
  const [adminAlterChoiceModal, setAdminAlterChoiceModal] = useState(false);
  const { name, choice, id, role, canVote } = player;
  const cardValues = [0, 1, 2, 3, 5, 8, 13, 20, 100];

  const cardColor = useMemo(
    () => (choice === false ? "bg-red-300" : "bg-green-300"),
    [choice]
  );
  const isAdmin = useMemo(() => {
    return role === PlayerRolesEnum.ADMIN;
  }, [role]);

  const handleAdminChangePlayerChoice = useCallback(
    (choice: number | string) => {
      socket.emit("adminChangePlayerChoice", { targetId: id, choice });
      setAdminAlterChoiceModal(false);
    },
    [id]
  );

  return (
    <div className="flex flex-col justify-end px-1 w-34">
      <div className="flex flex-col w-full">
        {isAdmin && (
          <FontAwesomeIcon
            title="Room Administrator."
            icon={faCrown}
            size="xl"
            color="#FFDF00"
          />
        )}

        <div className="flex text-center">
          <p className="w-9/12" title={name}>
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
      <PokerCard className={canVote ? cardColor : "bg-blue-300"}>
        <div className="relative flex flex-col items-center justify-center w-full h-full">
          {player.previousChoiceBeforeAdminChange && (
            <FontAwesomeIcon
              title={`Admin changed this player's choice from ${player.previousChoiceBeforeAdminChange} to ${choice}.`}
              className="absolute top-6"
              icon={faCrown}
              size="xl"
              color="#595b5f"
            />
          )}
          {!canVote ? (
            <FontAwesomeIcon
              title="This player is designated as an observer and is not permitted to vote."
              className="mb-3 ml-1"
              icon={faEye}
              color="#224ba5"
              size="4x"
            />
          ) : (
            roomStatus === RoomStatusEnum.REVEAL &&
            choice !== false && (
              <>
                <p className="pb-4 text-4xl">{choice}</p>

                {mainPlayerIsAdmin && (
                  <FontAwesomeIcon
                    onClick={() => setAdminAlterChoiceModal(true)}
                    className="absolute cursor-pointer top-6 right-1"
                    title="Change player choice."
                    icon={faPenToSquare}
                    color="#696969"
                    size="lg"
                  />
                )}
              </>
            )
          )}
        </div>

        {adminAlterChoiceModal && (
          <ChangeChoiceModal
            name={name}
            cardValues={cardValues}
            onSuccessFunction={handleAdminChangePlayerChoice}
            onCancelFunction={() => setAdminAlterChoiceModal(false)}
          />
        )}
      </PokerCard>
    </div>
  );
};

export default PlayerCard;
