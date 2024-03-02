import React from "react";

const ContactList = ({ contacts }) => {
  const defaultAvatar = "https://via.placeholder.com/150";
  return (
    <>
      {contacts.map((contact, i) => (
        <div
          key={i}
          className="bg-white rounded-lg shadow-md p-6 my-3 cursor-pointer mx-3"
        >
          <a href={`/contact/${contact.id}`}>
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="flex-shrink-0">
                <img
                  src={contact.avatar || defaultAvatar} // Use contact avatar if available, else use default
                  alt={contact.first_name}
                  className="w-16 h-16 object-cover rounded-lg mb-4 mx-3"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  {contact.first_name} {contact.last_name}
                </p>
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  {contact.phone}
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                  {contact.city}
                </p>
              </div>
            </div>
          </a>
        </div>
      ))}
    </>
  );
};

export default ContactList;
