import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "@/src/redux/hooks";
import { isAuthUser } from "@/src/redux/slices/user";
import { getTokenFromLC } from "@/src/utils/localstorage";

export function useAuthUser() {
  const dispatch = useAppDispatch();
  const userSlice = useAppSelector((state) => state.userSlice);
  const navigate = useNavigate();

  useEffect(() => {
    if (getTokenFromLC()) {
      dispatch(isAuthUser());
    }

    if (!userSlice.loading || userSlice.isAuth) {
      navigate("/feed");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userSlice.loading, userSlice.isAuth]);

  return {};
}
