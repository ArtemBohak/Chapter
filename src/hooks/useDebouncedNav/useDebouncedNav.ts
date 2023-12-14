import { useNavigate } from "react-router-dom";

export const useDebouncedNav = (timeoutValue: number) => {
  const navigate = useNavigate();

  return (url: string, state?: string) => {
    setTimeout(() => navigate(url, { state }), timeoutValue);
  };
};
