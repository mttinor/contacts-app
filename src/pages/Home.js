import React, { useEffect, useState } from "react";
import withLayout from "../components/withLayout";
import Api from "../services/api";
import ContactList from "../components/ContactList";
import { ToastError } from "../utils/handleError";
import Spinner from "../components/base/Spinner";

const Home = () => {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const { items } = await Api.getContacts();
      setContacts(items);
    } catch (err) {
      ToastError(err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) return <Spinner />;
  if (isLoading && contacts.length == 0)
    return (
      <>
        <h1>لیست مخاطبین خالی است</h1>
      </>
    );
  return (
    <div className="content">
      <div className="scrollable-content">
        <ContactList contacts={contacts} />
      </div>
    </div>
  );
};

export default withLayout(Home);
