import { Button, FormInput } from "../../atoms";
import { Modal } from "../../organisms";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useChangeNameModal } from "../../../contexts";
import socket from "../../../services/scrum-poker/webSocketService";

const ChangeNameModal = () => {
  const { t } = useTranslation();
  const { oldName, targetId, closeNameModal } = useChangeNameModal();
  const { register, handleSubmit, formState } = useForm();

  const handleChangeName = (data: { newPlayerName?: string }) => {
    const nameNoWhiteSpace = data.newPlayerName?.trim();
    if (nameNoWhiteSpace && nameNoWhiteSpace !== oldName) {
      socket.emit("changeName", { targetId, newName: nameNoWhiteSpace });
      closeNameModal();
    }
  };

  return (
    <Modal
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
          <Button onClick={closeNameModal}>{t("common.cancel")}</Button>
          <Button type="submit">{t("common.save")}</Button>
        </div>
      </form>
    </Modal>
  );
};

export default ChangeNameModal;
