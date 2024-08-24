import { Button, FormInput } from "../../atoms";
import { Modal } from "../../organisms";
import { ChangeNameModalPropsInterface } from "./interfaces";
import { useForm } from "react-hook-form";

const ChangeNameModal = ({
  name,
  onSuccessFunction,
  onCancelFunction,
}: ChangeNameModalPropsInterface) => {
  const { register, formState, handleSubmit } = useForm();

  const handleChangeName = (data: { newPlayerName?: string }) => {
    const nameNoWhiteSpace = data.newPlayerName
      ? data.newPlayerName.trim()
      : undefined;

    if (!nameNoWhiteSpace || nameNoWhiteSpace === name) return;

    onSuccessFunction(nameNoWhiteSpace);
  };

  const handleCancel = () => {
    onCancelFunction();
  };

  return (
    <Modal isOpen={true} title={"Change name."} backgroundOpacity>
      <form className="text-left" onSubmit={handleSubmit(handleChangeName)}>
        <FormInput
          id="newPlayerName"
          type="text"
          label="New name:"
          register={register("newPlayerName", {
            required: "The player's name is mandatory.",
          })}
          error={formState.errors.newPlayerName}
        />

        <div className="flex justify-between mt-3 border-t">
          <Button type="submit">Save</Button>
          <Button onClick={() => handleCancel()}>Cancel</Button>
        </div>
      </form>
    </Modal>
  );
};

export default ChangeNameModal;
