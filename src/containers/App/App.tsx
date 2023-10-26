import { useEffect } from "react";

import { useAppDispatch, fetchIsAuthUser } from "@/src/redux";
import { getTokenFromLC } from "@/src/utils";

import { Router } from "..";

const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (getTokenFromLC()) {
      dispatch(fetchIsAuthUser());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="wrapper">
      <Router />
    </div>
  );
};

export default App;
