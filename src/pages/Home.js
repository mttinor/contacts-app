import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import Input from "../components/base/Input";
import useDebounce from "../customHook/useDebounce";
import Api from "../services/api";
import Spinner from "../components/base/Spinner";
import ContactList from "../components/ContactList";
import withLayout from "../components/withLayout";
import RecentlyContacted from "../components/RecentlyContacted";
import { useNavigate } from "react-router-dom";
import HandleError from "./../utils/handleError";
import { reducer, initialState } from "./../reducers/recentlyContactReducer";
import Select from "./../components/base/Select";
import helpers from "../utils/helpers";
import { useTranslation } from "react-i18next";

function Home() {
  const filterOptions = [
    {
      value: "first_name",
      name: "نام",
    },
    {
      value: "last_name",
      name: "خانوادگی",
    },
    {
      value: "phone",
      name: "شماره همراه",
    },
  ];
  const [state, dispatch] = useReducer(reducer, initialState);
  const [value, setValue] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [checkChooseFilter, setCheckChooseFilter] = useState(false);
  const [limit, setLimit] = useState(30);
  const [totalItems, setTotalItems] = useState(0);
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const debouncedValue = useDebounce(value);
  const divRef = useRef(null);
  const [isEndOfScroll, setIsEndOfScroll] = useState(false);
  const { t } = useTranslation();

  //  controles fetch data
  const fetchData = useCallback(
    async (signal) => {
      setIsLoading(true);
      try {
        const key = selectValue ? selectValue : "";
        let params = {
          limit,
        };
        if (key) {
          params.where = {
            [key]: {
              contains: helpers.capitalizeFirstLetter(debouncedValue),
            },
          };
        }

        const { items, meta } = await Api.getContacts(params, signal);

        setTotalItems(meta?.total);
        setContacts(items);
      } catch (err) {
        HandleError.ToastError(err);
      } finally {
        setIsEndOfScroll(false);
        setIsLoading(false);
      }
    },
    [debouncedValue, limit]
  );

  // get localStorage and set recent contact
  useEffect(() => {
    const recentContract = localStorage.getItem("recentContract");
    if (recentContract && recentContract !== "undefined") {
      dispatch({
        type: "SET_RECENT_CONTRACT",
        payload: JSON.parse(recentContract),
      });
    }
  }, []);

  // set localStorage and keep 4 last conatcts user shows
  const setRecentContract = (contract) => {
    dispatch({ type: "SET_RECENT_CONTRACT", payload: contract });
    localStorage.setItem("recentContract", JSON.stringify(contract));
  };

  // set 4 last contact user shows
  const handleContactClick = (contact) => {
    let updatedContracts;
    if (state.recentContracts.length > 0) {
      const user = state.recentContracts.find((x) => x.id === contact.id);
      if (!user)
        updatedContracts = [contact, ...state.recentContracts.slice(0, 3)];
      else {
        updatedContracts = [...state.recentContracts];
      }
    } else {
      updatedContracts = [contact];
    }
    setRecentContract(updatedContracts);
    navigate(`/contact/${contact.id}`);
  };

  // fetch data and cancel some request to backend
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    fetchData(signal);

    return () => {
      controller.abort();
    };
  }, [fetchData]);

  // when user change select at first allow to user to write then set value
  const onChangeSelect = (e) => {
    setValue("");
    setCheckChooseFilter(false);
    setSelectValue(e.target.value);
  };

  // when user click on input and user dosent choose filter show alert
  const onClickInput = () => {
    if (selectValue === "") {
      HandleError.ToastError(t("filterKind"));
      setCheckChooseFilter(true);
    }
  };

  // handleScroll for understand when user and end of scroll
  const handleScroll = () => {
    const div = divRef.current;
    if (div) {
      const { scrollTop, scrollHeight, clientHeight } = div;
      const atBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
      if (atBottom) setIsEndOfScroll(atBottom);
    }
  };

  // event listener for scroll
  useEffect(() => {
    const div = divRef.current;
    if (div) {
      div.addEventListener("scroll", handleScroll);
      return () => {
        div.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  // Increase the limit when reaching the end of scroll
  useEffect(() => {
    if (isEndOfScroll && totalItems > limit) {
      setLimit((prevLimit) => prevLimit + 30);
    }
  }, [isEndOfScroll]);
  return (
    <div className="content">
      <div className="p-3">
        {state.recentContracts.length > 0 && (
          <RecentlyContacted recentContracts={state.recentContracts} />
        )}
        <div>
          <Select
            titleSelected={t("filterChoose")}
            value={selectValue}
            options={filterOptions}
            onChangeValue={onChangeSelect}
          />
          <Input
            readOnly={checkChooseFilter}
            placeholder={t("filterPlaceholder")}
            value={value}
            onChangeValue={(e) => setValue(e.target.value)}
            onClickInput={onClickInput}
          />
        </div>
      </div>

      <div ref={divRef} className="scrollable-content">
        {isLoading ? <Spinner /> : null}
        <ContactList
          contacts={contacts}
          handleContactClick={handleContactClick}
        />
      </div>
    </div>
  );
}

export default withLayout(Home);
