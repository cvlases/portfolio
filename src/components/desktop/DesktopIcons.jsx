import DesktopIcon from './DesktopIcon';

export default function DesktopIcons({ icons, selectedIcon, onSelect, onOpen, mobileOpen }) {
  return (
    <main className="desktop-icons">
      {icons.map((icon) => (
        <DesktopIcon
          key={icon.key}
          icon={icon}
          isSelected={selectedIcon === icon.key}
          onSelect={onSelect}
          onOpen={() => onOpen(icon)}
          mobileOpen={mobileOpen}
        />
      ))}
    </main>
  );
}
