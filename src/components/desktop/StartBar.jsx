import { useEffect, useState } from 'react';
import { startMenuItems } from '../../data/startMenuItems';

function StartMenuLevel({ items, depth, activePath, onActivateBranch, onOpenMenuItem, onCloseAll }) {
  return (
    <div className={`start-menu start-menu--depth-${depth}`}>
      {depth === 0 ? <div className="start-menu-rail"><span>Windows 95</span></div> : null}

      <div className="start-menu-panel">
        {items.map((item) => {
          const branchIsActive = activePath[depth] === item.key;
          const hasChildren = Array.isArray(item.children) && item.children.length > 0;

          return (
            <div
              key={item.key}
              className="start-menu-item-wrap"
              onMouseEnter={() => hasChildren && onActivateBranch(depth, item.key)}
            >
              <button
                type="button"
                className={`start-menu-item${branchIsActive ? ' is-active' : ''}`}
                onClick={() => {
                  if (hasChildren) {
                    onActivateBranch(depth, item.key);
                    return;
                  }

                  if (item.action === 'clear-all') {
                    onCloseAll();
                    return;
                  }

                  onOpenMenuItem(item);
                }}
              >
                <span>{item.label}</span>
                {hasChildren ? <span className="start-menu-arrow">▶</span> : null}
              </button>

              {hasChildren && branchIsActive ? (
                <StartMenuLevel
                  items={item.children}
                  depth={depth + 1}
                  activePath={activePath}
                  onActivateBranch={onActivateBranch}
                  onOpenMenuItem={onOpenMenuItem}
                  onCloseAll={onCloseAll}
                />
              ) : null}
            </div>
          );
        })}

        {depth === 0 ? (
          <div className="start-menu-divider">
            <button type="button" className="start-menu-item" onClick={onCloseAll}>
              <span>Clear Windows</span>
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function StartBar({
  startOpen,
  onToggleStart,
  onOpenMenuItem,
  onCloseAll,
  onFocusTaskbarItem,
  taskbarItems,
}) {
  const [activePath, setActivePath] = useState([]);

  useEffect(() => {
    if (!startOpen) {
      setActivePath([]);
      return;
    }

    if (startMenuItems[0]) {
      setActivePath([startMenuItems[0].key]);
    }
  }, [startOpen]);

  const activateBranch = (depth, key) => {
    setActivePath((current) => [...current.slice(0, depth), key]);
  };

  return (
    <footer className="start-bar" onClick={(event) => event.stopPropagation()}>
      {startOpen ? (
        <StartMenuLevel
          items={startMenuItems}
          depth={0}
          activePath={activePath}
          onActivateBranch={activateBranch}
          onOpenMenuItem={onOpenMenuItem}
          onCloseAll={onCloseAll}
        />
      ) : null}

      <button type="button" className="start-button-wrapper" onClick={onToggleStart}>
        <span className="start-button-image" aria-hidden="true" />
      </button>

      <div className="taskbar-windows">
        {taskbarItems.map((item) => (
          <button
            key={item.id}
            type="button"
            data-taskbar-id={item.id}
            className={`taskbar-window-pill${item.isActive ? ' is-active' : ''}${item.isMinimized ? ' is-minimized' : ''}`}
            onClick={() => onFocusTaskbarItem(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </footer>
  );
}
