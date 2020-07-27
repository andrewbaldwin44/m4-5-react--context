import React, { useState } from 'react';

function usePersistedState(key, initialValue) {
  const [storedValue, setStoredValue] =
    useState(() => {
      const currentItem = window.localStorage.getItem(key);
      return currentItem ? JSON.parse(currentItem) : initialValue;
    });

  const setValue = newValue => {
    setStoredValue(newValue);

    window.localStorage.setItem(key, JSON.stringify(newValue));
  }

  return [storedValue, setValue];
}

export default usePersistedState;
