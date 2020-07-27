import React, { useEffect } from 'react';

function useDocumentTitle(title, fallbackTitle) {
  useEffect(() => {
    document.title = title

    return () => {
      document.title = fallbackTitle;
    }
  });
}

export default useDocumentTitle;
