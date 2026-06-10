import PixelIconGraphic from './PixelIconGraphic';

export default function DesktopIcon({ icon, isSelected, onSelect, onOpen, mobileOpen }) {
  const handleClick = (event) => {
    event.stopPropagation();

    if (mobileOpen) {
      onOpen();
      return;
    }

    onSelect(icon.key);
  };

  return (
    <button
      type="button"
      className="icon"
      onClick={handleClick}
      onDoubleClick={(event) => {
        event.stopPropagation();
        onOpen();
      }}
      aria-label={icon.label}
    >
      {icon.kind === 'image' ? (
        <img
          src={icon.image}
          alt=""
          className="icon-img"
          style={icon.imageStyle}
        />
      ) : (
        <PixelIconGraphic kind={icon.kind} />
      )}
      <p className={`icon-txt ${isSelected ? 'icon-txt_selected' : ''}`}>{icon.label}</p>
    </button>
  );
}
