import React from 'react';

function useKeydown(callback, code) {
  const handleKeyPress = key => {
    if (key.code === code) {
      callback()
    }
  };

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    }
  });
}

export default useKeydown;
