import { FC } from "react";

import "@/src/extensions/string.extensions";
import { FeedProvider } from "./context";
import styles from "./FeedPage.module.scss";

import { Feeds } from "./components";
import { getIdFromUrl } from "@/src/utils";

const FeedPage: FC = () => {
  const s =
    "https://res.cloudinary.com/de2bdafop/image/upload/v1700753943/chapter/posts/237_vpWRog1J8b5w-r535uBU1.webp";
  getIdFromUrl(s);

  return (
    <FeedProvider>
      <section className={styles["feed"]}>
        <div className={styles["feed__container"]}>
          <Feeds />
        </div>
      </section>
    </FeedProvider>
  );
};

export default FeedPage;
