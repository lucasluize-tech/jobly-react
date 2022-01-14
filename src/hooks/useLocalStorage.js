import { useState, useEffect } from "react";

const useLocalStorage = (key, defaultValue = null) => {
  const [value, setValue] = useState(() => {
    let currentValue;
    try {
      currentValue = JSON.parse(localStorage.getItem(key) || defaultValue);
    } catch (error) {
      currentValue = defaultValue;
      console.log(error);
    }

    return currentValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
};

export default useLocalStorage;
