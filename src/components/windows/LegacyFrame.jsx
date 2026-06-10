export default function LegacyFrame({ title, onClose, onDragStart }) {
  return (
    <div className="popup-header" onMouseDown={onDragStart}>
      <span className="popup-title">{title}</span>
      <button type="button" className="popup-close-button" onClick={onClose} aria-label={`Close ${title}`}>
        ✕
      </button>
    </div>
  );
}
