import { useEffect, useRef, useState } from "react";

function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState("");
  const timeRef = useRef();

  useEffect(() => {
    timeRef.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeRef.current);
    };
  }, [delay, value]);

  return debouncedValue;
}

export default useDebounce;
