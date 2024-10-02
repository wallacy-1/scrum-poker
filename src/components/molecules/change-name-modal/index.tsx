import { Button, FormInput } from "../../atoms";
import { Modal } from "../../organisms";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useChangeNameModal } from "../../../contexts";
import socket from "../../../services/web-socket-service";
import { minNameLength, maxNameLength } from "../../../constants/player-name";
import axiosInstance from "../../../services/axios-instance";
import axios from "axios";

const ChangeNameModal = () => {
  const { t } = useTranslation();
  const { oldName, roomId, targetId, closeNameModal } = useChangeNameModal();
  const { register, handleSubmit, formState } = useForm();

  const handleChangeName = async (data: { newPlayerName?: string }) => {
    const newPlayerName = data?.newPlayerName?.trim();

    if (!newPlayerName || newPlayerName === oldName) {
      closeNameModal();
      return;
    }

    try {
      await axiosInstance.get(`/scrumPoker/${roomId}/player/${newPlayerName}`);

      socket.emit("changeName", { targetId, newName: newPlayerName });
      closeNameModal();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const statusCode = error.response?.status;

        if (statusCode === 400) {
          alert(t("form_common.name_already_taken_error"));
        } else {
          alert(t("common.strange_error"));
        }
      } else {
        alert(t("common.unexpected_error"));
      }
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
              value: /^[a-zA-Z0-9. -]+$/,
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
