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
import {
  ChangeChoiceModal,
  ChangeNameModal,
  PlayerConfigurationMenu,
} from "../../molecules";

const PlayerCard = ({
  id,
  name,
  roomStatus,
  choice,
  role,
  mainPlayerIsAdmin,
}: PlayerCardPropsInterface) => {
  const [alterNameModal, setAlterNameModal] = useState(false);
  const [alterChoiceModal, setAlterChoiceModal] = useState(false);

  const cardValues = [0, 1, 2, 3, 5, 8, 13, 20, 100];
  const cardColor = useMemo(
    () => (choice === false ? "bg-red-300" : "bg-green-300"),
    [choice]
  );
  const { isAdmin, isObserver } = useMemo(() => {
    return {
      isAdmin: role === PlayerRolesEnum.ADMIN,
      isObserver: role === PlayerRolesEnum.OBSERVER,
    };
  }, [role]);

  const handleChangeName = useCallback((newName: string) => {
    socket.emit("changeName", newName);
    setAlterNameModal(false);
  }, []);

  const handleChangeChoice = useCallback((newChoice: number | string) => {
    socket.emit("adminChangePlayerChoice", newChoice);
    setAlterChoiceModal(false);
  }, []);

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
          {mainPlayerIsAdmin && !isAdmin && (
            <PlayerConfigurationMenu id={id} role={role} />
          )}

          {id === socket.id && (
            <FontAwesomeIcon
              onClick={() => setAlterNameModal(true)}
              className="ml-2 cursor-pointer"
              title={"Change name."}
              color="#696969"
              icon={faPenToSquare}
              size="lg"
            />
          )}

          {alterNameModal && (
            <ChangeNameModal
              name={name}
              onSuccessFunction={handleChangeName}
              onCancelFunction={() => setAlterNameModal(false)}
            />
          )}
        </div>
      </div>
      <PokerCard className={isObserver ? "bg-blue-300" : cardColor}>
        <div className="flex items-center justify-center w-full h-full">
          {isObserver ? (
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
                <p className="pb-4 pl-6 text-4xl"> {choice} </p>
                <FontAwesomeIcon
                  onClick={() => setAlterChoiceModal(true)}
                  className="mb-10 ml-1 cursor-pointer"
                  title="Change player choice."
                  icon={faPenToSquare}
                  color="#696969"
                  size="sm"
                />
              </>
            )
          )}
        </div>

        {alterChoiceModal && (
          <ChangeChoiceModal
            name={name}
            cardValues={cardValues}
            onSuccessFunction={handleChangeChoice}
            onCancelFunction={() => setAlterChoiceModal(false)}
          />
        )}
      </PokerCard>
    </div>
  );
};

export default PlayerCard;
