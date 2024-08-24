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
            className="w-10 h-12 pt-3 mx-2 text-center bg-blue-400 rounded cursor-pointer select-none"
          >
            {value}
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-3 border-t">
        <Button onClick={() => handleChangeChoice()} disabled={choice === null}>
          Change
        </Button>
        <Button onClick={() => handleCancel()}>Cancel</Button>
      </div>
    </Modal>
  );
};

export default ChangeChoiceModal;
