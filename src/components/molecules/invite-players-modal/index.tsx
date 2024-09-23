import { Button, ClipboardButton } from "../../atoms";
import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Modal } from "../../organisms";
import { useTranslation } from "react-i18next";

const InvitePlayersModal = () => {
  const { t } = useTranslation();
  const [inviteModal, setInviteModal] = useState(false);

  return (
    <>
      <div>
        <Button onClick={() => setInviteModal(true)}>
          {t("molecules.invite_players_modal.Invite_players")}
        </Button>
      </div>

      {inviteModal && (
        <Modal
          title={t("molecules.invite_players_modal.Invite_players")}
          backgroundOpacity
        >
          <div className="mb-5">
            <p>{t("molecules.invite_players_modal.how_to_invite")}</p>
            <ClipboardButton />
          </div>

          <p className="mb-2">
            {t("molecules.invite_players_modal.qr_code_description")}
          </p>
          <div className="flex justify-center">
            <QRCodeSVG
              title={t("molecules.invite_players_modal.qr_code_title")}
              value={window.location.href}
              size={250}
              bgColor={"#ffffff"}
              fgColor={"#000000"}
              level={"L"}
              marginSize={1}
            />
          </div>

          <div className="flex justify-end pt-2 mt-5 border-t">
            <Button onClick={() => setInviteModal(false)}>
              {t("common.close")}
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default InvitePlayersModal;
