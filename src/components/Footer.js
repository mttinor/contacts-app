import React from "react";
import { useTranslation } from "react-i18next";
const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-gray-800 p-4 text-white text-center">
      <div className="flex justify-center space-x-4">
        <a href="/" className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 inline-block mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 10h16M4 14h16M4 18h16"
            />
          </svg>
          {t("contractLists")}
        </a>
      </div>
    </footer>
  );
};

export default Footer;
