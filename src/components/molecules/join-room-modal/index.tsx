import { Button, FormInput } from "../../atoms";
import { Modal } from "../../organisms";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { JoinRoomModalPropsInterface } from "./interfaces";
import { maxNameLength, minNameLength } from "../../../constants/player-name";
import axiosInstance from "../../../services/axios-instance";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// More input fields are planned for future updates.
const JoinRoomModal: React.FC<JoinRoomModalPropsInterface> = ({
  roomId,
  onSubmit,
}) => {
  const { t } = useTranslation();
  const { register, handleSubmit, formState } = useForm();
  const storedName = localStorage.getItem("playerName");
  const navigate = useNavigate();

  const handleJoinRoom = async (data: { playerName?: string }) => {
    const playerName = data?.playerName?.trim();
    if (!playerName) return;

    try {
      await axiosInstance.get(`/scrumPoker/${roomId}/player/${playerName}`);

      localStorage.setItem("playerName", playerName);
      onSubmit(playerName);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const statusCode = error.response?.status;

        if (statusCode === 400) {
          alert(t("form_common.name_already_taken_error"));
        } else if (statusCode === 404) {
          alert(t("screens.room.room_not_found"));
          navigate("/");
        } else {
          alert(t("common.strange_error"));
        }
      } else {
        alert(t("common.unexpected_error"));
      }
    }
  };

  return (
    <Modal title={t("screens.room.join")}>
      <form onSubmit={handleSubmit(handleJoinRoom)}>
        <FormInput
          id="playerName"
          type="text"
          label={t("screens.room.player_name_input")}
          register={register("playerName", {
            value: storedName,
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
          error={formState.errors.playerName}
        />

        <div className="flex justify-between pt-2 mt-5 border-t">
          <Button onClick={() => navigate("/")}>{t("common.cancel")}</Button>
          <Button
            type="submit"
            color={`${formState.errors.playerName ? "danger" : "primary"}`}
            disabled={!!formState.errors.playerName}
            error={!!formState.errors.playerName}
          >
            {t("screens.room.join")}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default JoinRoomModal;
