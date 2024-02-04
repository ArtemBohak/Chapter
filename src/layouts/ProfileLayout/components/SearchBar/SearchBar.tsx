import {
  ChangeEvent,
  FC,
  MouseEvent,
  TouchEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import { EndpointsEnum, api } from "@/src/axios";
import { useDebounce, useErrorBoundary, useOutsideClick } from "@/src/hooks";
import { getDataFromLS, setDataToLS } from "@/src/utils";
import { ISearchBar } from "./SearchBar.type";
import styles from "./SearchBar.module.scss";

import { PopUpMenu, SearchField } from "@/src/components";
import { AxiosError } from "axios";

const SearchBar: FC<ISearchBar> = ({ inputClassName }) => {
  const [searchValue, setSearchValue] = useState("");
  const [recentSearchArr, setRecentSearchArr] = useState<Array<string>>([]);
  const [showRecentSearchPopup, setShowRecentSearchPopup] = useState(false);
  const [showNotFoundPopup, setShowNotFoundPopup] = useState(false);
  const [resultArr, setResultArr] = useState(null);

  const searchRef = useRef(null);
  const notFoundRef = useRef(null);

  const debouncedSearchValue = useDebounce(searchValue, 500);

  const setError = useErrorBoundary();

  useOutsideClick(searchRef, setShowRecentSearchPopup, "search-field");
  useOutsideClick(notFoundRef, setShowNotFoundPopup, "search-field");

  const handleSearch = async (searchValue: string) => {
    try {
      setShowNotFoundPopup(false);
      const recentSearchArray = recentSearchArr;
      const res = await api.get(EndpointsEnum.USERS_SEARCH, {
        params: { query: searchValue },
      });

      setResultArr(res.data);
      recentSearchArray.push(searchValue);

      setDataToLS({
        recentSearch: Array.from(new Set(recentSearchArray.slice(-5))),
      });
    } catch (e) {
      if (e instanceof AxiosError) {
        setError(e);

        if (e.response?.status === 404) {
          setShowRecentSearchPopup(false);
          setShowNotFoundPopup(true);
        }
      }
    }
  };

  const onHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const onHandleFocus = () => {
    setShowRecentSearchPopup(true);
  };

  const onHandleRecentSearchValueClick = (
    e: MouseEvent<HTMLButtonElement> | TouchEvent<HTMLButtonElement>
  ) => {
    setSearchValue(e.currentTarget.value);
    setShowRecentSearchPopup(false);
  };

  useEffect(() => {
    if (debouncedSearchValue !== "") {
      handleSearch(debouncedSearchValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchValue]);

  useEffect(() => {
    setRecentSearchArr(getDataFromLS("recentSearch") || []);
  }, [searchValue]);

  return (
    <div className={styles["search__wrapper"]}>
      <SearchField
        id={"search-field"}
        name={"search-field"}
        dataAutomation={"search-field"}
        className={inputClassName}
        placeholder="Find your friends here"
        value={searchValue}
        onChange={onHandleChange}
        onFocus={onHandleFocus}
        autoComplete="off"
      />
      <PopUpMenu
        isOpen={
          (!!recentSearchArr.length && showRecentSearchPopup) ||
          resultArr.length
        }
        setIsOpen={setShowRecentSearchPopup}
        nodeRef={searchRef}
        classNames={styles["search__popup"]}
      >
        {resultArr && resultArr.length ? (
          <div>
            <p>Result</p>
            <ul>
              {resultArr.map((el) => {
                return (
                  <li key={el.id}>
                    <img src={el.avatarUrl} width={40} height={40} />
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <div>
            <p>Recent</p>
            <ul>
              {recentSearchArr.map((el, i) => {
                return (
                  <li key={i}>
                    <button onClick={onHandleRecentSearchValueClick} value={el}>
                      {el}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </PopUpMenu>
      <PopUpMenu
        isOpen={showNotFoundPopup}
        setIsOpen={setShowNotFoundPopup}
        nodeRef={notFoundRef}
        classNames={styles["search__popup"]}
      >
        <div>
          <p>Nothing found.</p>
        </div>
      </PopUpMenu>
    </div>
  );
};

export default SearchBar;
