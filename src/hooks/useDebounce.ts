import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, delay: number = 1000) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(
    () => {
      const t = setTimeout(() => {
        console.log(value);
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(t);
      };
    },
    [value, delay] // re-run if value or delay changes
  );
  return debouncedValue;
}
