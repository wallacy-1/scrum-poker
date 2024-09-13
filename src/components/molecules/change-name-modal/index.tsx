import { useTranslation } from "react-i18next";
import { Button, FormInput } from "../../atoms";
import { Modal } from "../../organisms";
import { ChangeNameModalPropsInterface } from "./interfaces";
import { useForm } from "react-hook-form";

const ChangeNameModal = ({
  oldName,
  onSuccessFunction,
  onCancelFunction,
}: ChangeNameModalPropsInterface) => {
  const { t } = useTranslation();
  const { register, formState, handleSubmit } = useForm();

  const handleChangeName = (data: { newPlayerName?: string }) => {
    const nameNoWhiteSpace = data.newPlayerName
      ? data.newPlayerName.trim()
      : undefined;

    if (!nameNoWhiteSpace || nameNoWhiteSpace === oldName) return;

    onSuccessFunction(nameNoWhiteSpace);
  };

  const handleCancel = () => {
    onCancelFunction();
  };

  return (
    <Modal
      isOpen={true}
      title={t("molecules.change_name_modal.title", { oldName })}
      backgroundOpacity
    >
      <form className="text-left" onSubmit={handleSubmit(handleChangeName)}>
        <FormInput
          id="newPlayerName"
          type="text"
          label={t("molecules.change_name_modal.player_name_input")}
          register={register("newPlayerName", {
            value: oldName,
            required: t("form_common.required_player_name_error"),
          })}
          error={formState.errors.newPlayerName}
        />

        <div className="flex justify-between mt-3 border-t">
          <Button type="submit">{t("common.save")}</Button>
          <Button onClick={() => handleCancel()}>{t("common.cancel")}</Button>
        </div>
      </form>
    </Modal>
  );
};

export default ChangeNameModal;
