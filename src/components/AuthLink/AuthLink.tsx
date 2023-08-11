import { Link } from "react-router-dom";

const AuthLink = ({
  textMsg,
  linkMsg,
  link,
}: {
  textMsg: string;
  linkMsg: string;
  link: string;
}) => (
  <div className="text-sm mb-[85px] sm:mb-[127px]">
    <div>
      <span className="font-medium">{textMsg}</span>
      &nbsp;
      <Link className="text-blue-1030 font-semibold" to={link}>
        {linkMsg}
      </Link>
    </div>
  </div>
);

export default AuthLink;
