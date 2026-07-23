import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaGlobe } from "react-icons/fa";

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "pt", name: "Português", flag: "🇵🇹" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "한국어", flag: "🇰🇷" },
  { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
];

function LanguageDropdown() {
  const { i18n } = useTranslation();

  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);

  const currentLanguage =
    languages.find(
      (lang) => lang.code === i18n.language
    ) || languages[0];

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  function changeLanguage(code) {
    i18n.changeLanguage(code);
    localStorage.setItem("language", code);
    setOpen(false);
  }

  return (
    <div
      ref={dropdownRef}
      className="relative hidden lg:block"
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 hover:border border-white rounded"
      >
        <FaGlobe />

        <span>
          {currentLanguage.flag}
        </span>

        <span>
          {currentLanguage.code.toUpperCase()}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white text-black rounded-lg shadow-xl overflow-hidden animate-fadeIn z-50">

          {languages.map((language) => (

            <button
              key={language.code}
              onClick={() =>
                changeLanguage(language.code)
              }
              className={`w-full flex items-center justify-between px-4 py-3 hover:bg-gray-100 transition ${
                i18n.language === language.code
                  ? "bg-yellow-100 font-bold"
                  : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">
                  {language.flag}
                </span>

                <span>
                  {language.name}
                </span>
              </div>

              {i18n.language ===
                language.code && (
                <span>✓</span>
              )}

            </button>

          ))}

        </div>
      )}

    </div>
  );
}

export default LanguageDropdown;