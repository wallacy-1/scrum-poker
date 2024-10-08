import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { MenuPropsInterface } from "./interfaces";

const Menu: React.FC<MenuPropsInterface> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const refDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outsideClickMenu = (event: any) => {
      if (refDiv.current && !refDiv.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", outsideClickMenu);
    }

    return () => {
      document.removeEventListener("mousedown", outsideClickMenu);
    };
  }, [isOpen]);

  return (
    <div ref={refDiv} className="relative inline-block">
      <FontAwesomeIcon
        title={title}
        icon={faGear}
        size={"lg"}
        color="#696969"
        className="ml-2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <div className="absolute z-20 mt-2 rounded-md w-[9.2rem] bg-gray-800 -left-28">
          <ul className="overflow-hidden border divide-y rounded-md divide-zinc-950 border-zinc-950">
            {children}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Menu;
