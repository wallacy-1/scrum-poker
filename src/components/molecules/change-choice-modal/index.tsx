import { useCallback, useState } from "react";
import { Button } from "../../atoms";
import { Modal } from "../../organisms";
import { ChangeChoiceModalPropsInterface } from "./interfaces";
import { useTranslation } from "react-i18next";

const ChangeChoiceModal = ({
  name,
  cardValues,
  onSuccessFunction,
  onCancelFunction,
}: ChangeChoiceModalPropsInterface) => {
  const { t } = useTranslation();
  const [choice, setChoice] = useState<number | string | null>(null);

  const handleChangeChoice = useCallback(() => {
    if (!choice) return;

    onSuccessFunction(choice);
  }, [choice, onSuccessFunction]);

  const handleCancel = useCallback(() => {
    setChoice(null);
    onCancelFunction();
  }, [onCancelFunction]);

  return (
    <Modal
      isOpen={true}
      title={t("molecules.change_choice_modal.title", { name })}
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
        <Button onClick={() => handleChangeChoice()} disabled={choice === null}>
          {t("common.save")}
        </Button>
        <Button onClick={() => handleCancel()}>{t("common.cancel")}</Button>
      </div>
    </Modal>
  );
};

export default ChangeChoiceModal;
