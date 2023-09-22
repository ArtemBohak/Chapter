import { useMemo } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

const useGetUrlParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const currentLocation = window.location.origin + location.pathname;

  const { state, code, error_message } = useMemo(
    () => Object.fromEntries([...searchParams]),
    [searchParams]
  );

  return {
    state,
    code,
    error_message,
    currentLocation,
    setSearchParams,
  };
};

export default useGetUrlParams;
