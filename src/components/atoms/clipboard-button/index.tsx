import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faCheck } from "@fortawesome/free-solid-svg-icons";
import Button from "../button";
import { useTranslation } from "react-i18next";

const ClipboardButton = () => {
  const { t } = useTranslation("", {
    keyPrefix: "atoms.clipboard_button",
  });
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const url = window.location.href;

    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <Button onClick={handleCopy}>
      <FontAwesomeIcon icon={copied ? faCheck : faCopy} className="mr-2" />
      {t(copied ? "link_copied" : "copy_link")}
    </Button>
  );
};

export default ClipboardButton;
