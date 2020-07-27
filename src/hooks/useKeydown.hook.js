import React, { useEffect } from 'react';

function useKeydown(callback, code) {
  const handleKeyPress = key => {
    if (key.code === code) {
      callback()
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    }
  });
}

export default useKeydown;
