import { useCallback, useEffect, useReducer, useState } from "react";
import Input from "../components/base/Input";
import useDebounce from "../customHook/useDebounce";
import Api from "../services/api";
import Spinner from "../components/base/Spinner";
import ContactList from "../components/ContactList";
import withLayout from "../components/withLayout";
import RecentlyContacted from "../components/RecentlyContacted";
import { useNavigate } from "react-router-dom";
import { ToastError } from "./../utils/handleError";
import { reducer, initialState } from "./../reducers/recentlyContactReducer";
import Select from "./../components/base/Select";
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

  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const debouncedValue = useDebounce(value, 250);
  const fetchData = useCallback(
    async (signal) => {
      setIsLoading(true);
      try {
        const key = selectValue ? selectValue : "first_name";
        let params = {
          where: {
            [key]: {
              contains: debouncedValue,
            },
          },
        };

        const { items } = await Api.getContacts(params, signal);

        setContacts(items);
      } catch (err) {
        ToastError(err);
      } finally {
        setIsLoading(false);
      }
    },
    [debouncedValue, selectValue]
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

    fetchData(signal);

    return () => {
      controller.abort();
    };
  }, [fetchData]);

  const onChangeSelect = (e) => {
    setCheckChooseFilter(false);
    setSelectValue(e.target.value);
  };

  // 
  const onClickInput = (e) => {
    if (selectValue === "") {
      ToastError(" لطفا نوع فیلتر را مشخص کنید ");
      setCheckChooseFilter(true);
    }
  };

  return (
    <div className="content">
      <div className="p-3">
        {state.recentContracts.length > 0 && (
          <RecentlyContacted recentContracts={state.recentContracts} />
        )}
        <div>
          <Select
            titleSelected="فیلتر مورد نظر را انتخاب کنید"
            value={selectValue}
            options={filterOptions}
            onChangeValue={onChangeSelect}
          />
          <Input
            readOnly={checkChooseFilter}
            placeholder="نام مخاطب یا شماره همراه"
            value={value}
            onChangeValue={(e) => setValue(e.target.value)}
            onClickInput={onClickInput}
          />
        </div>
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
