import {
  ChangeEvent,
  FC,
  MouseEvent,
  TouchEvent,
  useEffect,
  useState,
} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

import { EndpointsEnum, api } from "@/src/axios";
import { getDataFromLS, setDataToLS } from "@/src/utils";
import { useDebounce, useErrorBoundary } from "@/src/hooks";
import { IUser } from "@/src/types";
import styles from "./SearchPage.module.scss";
import { Icon, IconEnum, SearchField } from "@/src/components";
import defaultAvatar from "@/src/assets/SVG/default-user-avatar.svg";

const SearchPage: FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue, 500);

  const [recentSearchArr, setRecentSearchArr] = useState<Array<string>>(
    getDataFromLS("recentSearch") || []
  );

  const [resultArr, setResultArr] = useState<Array<IUser>>([]);

  const [showNotFoundMsg, setShowNotFoundMsg] = useState(false);

  const { state } = useLocation();
  const navigate = useNavigate();

  const setError = useErrorBoundary();

  console.log(state);

  const onHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setShowNotFoundMsg(false);
    setResultArr([]);
    setSearchValue(e.target.value);
  };

  const handleSearch = async (searchValue: string) => {
    try {
      const recentSearchArray = recentSearchArr;
      const res = await api.get(EndpointsEnum.USERS_SEARCH, {
        params: { query: searchValue },
      });
      if (res.data.length) {
        setResultArr(res.data);

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
          setShowNotFoundMsg(true);
        }
      }
    }
  };

  const onHandleRecentSearchClick = (
    e: MouseEvent<HTMLButtonElement> | TouchEvent<HTMLButtonElement>
  ) => {
    setSearchValue(e.currentTarget.value);
  };

  const onHandleCrossIconClick = () => {
    setShowNotFoundMsg(false);
    setResultArr([]);
    setSearchValue("");
  };

  useEffect(() => {
    setRecentSearchArr(getDataFromLS("recentSearch") || []);
  }, [debouncedSearchValue]);

  useEffect(() => {
    if (debouncedSearchValue !== "") {
      handleSearch(debouncedSearchValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchValue]);

  const renderRecentValue = (
    <>
      <p className={`${styles["title"]} ${styles["recent"]}`}>Recent</p>
      <ul className={`${styles["list"]} ${styles["recent"]}`}>
        {recentSearchArr.map((el, i) => {
          return (
            <li key={i}>
              <button onClick={onHandleRecentSearchClick} value={el}>
                <Icon icon={IconEnum.Search} size={16} />
                <span>{el}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );

  const renderResult = (
    <>
      <p>Result</p>
      <ul>
        {resultArr.slice(0, 5).map((el) => {
          return (
            <li key={el.id}>
              <Link to={`/${el.id}`}>
                <img
                  src={el.avatarUrl || defaultAvatar}
                  width={40}
                  height={40}
                />
                <span>{el.nickName}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
  const renderNotFound = (
    <>
      <p className={styles["title"]}>Result</p>
      <p className={`${styles["text"]} ${styles["not-found"]}`}>
        Nothing found.
      </p>
    </>
  );

  return (
    <div className={styles["search"]}>
      <div className={`${styles["field-wrapper"]} ${styles["mob"]}`}>
        <button onClick={() => navigate(-1)}>
          <Icon icon={IconEnum.Back} size={32} />
        </button>
        <div className={styles["input-container"]}>
          <SearchField
            id={"search-field"}
            name={"search-field"}
            dataAutomation={"search-field"}
            autoComplete="off"
            placeholder="Find your friends here"
            onChange={onHandleChange}
            value={searchValue}
          />
          {searchValue.length ? (
            <button
              className={styles["cross-btn"]}
              onClick={onHandleCrossIconClick}
            >
              <Icon icon={IconEnum.Cross} size={16} />
            </button>
          ) : null}
        </div>
      </div>
      <div className={`${styles["field-wrapper"]} ${styles["tab"]}`}>TAB</div>
      {!resultArr.length && !showNotFoundMsg ? renderRecentValue : null}
      {resultArr.length && !showNotFoundMsg ? renderResult : null}
      {!resultArr.length && showNotFoundMsg ? renderNotFound : null}
    </div>
  );
};

export default SearchPage;
