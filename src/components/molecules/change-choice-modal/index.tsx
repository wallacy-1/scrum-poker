import { useCallback, useState } from "react";
import { Button } from "../../atoms";
import { Modal } from "../../organisms";
import { ChangeChoiceModalPropsInterface } from "./interfaces";

const ChangeChoiceModal = ({
  name,
  cardValues,
  onSuccessFunction,
  onCancelFunction,
}: ChangeChoiceModalPropsInterface) => {
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
      title={`Change player: ${name} choice.`}
      backgroundOpacity
    >
      <div className="flex">
        {cardValues.map((value: number | string) => (
          <div
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
        <Button onClick={() => handleCancel()}>Cancel</Button>
        <Button onClick={() => handleChangeChoice()} disabled={choice === null}>
          Save
        </Button>
      </div>
    </Modal>
  );
};

export default ChangeChoiceModal;
