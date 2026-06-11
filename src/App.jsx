import { useEffect, useState } from 'react';
import DesktopIcons from './components/desktop/DesktopIcons';
import StartBar from './components/desktop/StartBar';
import PopupWindow from './components/windows/PopupWindow';
import { desktopIcons } from './data/desktopIcons';
import { useExposeLegacyPopup } from './hooks/useExposeLegacyPopup';
import { useGhostCursor } from './hooks/useGhostCursor';
import { useWindowManager } from './hooks/useWindowManager';

function isMobileViewport() {
  return typeof window !== 'undefined' && window.innerWidth <= 768;
}

export default function App() {
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [startOpen, setStartOpen] = useState(false);
  const {
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
    clearTaskbarRestore,
  } =
    useWindowManager();

  useExposeLegacyPopup(openWindow, closeAll);
  useGhostCursor();

  useEffect(() => {
    const aboutIcon = desktopIcons.find((icon) => icon.key === 'about');

    if (aboutIcon) {
      openWindow(aboutIcon);
    }
  }, [openWindow]);

  const handleOpenIcon = (icon) => {
    setSelectedIcon(icon.key);
    setStartOpen(false);

    if (icon.action === 'clear-all') {
      closeAll();
      return;
    }

    openWindow(icon);
  };

  const handleDesktopClick = () => {
    setSelectedIcon(null);
    setStartOpen(false);
  };

  const handleMenuOpen = (item) => {
    if (item.externalUrl) {
      window.open(item.externalUrl, item.target ?? '_blank', item.target === '_blank' ? 'noopener,noreferrer' : undefined);
      setStartOpen(false);
      return;
    }

    openWindow(item);
    setStartOpen(false);
  };

  return (
    <div className="desktop" onClick={handleDesktopClick}>
      <DesktopIcons
        icons={desktopIcons}
        selectedIcon={selectedIcon}
        onSelect={setSelectedIcon}
        onOpen={handleOpenIcon}
        mobileOpen={isMobileViewport()}
      />

      <div className="window-layer">
        {windows.filter((windowItem) => !windowItem.minimized).map((windowItem) => (
          <PopupWindow
            key={windowItem.id}
            windowItem={windowItem}
            onClose={closeWindow}
            onFocus={bringToFront}
            onMove={updateWindowPosition}
            onMinimize={minimizeWindow}
            onToggleMaximize={toggleMaximizeWindow}
            onRestoreAnimationComplete={clearTaskbarRestore}
          />
        ))}
      </div>

      <StartBar
        startOpen={startOpen}
        onToggleStart={() => setStartOpen((value) => !value)}
        onOpenMenuItem={handleMenuOpen}
        onFocusTaskbarItem={restoreWindowFromTaskbar}
        onCloseAll={() => {
          closeAll();
          setStartOpen(false);
        }}
        taskbarItems={taskbarItems}
      />
    </div>
  );
}
