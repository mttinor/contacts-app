import React, { useEffect, useState } from "react";
import withLayout from "../components/withLayout";
import Api from "../services/api";
import ContactList from "../components/ContactList";

import { toast } from "react-toastify";
const Home = () => {
  const [contacts, setContacts] = useState([]);
  const fetchData = async () => {
    try {
      const { items } = await Api.getContacts();
      setContacts(items);
    } catch (err) {
      console.log(err);
      toast.error("ss");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    // <div className="container mx-auto py-8">
    //   <h1 className="text-3xl font-bold mb-4 mx-3">لیست مخاطبین</h1>
    //   <ContactList contacts={contacts} />
    // </div>
    <div className="content">
      <div className="scrollable-content">
        {/* Content that can overflow */}
        <ContactList contacts={contacts} />
      </div>
    </div>
  );
};

export default withLayout(Home);
