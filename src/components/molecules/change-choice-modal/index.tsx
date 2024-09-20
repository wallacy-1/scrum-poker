import { useCallback, useState } from "react";
import { Button } from "../../atoms";
import { Modal } from "../../organisms";
import { useTranslation } from "react-i18next";
import { useChangeChoiceModal } from "../../../contexts";
import socket from "../../../services/scrum-poker/webSocketService";

const ChangeChoiceModal = () => {
  const { t } = useTranslation();
  const [choice, setChoice] = useState<number | string | null>(null);
  const { playerName, cardValues, targetId, closeChoiceModal } =
    useChangeChoiceModal();

  const handleChangeChoice = useCallback(() => {
    if (!choice) return;

    socket.emit("adminChangePlayerChoice", { targetId, choice });
    closeChoiceModal();
  }, [choice, closeChoiceModal, targetId]);

  const handleCancel = useCallback(() => {
    setChoice(null);
    closeChoiceModal();
  }, [closeChoiceModal]);

  return (
    <Modal
      title={t("molecules.change_choice_modal.title", { name: playerName })}
      backgroundOpacity
    >
      <div className="flex">
        {cardValues.map((value: number | string, index) => (
          <div
            key={index}
            onClick={() => setChoice(value)}
            className={`${
              choice === value ? "bg-green-400" : "bg-blue-400"
            } w-10 h-12 pt-3 mx-2 text-center rounded cursor-pointer select-none`}
          >
            {value}
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-3 border-t">
        <Button onClick={() => handleCancel()}>{t("common.cancel")}</Button>
        <Button onClick={() => handleChangeChoice()} disabled={choice === null}>
          {t("common.save")}
        </Button>
      </div>
    </Modal>
  );
};

export default ChangeChoiceModal;
