import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { windowTitles } from '../data/windowTitles';
import { getInitialWindowRect } from '../utils/getInitialWindowRect';
import { fitWindowRect } from '../utils/windowBounds';

function getTitle(url) {
  return windowTitles[url] ?? url.split('/').pop()?.replace('.html', '') ?? 'Window';
}

export function useWindowManager() {
  const [windows, setWindows] = useState([]);
  const counterRef = useRef(1);
  const zIndexRef = useRef(1000);

  const bringToFront = useCallback((id) => {
    setWindows((current) =>
      current.map((item) => (item.id === id ? { ...item, zIndex: zIndexRef.current++ } : item))
    );
  }, []);

  const openWindow = useCallback((config) => {
    setWindows((current) => {
      const id = `${config.key ?? 'window'}-${counterRef.current++}`;
      const rect = getInitialWindowRect(config.width ?? 1000, config.height ?? 650, current.length);

      return [
        ...current,
        {
          id,
          key: config.key ?? id,
          title: config.title ?? getTitle(config.url),
          url: config.url,
          width: rect.width,
          height: rect.height,
          left: rect.left,
          top: rect.top,
          zIndex: zIndexRef.current++,
        },
      ];
    });
  }, []);

  const closeWindow = useCallback((id) => {
    setWindows((current) => current.filter((item) => item.id !== id));
  }, []);

  const closeAll = useCallback(() => {
    setWindows([]);
  }, []);

  const updateWindowPosition = useCallback((id, position) => {
    setWindows((current) =>
      current.map((item) => (item.id === id ? { ...item, ...fitWindowRect({ ...item, ...position }) } : item))
    );
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindows((current) => current.map((item) => ({ ...item, ...fitWindowRect(item) })));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const taskbarItems = useMemo(
    () => {
      const activeZIndex = Math.max(0, ...windows.map((item) => item.zIndex));

      return windows.map((item) => ({
        id: item.id,
        label: item.title,
        isActive: item.zIndex === activeZIndex,
      }));
    },
    [windows]
  );

  return {
    windows,
    taskbarItems,
    openWindow,
    closeWindow,
    closeAll,
    bringToFront,
    updateWindowPosition,
  };
}
