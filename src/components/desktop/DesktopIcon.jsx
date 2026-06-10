import PixelIconGraphic from './PixelIconGraphic';

export default function DesktopIcon({ icon, isSelected, onSelect, onOpen, mobileOpen }) {
  const handleClick = (event) => {
    event.stopPropagation();
    onSelect(icon.key);
    onOpen();
  };

  return (
    <button
      type="button"
      className="icon"
      onClick={handleClick}
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
