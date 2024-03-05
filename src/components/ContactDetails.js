import React from "react";
import { useTranslation } from "react-i18next";
const EachInfo = ({ title, description }) => {
  return (
    <div className="w-full">
      <p className="text-gray-600 mb-1">
        <strong className="mx-2">{title}:</strong>
        {description}
      </p>
      <hr />
    </div>
  );
};

const ContactDetails = ({ contact }) => {
  const {
    first_name,
    last_name,
    email,
    gender,
    address,
    phone,
    note,
    telegram,
    company,
    avatar,
  } = contact;
  const name = `${first_name} ${last_name}`;
  const { t } = useTranslation();
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center justify-center mb-4">
        <img src={avatar} alt={name} className="w-32 h-32 rounded-full" />
      </div>
      <h2 className="text-lg font-bold mb-2 text-center">{name}</h2>
      <div className="items-center justify-center grid grid-cols-1 gap-4">
        <EachInfo title={t("phone")} description={phone} />
        <EachInfo title={t("email")} description={email} />
        <EachInfo title={t("gender")} description={gender} />
        <EachInfo title={t("address")} description={address} />
        <EachInfo title={t("telegram")} description={telegram} />
        <EachInfo title={t("company")} description={company} />
        <EachInfo title={t("note")} description={note} />
      </div>
    </div>
  );
};

export default ContactDetails;
