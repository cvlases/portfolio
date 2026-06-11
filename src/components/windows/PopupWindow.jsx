import { useRef } from 'react';
import LegacyFrame from './LegacyFrame';
import { fitWindowRect } from '../../utils/windowBounds';

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

      const nextRect = fitWindowRect({
        ...windowItem,
        left: moveEvent.clientX - dragState.current.offsetX,
        top: moveEvent.clientY - dragState.current.offsetY,
      });

      onMove(windowItem.id, {
        left: nextRect.left,
        top: nextRect.top,
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
