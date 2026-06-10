import { useRef } from 'react';
import LegacyFrame from './LegacyFrame';

export default function PopupWindow({
  windowItem,
  onClose,
  onFocus,
  onMove,
}) {
  const dragState = useRef(null);

  const startDrag = (event) => {
    if (window.innerWidth <= 768) {
      return;
    }

    onFocus(windowItem.id);
    const bounds = event.currentTarget.parentElement.getBoundingClientRect();
    dragState.current = {
      offsetX: event.clientX - bounds.left,
      offsetY: event.clientY - bounds.top,
    };

    const onMouseMove = (moveEvent) => {
      if (!dragState.current) {
        return;
      }

      const nextLeft = moveEvent.clientX - dragState.current.offsetX;
      const nextTop = moveEvent.clientY - dragState.current.offsetY;
      const maxLeft = Math.max(0, window.innerWidth - windowItem.width);
      const maxTop = Math.max(0, window.innerHeight - windowItem.height - 40);

      onMove(windowItem.id, {
        left: Math.max(0, Math.min(maxLeft, nextLeft)),
        top: Math.max(0, Math.min(maxTop, nextTop)),
      });
    };

    const onMouseUp = () => {
      dragState.current = null;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  return (
    <section
      className="popup"
      style={{
        top: windowItem.top,
        left: windowItem.left,
        width: windowItem.width,
        height: windowItem.height,
        zIndex: windowItem.zIndex,
      }}
      onClick={(event) => event.stopPropagation()}
      onMouseDown={() => onFocus(windowItem.id)}
    >
      <LegacyFrame title={windowItem.title} onClose={() => onClose(windowItem.id)} onDragStart={startDrag} />
      <iframe
        src={windowItem.url}
        title={windowItem.title}
        className="popup-iframe"
      />
    </section>
  );
}
