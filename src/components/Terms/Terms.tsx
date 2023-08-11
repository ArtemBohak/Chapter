import { Link } from "react-router-dom";

const Terms = ({ message }: { message: string }) => (
  <div className="text-gray-1030 max-w-[302px] sm:max-w-[449px]">
    <p className="text-center text-2xs">
      {message}
      <Link className="underline" to="#">
        Terms & Conditions
      </Link>
      &nbsp; and&nbsp;
      <Link className="underline" to="#">
        Privacy Policy
      </Link>
    </p>
  </div>
);

export default Terms;
