import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationFn from "./../locales/fn/translation.json";

// Add more languages as needed
const resources = {
  fn: {
    translation: translationFn,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "fn", // default language
    fallbackLng: "fn", // fallback language if translation for current language is not available
    interpolation: {
      escapeValue: false, // React already does escaping
    },
  });

export default i18n;
