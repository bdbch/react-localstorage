import { string } from "prop-types";
import { useCallback, useEffect, useState } from "react";

const useLocalStorage = <T>(
  key: string,
  defaultValue?: T
): {
  data: T | undefined;
  set: (val: T) => void;
  remove: () => void;
} => {
  const [data, setData] = useState<T | undefined>(undefined);

  const set = useCallback(
    data => {
      const newData = JSON.stringify(data);
      window.localStorage.setItem(key, newData);
    },
    [key]
  );

  const remove = useCallback(() => {
    window.localStorage.removeItem(key);
  }, [key]);

  useEffect(() => {
    let data = window.localStorage.getItem(key);

    if (
      (!data || typeof data === "undefined" || typeof data === null) &&
      defaultValue
    ) {
      set(defaultValue);
    }

    if (data && typeof data !== "undefined" && typeof data !== null) {
      const parsedData = JSON.parse(data);
      if (parsedData) {
        setData(parsedData);
      }
    }
  }, [key]);

  const checkLocalStorage = useCallback(
    (e: StorageEvent) => {
      if (e.storageArea === window.localStorage) {
        if (key === e.key && e.newValue) {
          setData(JSON.parse(e.newValue));
        }
      }
    },
    [key]
  );

  useEffect(() => {
    window.addEventListener("storage", checkLocalStorage);

    return () => {
      window.removeEventListener("storage", checkLocalStorage);
    };
  }, [key]);

  return { data, set, remove };
};

export default useLocalStorage;
