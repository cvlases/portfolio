import { useState } from 'react';
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
  const { windows, taskbarItems, openWindow, closeWindow, closeAll, bringToFront, updateWindowPosition } =
    useWindowManager();

  useExposeLegacyPopup(openWindow, closeAll);
  useGhostCursor();

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
        {windows.map((windowItem) => (
          <PopupWindow
            key={windowItem.id}
            windowItem={windowItem}
            onClose={closeWindow}
            onFocus={bringToFront}
            onMove={updateWindowPosition}
          />
        ))}
      </div>

      <StartBar
        startOpen={startOpen}
        onToggleStart={() => setStartOpen((value) => !value)}
        onOpenMenuItem={handleMenuOpen}
        onCloseAll={() => {
          closeAll();
          setStartOpen(false);
        }}
        taskbarItems={taskbarItems}
      />
    </div>
  );
}
