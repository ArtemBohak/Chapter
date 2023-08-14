import { Link } from "react-router-dom";

const Terms = ({
  message,
  policyLinkMsg = "Privacy Policy",
  termsLinkMsgText = "Terms & Conditions",
}: {
  message: string;
  policyLinkMsg?: string;
  termsLinkMsgText?: string;
}) => (
  <div className="text-gray-1030 max-w-[302px] sm:max-w-[449px]">
    <p className="text-center text-2xs">
      {message}
      <Link className="underline" to="#">
        {termsLinkMsgText}
      </Link>
      &nbsp; and&nbsp;
      <Link className="underline" to="#">
        {policyLinkMsg}
      </Link>
    </p>
  </div>
);

export default Terms;
