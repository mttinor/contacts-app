import { useCallback, useEffect, useState } from "react";
import Input from "../components/base/Input";
import useDebounce from "../customHook/useDebounce";
import Api from "../services/api";
import Spinner from "../components/base/Spinner";
import ContactList from "../components/ContactList";
import withLayout from "../components/withLayout";
function Home() {
  const [value, setValue] = useState("");
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedValue = useDebounce(value, 250);

  const fetchData = useCallback(
    async (signal) => {
      const query =
        typeof parseInt(debouncedValue) === "number" &&
        parseInt(debouncedValue) > 0
          ? "phone"
          : "first_name";
      try {
        let params = {
          where: {
            [query]: {
              contains: debouncedValue,
            },
          },
        };

        const { items } = await Api.getContacts(params, signal);

        setContacts(items);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    },
    [debouncedValue]
  );

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    setIsLoading(true);
    fetchData(signal);
    setIsLoading(false);
    return () => {
      controller.abort();
    };
  }, [fetchData]);

  return (
    <div className="content">
      <Input
        placeholder="نام مخاطب یا شماره همراه"
        value={value}
        onChangeValue={(e) => setValue(e.target.value)}
      />
      <div className="scrollable-content">
        {isLoading && <Spinner />}
        <ContactList contacts={contacts} />
      </div>
    </div>
  );
}

export default withLayout(Home);
