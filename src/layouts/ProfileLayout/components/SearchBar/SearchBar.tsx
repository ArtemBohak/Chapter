import {
  ChangeEvent,
  FC,
  MouseEvent,
  TouchEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { AxiosError } from "axios";

import { EndpointsEnum, api } from "@/src/axios";
import { useDebounce, useErrorBoundary, useOutsideClick } from "@/src/hooks";
import { getDataFromLS, setDataToLS } from "@/src/utils";
import { ISearchBar } from "./SearchBar.type";
import { IUser } from "@/src/types";
import styles from "./SearchBar.module.scss";

import { PopUpMenu, SearchField } from "@/src/components";

import defaultAvatar from "@/src/assets/SVG/default-user-avatar.svg";
import { Link } from "react-router-dom";

const SearchBar: FC<ISearchBar> = ({ inputClassName }) => {
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue, 500);

  const [recentSearchArr] = useState<Array<string>>(
    getDataFromLS("recentSearch") || []
  );
  const [showRecentSearchPopup, setShowRecentSearchPopup] = useState(true);

  const [resultArr, setResultArr] = useState<Array<IUser>>([]);
  const [showResultPopup, setShowResultPopup] = useState(false);

  const [showNotFoundPopup, setShowNotFoundPopup] = useState(false);

  const searchRef = useRef(null);
  const notFoundRef = useRef(null);
  const resultRef = useRef(null);

  useOutsideClick(searchRef, setShowRecentSearchPopup, "search-field");
  useOutsideClick(resultRef, setShowResultPopup, "search-field");
  useOutsideClick(notFoundRef, setShowNotFoundPopup, "search-field");

  const setError = useErrorBoundary();

  const handleSearch = async (searchValue: string) => {
    try {
      setShowNotFoundPopup(false);

      const recentSearchArray = recentSearchArr;
      const res = await api.get(EndpointsEnum.USERS_SEARCH, {
        params: { query: searchValue },
      });
      if (res.data.length) {
        setResultArr(res.data);
        setShowRecentSearchPopup(false);
        setShowResultPopup(true);
        if (!recentSearchArr.includes(searchValue))
          recentSearchArray.push(searchValue);

        setDataToLS({
          recentSearch: Array.from(new Set(recentSearchArray.slice(-5))),
        });
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        setError(e);

        if (e.response?.status === 404) {
          setShowRecentSearchPopup(false);
          setShowResultPopup(false);
          setShowNotFoundPopup(true);
        }
      }
    } finally {
      setSearchValue("");
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
        isOpen={showRecentSearchPopup && !!recentSearchArr.length}
        setIsOpen={setShowRecentSearchPopup}
        nodeRef={searchRef}
        backdropClassName={`${styles["popup"]} ${styles["popup-recent"]}`}
        bodyClassName={styles["popup__body"]}
        contentWrapperClassNames={`${styles["popup__content-wrapper"]} ${styles["recent"]}`}
      >
        <>
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
        </>
      </PopUpMenu>
      <PopUpMenu
        isOpen={showResultPopup}
        setIsOpen={setShowResultPopup}
        nodeRef={resultRef}
        backdropClassName={styles["popup"]}
        bodyClassName={styles["popup__body"]}
        contentWrapperClassNames={styles["popup__content-wrapper"]}
      >
        <>
          <p>Result</p>
          <ul>
            {resultArr.map((el) => {
              return (
                <li key={el.id}>
                  <Link
                    to={`${el.id}`}
                    onClick={() => setShowResultPopup(false)}
                  >
                    <img
                      src={el.avatarUrl || defaultAvatar}
                      width={40}
                      height={40}
                    />
                    <p>{el.nickName}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </>
      </PopUpMenu>
      <PopUpMenu
        isOpen={showNotFoundPopup}
        setIsOpen={setShowNotFoundPopup}
        nodeRef={notFoundRef}
        backdropClassName={`${styles["popup"]} ${styles["not-found"]}`}
        bodyClassName={styles["popup__body"]}
        contentWrapperClassNames={`${styles["popup__content-wrapper"]} ${styles["not-found"]}`}
      >
        <>
          <p>Nothing found.</p>
        </>
      </PopUpMenu>
    </div>
  );
};

export default SearchBar;
