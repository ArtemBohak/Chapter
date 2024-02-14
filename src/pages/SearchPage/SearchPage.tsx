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
import { useAppSelector } from "@/src/redux";
import { getDataFromLS, setDataToLS } from "@/src/utils";
import { useDebounce, useErrorBoundary, useGetScreenSize } from "@/src/hooks";
import { IUser } from "@/src/types";
import styles from "./SearchPage.module.scss";
import { FollowButton, Icon, IconEnum, SearchField } from "@/src/components";
import defaultAvatar from "@/src/assets/SVG/default-user-avatar.svg";

const SearchPage: FC = () => {
  const id = useAppSelector((state) => state.userSlice.user.id);

  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue, 500);

  const [recentSearchArr, setRecentSearchArr] = useState<Array<string>>(
    getDataFromLS("recentSearch") || []
  );

  const [resultArr, setResultArr] = useState<Array<IUser>>([]);

  const [showNotFoundMsg, setShowNotFoundMsg] = useState(false);

  const { state } = useLocation();
  const users: Array<IUser> | null = state;

  const navigate = useNavigate();
  const setError = useErrorBoundary();

  const [screenSize] = useGetScreenSize();
  const isMobScreen = screenSize <= 465;

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

  useEffect(() => {
    if (users) setResultArr(users);
  }, [users]);

  const renderRecentValue = (
    <>
      <p className={`${styles["title"]} ${styles["recent-title"]}`}>Recent</p>
      <ul className={`${styles["list"]} ${styles["recent-list"]}`}>
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
      <p className={`${styles["title"]} ${styles["search-title"]}`}>Result</p>
      <ul className={`${styles["list"]} ${styles["search-list"]}`}>
        {resultArr.map((el) => {
          return (
            <li key={el.id}>
              <Link to={`/${el.id}`}>
                <img
                  src={el.avatarUrl || defaultAvatar}
                  width={52}
                  height={52}
                />
                <span className={styles["nickname"]}>
                  {isMobScreen && el.nickName.length > 15
                    ? el.nickName.slice(0, 15) + "..."
                    : el.nickName}
                </span>
              </Link>
              <FollowButton
                id={id}
                followList={[1, 2, 3]}
                classNames={styles["follow-btn"]}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
  const renderNotFound = (
    <>
      <p className={styles["title"]}>Result</p>
      <p className={`${styles["text"]} ${styles["not-found-text"]}`}>
        Nothing found.
      </p>
    </>
  );

  return (
    <section className={styles["search"]}>
      <div className={styles["search__wrapper"]}>
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
        <div className={`${styles["field-wrapper"]} ${styles["tab"]}`}>
          <h3>Search</h3>
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
        {!resultArr.length && !showNotFoundMsg ? renderRecentValue : null}
        {resultArr.length && !showNotFoundMsg ? renderResult : null}
        {!resultArr.length && showNotFoundMsg ? renderNotFound : null}
      </div>
    </section>
  );
};

export default SearchPage;
