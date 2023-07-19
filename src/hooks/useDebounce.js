import { useEffect, useState } from "react";

const useDebounce = (value, delay = 300) => {
  const [debouncedText, setDebouncedText] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedText(value);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);

  return debouncedText;
};

export default useDebounce;
