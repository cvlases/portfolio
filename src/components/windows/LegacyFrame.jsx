function stopHeaderDrag(event) {
  event.stopPropagation();
}

export default function LegacyFrame({ title, isMaximized, onClose, onMinimize, onToggleMaximize, onDragStart }) {
  return (
    <div className="popup-header" onMouseDown={onDragStart}>
      <span className="popup-title">{title}</span>
      <div className="popup-controls" onMouseDown={stopHeaderDrag}>
        <button
          type="button"
          className="popup-control-button popup-control-button--minimize"
          onClick={onMinimize}
          aria-label={`Minimize ${title}`}
        >
          <span className="popup-control-icon" aria-hidden="true" />
        </button>
        <button
          type="button"
          className={`popup-control-button popup-control-button--maximize${isMaximized ? ' is-active' : ''}`}
          onClick={onToggleMaximize}
          aria-label={`${isMaximized ? 'Restore' : 'Maximize'} ${title}`}
        >
          <span className="popup-control-icon" aria-hidden="true" />
        </button>
        <button type="button" className="popup-control-button popup-control-button--close" onClick={onClose} aria-label={`Close ${title}`}>
          <span className="popup-control-icon" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
