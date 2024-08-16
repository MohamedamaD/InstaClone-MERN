import { useEffect, useState } from "react";

export const useDebounce = (value, delay) => {
  const [term, setTerm] = useState("");

  useEffect(() => {
    const id = setTimeout(() => {
      setTerm(value);
    }, delay);
    return () => {
      clearTimeout(id);
    };
  }, [delay, value]);

  return term;
};
