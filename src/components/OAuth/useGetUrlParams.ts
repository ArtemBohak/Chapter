import { useMemo } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

const useGetUrlParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const currentLocation = window.location.origin + location.pathname;

  const params = useMemo(
    () => Object.fromEntries([...searchParams]),
    [searchParams]
  );

  const { state, code, error_message } = params;

  return {
    state,
    code,
    error_message,
    currentLocation,
    setSearchParams,
  };
};

export default useGetUrlParams;
