import { useCallback, useEffect, useReducer, useState } from "react";
import Input from "../components/base/Input";
import useDebounce from "../customHook/useDebounce";
import Api from "../services/api";
import Spinner from "../components/base/Spinner";
import ContactList from "../components/ContactList";
import withLayout from "../components/withLayout";
import RecentlyContacted from "../components/RecentlyContacted";
import { useNavigate } from "react-router-dom";
const initialState = {
  recentContracts: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_RECENT_CONTRACT":
      return {
        ...state,
        recentContracts: action.payload,
      };
    default:
      return state;
  }
};

function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [value, setValue] = useState("");
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
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
    const recentContract = localStorage.getItem("recentContract");
    if (recentContract && recentContract !== "undefined") {
      dispatch({
        type: "SET_RECENT_CONTRACT",
        payload: JSON.parse(recentContract),
      });
    }
  }, []);

  const setRecentContract = (contract) => {
    dispatch({ type: "SET_RECENT_CONTRACT", payload: contract });
    localStorage.setItem("recentContract", JSON.stringify(contract));
  };
  const handleContactClick = (contact) => {
    let updatedContracts;
    if (state.recentContracts.length > 0) {
      updatedContracts = [contact, ...state.recentContracts.slice(0, 3)];
    } else {
      updatedContracts = [contact];
    }
    setRecentContract(updatedContracts);
    navigate(`/contact/${contact.id}`);
  };

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
      <div className="p-3">
        {state.recentContracts.length > 0 && (
          <RecentlyContacted recentContracts={state.recentContracts} />
        )}
        <Input
          placeholder="نام مخاطب یا شماره همراه"
          value={value}
          onChangeValue={(e) => setValue(e.target.value)}
        />
      </div>

      <div className="scrollable-content">
        {isLoading && <Spinner />}
        <ContactList
          contacts={contacts}
          handleContactClick={handleContactClick}
        />
      </div>
    </div>
  );
}

export default withLayout(Home);
