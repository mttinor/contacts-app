import React, { useEffect, useState } from "react";
import withLayout from "../components/withLayout";
import ContactDetails from "../components/ContactDetails";
import Api from "../services/api";
import { ToastError } from "../utils/handleError";
import { useParams } from "react-router-dom";
import Spinner from "../components/base/Spinner";
const Contact = () => {
  const { id } = useParams();
  const [contact, setContact] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const item = await Api.getContact(id);
      setContact(item);
    } catch (err) {
      ToastError(err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="content">
      <div className="scrollable-content">
        {isLoading ? <Spinner /> : <ContactDetails contact={contact} />}
      </div>
    </div>
  );
};

export default withLayout(Contact);
