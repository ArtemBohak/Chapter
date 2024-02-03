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

  const searchRef = useRef(null);

  const debouncedSearchValue = useDebounce(searchValue, 500);

  const setError = useErrorBoundary();

  useOutsideClick(searchRef, setShowRecentSearchPopup, "search-field");

  const handleSearch = async (searchValue: string) => {
    try {
      const recentSearchArray = recentSearchArr;
      const res = await api.get(EndpointsEnum.USERS_SEARCH, {
        params: { query: searchValue },
      });
      console.log(res.data);
      recentSearchArray.push(searchValue);

      setDataToLS({
        recentSearch: Array.from(new Set(recentSearchArray.slice(-5))),
      });
    } catch (e) {
      if (e instanceof AxiosError) {
        setError(e);
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
        isOpen={!!recentSearchArr.length && showRecentSearchPopup}
        setIsOpen={setShowRecentSearchPopup}
        nodeRef={searchRef}
        classNames={styles["search__popup"]}
      >
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
      </PopUpMenu>
    </div>
  );
};

export default SearchBar;
