import { Button, FormInput } from "../../atoms";
import { Modal } from "../../organisms";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useChangeNameModal } from "../../../contexts";
import socket from "../../../services/scrum-poker/webSocketService";
import { minNameLength, maxNameLength } from "../../../constants/player-name";

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
      title={
        targetId === socket.id
          ? t("molecules.change_name_modal.title_main_player", { oldName })
          : t("molecules.change_name_modal.title_other_player", { oldName })
      }
      backgroundOpacity
    >
      <form className="text-left" onSubmit={handleSubmit(handleChangeName)}>
        <FormInput
          id="newPlayerName"
          type="text"
          label={t("molecules.change_name_modal.player_name_input")}
          register={register("newPlayerName", {
            value: oldName,
            minLength: {
              value: minNameLength,
              message: t("form_common.min_length_error", { minNameLength }),
            },
            maxLength: {
              value: maxNameLength,
              message: t("form_common.max_length_error", { maxNameLength }),
            },
            pattern: {
              value: /^[a-zA-Z0-9.-]+$/,
              message: t("form_common.pattern_no_especial_caracteres_error"),
            },
            required: {
              value: true,
              message: t("form_common.required_player_name_error"),
            },
          })}
          error={formState.errors.newPlayerName}
        />
        <div className="flex justify-between pt-2 mt-5 border-t">
          <Button onClick={closeNameModal}>{t("common.cancel")}</Button>
          <Button
            type="submit"
            color={`${formState.errors.newPlayerName ? "danger" : "primary"}`}
            disabled={!!formState.errors.newPlayerName}
            error={!!formState.errors.newPlayerName}
          >
            {t("common.save")}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ChangeNameModal;
