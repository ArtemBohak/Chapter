import { useAppDispatch } from "@/src/redux/hooks";
import { Router } from "..";
import { useEffect } from "react";
import { getTokenFromLC } from "@/src/utils";
import { fetchIsAuthUser } from "@/src/redux/slices";

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
