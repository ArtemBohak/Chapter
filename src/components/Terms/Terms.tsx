import { Link } from "react-router-dom";
import cn from "classnames";

import styles from "./Terms.module.scss";

const Terms = ({
  message,
  policyLinkMsg = "Privacy Policy",
  termsLinkMsgText = "Terms & Conditions",
}: {
  message: string;
  policyLinkMsg?: string;
  termsLinkMsgText?: string;
}) => (
  <div className={cn(styles["terms"])}>
    <p className={cn(styles["terms__text"])}>
      {message}
      <Link className={cn(styles["terms__link"])} to="#">
        {termsLinkMsgText}
      </Link>
      &nbsp; and&nbsp;
      <Link className={cn(styles["terms__link"])} to="#">
        {policyLinkMsg}
      </Link>
    </p>
  </div>
);

export default Terms;
