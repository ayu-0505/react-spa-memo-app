import { useEffect, useState } from "react";

export default function useLocalStrage(key, intialValue) {
  const [value, setValue] = useState(() => {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : intialValue;
    } catch (error) {
      if (error instanceof SyntaxError) {
        console.error(error);
      } else {
        throw error;
      }
      return intialValue;
    }
  });

  useEffect(() => {
    try {
      const jsonValue = JSON.stringify(value);
      localStorage.setItem(key, jsonValue);
    } catch (error) {
      if (error instanceof SyntaxError) {
        console.error(error);
      } else {
        throw error;
      }
    }
  }, [key, value]);

  return [value, setValue];
}
