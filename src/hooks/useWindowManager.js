import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { windowTitles } from '../data/windowTitles';
import { getInitialWindowRect } from '../utils/getInitialWindowRect';
import { fitWindowRect, getMaximizedWindowRect } from '../utils/windowBounds';

function getTitle(url) {
  return windowTitles[url] ?? url.split('/').pop()?.replace('.html', '') ?? 'Window';
}

export function useWindowManager() {
  const [windows, setWindows] = useState([]);
  const counterRef = useRef(1);
  const zIndexRef = useRef(1000);

  const bringToFront = useCallback((id) => {
    setWindows((current) =>
      current.map((item) =>
        item.id === id ? { ...item, minimized: false, zIndex: zIndexRef.current++ } : item
      )
    );
  }, []);

  const openWindow = useCallback((config) => {
    setWindows((current) => {
      const targetKey = config.key ?? null;
      const existingWindow = current.find((item) => (targetKey ? item.key === targetKey : false) || item.url === config.url);

      if (existingWindow) {
        return current.map((item) =>
          item.id === existingWindow.id
            ? {
                ...item,
                minimized: false,
                zIndex: zIndexRef.current++,
              }
            : item
        );
      }

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
          minimized: false,
          maximized: false,
          restoringFromTaskbar: false,
          restoreRect: null,
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
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              ...fitWindowRect({ ...item, ...position }),
              ...(item.maximized ? { maximized: false, restoreRect: null } : {}),
            }
          : item
      )
    );
  }, []);

  const minimizeWindow = useCallback((id) => {
    setWindows((current) =>
      current.map((item) =>
        item.id === id ? { ...item, minimized: true, restoringFromTaskbar: false } : item
      )
    );
  }, []);

  const restoreWindowFromTaskbar = useCallback((id) => {
    setWindows((current) =>
      current.map((item) => {
        if (item.id !== id) {
          return item;
        }

        if (item.minimized) {
          return {
            ...item,
            minimized: false,
            restoringFromTaskbar: true,
            zIndex: zIndexRef.current++,
          };
        }

        return {
          ...item,
          restoringFromTaskbar: false,
          zIndex: zIndexRef.current++,
        };
      })
    );
  }, []);

  const toggleMaximizeWindow = useCallback((id) => {
    setWindows((current) =>
      current.map((item) => {
        if (item.id !== id) {
          return item;
        }

        if (item.maximized && item.restoreRect) {
          return {
            ...item,
            ...fitWindowRect(item.restoreRect),
            maximized: false,
            minimized: false,
            restoreRect: null,
            zIndex: zIndexRef.current++,
          };
        }

        return {
          ...item,
          ...getMaximizedWindowRect(),
          minimized: false,
          maximized: true,
          restoreRect: {
            left: item.left,
            top: item.top,
            width: item.width,
            height: item.height,
          },
          zIndex: zIndexRef.current++,
        };
      })
    );
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindows((current) =>
        current.map((item) => {
          if (item.maximized) {
            return { ...item, ...getMaximizedWindowRect() };
          }

          return {
            ...item,
            ...fitWindowRect(item),
            restoreRect: item.restoreRect ? fitWindowRect(item.restoreRect) : null,
          };
        })
      );
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
        isMinimized: item.minimized,
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
    minimizeWindow,
    toggleMaximizeWindow,
    restoreWindowFromTaskbar,
    clearTaskbarRestore: (id) =>
      setWindows((current) =>
        current.map((item) => (item.id === id ? { ...item, restoringFromTaskbar: false } : item))
      ),
  };
}
