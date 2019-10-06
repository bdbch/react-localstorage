import { useCallback, useEffect, useState } from "react";

const useLocalStorage = <T>(
  key: string,
  defaultValue?: T,
): [T | undefined, (val: T) => void, () => void] => {
  const [data, setData] = useState<T | undefined>(undefined);

  const set = useCallback(
    (updateData: T) => {
      const newData = JSON.stringify(updateData);
      window.localStorage.setItem(key, newData);
    },
    [key],
  );

  const remove = useCallback(() => {
    window.localStorage.removeItem(key);
  }, [key]);

  useEffect(() => {
    const currentData = window.localStorage.getItem(key);

    if (
      (!currentData ||
        typeof currentData === "undefined" ||
        typeof currentData === null) &&
      defaultValue
    ) {
      set(defaultValue);
    }

    if (
      currentData &&
      typeof currentData !== "undefined" &&
      typeof currentData !== null
    ) {
      const parsedData = JSON.parse(currentData);
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
    [key],
  );

  useEffect(() => {
    window.addEventListener("storage", checkLocalStorage);

    return () => {
      window.removeEventListener("storage", checkLocalStorage);
    };
  }, [key]);

  return [data, set, remove];
};

export default useLocalStorage;
