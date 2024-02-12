import { FC } from "react";
import { useLocation } from "react-router-dom";

const SearchPage: FC = () => {
  const { state } = useLocation();
  console.log(state);

  return <div>SEARCH</div>;
};

export default SearchPage;
