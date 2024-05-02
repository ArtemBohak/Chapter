import { FC } from "react";
import { Outlet } from "react-router-dom";
import { NavigationTogglerProvider } from "@/src/context";
import styles from "./TermsPage.module.scss";
import { Header, SidebarNavigation } from "./components";

const TermsPage: FC = () => {
  return (
    <>
      <NavigationTogglerProvider>
        <SidebarNavigation />
        <Header />
      </NavigationTogglerProvider>
      <main>
        <section className={styles["terms"]}>
          <div className={styles["terms__container"]}>
            <h1 className={styles["title"]}>
              Terms & Conditions and Privacy Policy
            </h1>
            <Outlet />
          </div>
        </section>
      </main>
    </>
  );
};

export default TermsPage;
