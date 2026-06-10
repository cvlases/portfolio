import { startMenuItems } from '../../data/startMenuItems';

export default function StartBar({ startOpen, onToggleStart, onOpenMenuItem, onCloseAll, taskbarItems }) {
  return (
    <footer className="start-bar">
      {startOpen ? (
        <div className="start-menu">
          {startMenuItems.map((item) => (
            <button key={item.key} type="button" className="start-menu-item" onClick={() => onOpenMenuItem(item)}>
              {item.label}
            </button>
          ))}
          <button type="button" className="start-menu-item" onClick={onCloseAll}>
            Clear Windows
          </button>
        </div>
      ) : null}

      <button type="button" className="start-button-wrapper" onClick={onToggleStart}>
        <span className="start-button-image" aria-hidden="true" />
      </button>

      <div className="taskbar-windows">
        {taskbarItems.map((item) => (
          <div key={item.id} className="taskbar-window-pill">
            {item.label}
          </div>
        ))}
      </div>
    </footer>
  );
}
