import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { LanguagesInterface } from "./interfaces";

const LANGUAGE_SELECTOR_ID = "language-selector";
const languages: LanguagesInterface[] = [
  { key: "en", flag: "us", name: "English" },
  { key: "pt-BR", flag: "br", name: "Português" },
];

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const selectedLanguage = languages.find(
    (language) => language.key === i18n.language
  );

  useEffect(() => {
    const handleWindowClick = (event: any) => {
      const target = event.target.closest("button");
      if (target && target.id === LANGUAGE_SELECTOR_ID) {
        return;
      }
      setIsOpen(false);
    };

    window.addEventListener("click", handleWindowClick);
    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
  }, []);

  const handleLanguageChange = async (language: LanguagesInterface) => {
    await i18n.changeLanguage(language.key);
    setIsOpen(false);
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        id={LANGUAGE_SELECTOR_ID}
        aria-expanded={isOpen}
      >
        <span className={`fi fi-${selectedLanguage?.flag ?? "us"}`} />
        <FontAwesomeIcon className="ml-3" icon={faChevronDown} />
      </button>
      {isOpen && (
        <div
          className="absolute right-0 mt-2 origin-top-right bg-white rounded-md shadow-lg w-96 ring-1 ring-black ring-opacity-5"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby={LANGUAGE_SELECTOR_ID}
        >
          <div className="grid grid-cols-2 gap-2 py-1" role="none">
            {languages.map((language: LanguagesInterface, index: number) => {
              return (
                <button
                  key={language.key}
                  onClick={() => handleLanguageChange(language)}
                  className={`${
                    selectedLanguage?.key === language.key
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-700"
                  } block px-4 py-2 text-sm text-start items-center hover:bg-gray-300 ${
                    index % 2 === 0 ? "rounded-r" : "rounded-l"
                  }`}
                  role="menuitem"
                >
                  <span className={`fi fi-${language.flag} mr-2`}></span>
                  <span className="truncate">{language.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
