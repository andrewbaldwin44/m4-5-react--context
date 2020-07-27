import React, { useState, useEffect } from 'react';

function usePersistedState(key, initialValue) {
  const [storedValue, setStoredValue] =
    useState(() => {
      const currentItem = window.localStorage.getItem(key);
      return currentItem ? JSON.parse(currentItem) : initialValue;
    });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(storedValue));
  }, [storedValue]);

  return [storedValue, setStoredValue];
}

export default usePersistedState;
