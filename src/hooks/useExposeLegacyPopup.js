import { useEffect } from 'react';

export function useExposeLegacyPopup(openWindow, closeAll) {
  useEffect(() => {
    window.openPopup = (url, width = 1000, height = 650) => {
      openWindow({ key: url, url, width, height });
    };

    window.closeAllPopups = () => {
      closeAll();
    };

    return () => {
      delete window.openPopup;
      delete window.closeAllPopups;
    };
  }, [closeAll, openWindow]);
}
