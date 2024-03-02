import React from "react";

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
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center justify-center mb-4">
        <img src={avatar} alt={name} className="w-32 h-32 rounded-full" />
      </div>
      <h2 className="text-lg font-bold mb-2 text-center">{name}</h2>
      <div className="items-center justify-center grid grid-cols-1 gap-4">
        <EachInfo title="شماره همراه" description={phone} />
        <EachInfo title="ایمیل" description={email} />
        <EachInfo title="جنسیت" description={gender} />
        <EachInfo title="آدرس" description={address} />
        <EachInfo title="آیدی تلگرام" description={telegram} />
        <EachInfo title="شرکت" description={company} />
        <EachInfo title="یاداشت" description={note} />
      </div>
    </div>
  );
};

export default ContactDetails;
