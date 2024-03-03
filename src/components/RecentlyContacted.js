import React from "react";
import "./../styles/recentlyContacted.css"; // Import your CSS file

const RecentlyContacted = ({ recentContracts }) => {
  const defaultAvatar = "https://via.placeholder.com/150";
  return (
    <div className="story-container">
      {recentContracts.map((contact, i) => (
        <a href={`/contact/${contact.id}`}>
          <div key={i} className="story-item">
            <img
              src={contact.avatar || defaultAvatar}
              alt={contact.first_name}
              className="story-avatar"
            />
            <span className="story-name">
              {contact.first_name} {contact.last_name}
            </span>
          </div>
        </a>
      ))}
    </div>
  );
};

export default RecentlyContacted;
