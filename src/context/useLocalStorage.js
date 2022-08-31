import { useEffect, useState } from "react";

const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    const item = localStorage.getItem(key);
    if (item !== null) return JSON.parse(item);

    if (typeof defaultValue === "function") return defaultValue();
    else return defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
};
export default useLocalStorage;
