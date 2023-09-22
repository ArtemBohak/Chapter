import { FC, useEffect } from "react";
import { Navigate, Outlet, redirect } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { fetchIsAuthUser } from "@/src/redux/slices/user";
import { links } from "@/src/utils/links/links.types";

import { ProfileHeader, SidebarNavigation } from "./components";
import { NavigationTogglerProvider } from "src/context/NavigationToggler";

import styles from "./ProfileLayout.module.scss";
import { getTokenFromLC } from "@/src/utils/localstorage";

const ProfileLayout: FC = () => {
  const userSlice = useAppSelector((state) => state.userSlice);

  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   if (getTokenFromLC()) {
  //     dispatch(fetchIsAuthUser());
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // useEffect(() => {
  //   if (!userSlice.loading && !userSlice.isAuth) {
  //     redirect("/");
  //   }
  // }, [userSlice.isAuth, userSlice.loading]);

  // if (!getTokenFromLC()) {
  //   return <Navigate to={links.LOG_IN} replace={true} />;
  // }

  return (
    <>
      {!userSlice.loading && !userSlice.isAuth ? (
        <div className={styles["profile-layout"]}>
          <NavigationTogglerProvider>
            <SidebarNavigation />
            <ProfileHeader />
          </NavigationTogglerProvider>
          <main>
            {/* <div className={styles["profile-layout__body"]}> */}
            <Outlet />
            {/* </div> */}
          </main>
        </div>
      ) : (
        "Loading..."
      )}
    </>
  );
};

export default ProfileLayout;
