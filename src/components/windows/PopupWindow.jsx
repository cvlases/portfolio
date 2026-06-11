import { useLayoutEffect, useRef, useState } from 'react';
import LegacyFrame from './LegacyFrame';
import { fitWindowRect } from '../../utils/windowBounds';

export default function PopupWindow({
  windowItem,
  onClose,
  onFocus,
  onMove,
  onMinimize,
  onToggleMaximize,
  onRestoreAnimationComplete,
}) {
  const dragState = useRef(null);
  const popupRef = useRef(null);
  const minimizeTimeoutRef = useRef(null);
  const [minimizeStyle, setMinimizeStyle] = useState(null);

  useLayoutEffect(() => {
    if (!windowItem.restoringFromTaskbar) {
      return undefined;
    }

    const popupElement = popupRef.current;
    const taskbarButton = document.querySelector(`[data-taskbar-id="${windowItem.id}"]`);

    if (!popupElement || !taskbarButton) {
      onRestoreAnimationComplete(windowItem.id);
      return undefined;
    }

    const popupRect = popupElement.getBoundingClientRect();
    const buttonRect = taskbarButton.getBoundingClientRect();
    const scaleX = Math.max(0.12, buttonRect.width / popupRect.width);
    const scaleY = Math.max(0.12, buttonRect.height / popupRect.height);

    setMinimizeStyle({
      transform: `translate(${buttonRect.left - popupRect.left}px, ${buttonRect.top - popupRect.top}px) scale(${scaleX}, ${scaleY})`,
      opacity: 0.35,
    });

    const frameId = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setMinimizeStyle({
          transform: 'translate(0px, 0px) scale(1, 1)',
          opacity: 1,
        });
      });
    });

    window.clearTimeout(minimizeTimeoutRef.current);
    minimizeTimeoutRef.current = window.setTimeout(() => {
      onRestoreAnimationComplete(windowItem.id);
      setMinimizeStyle(null);
    }, 220);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(minimizeTimeoutRef.current);
    };
  }, [onRestoreAnimationComplete, windowItem.id, windowItem.restoringFromTaskbar]);

  const handleMinimize = () => {
    const popupElement = popupRef.current;
    const taskbarButton = document.querySelector(`[data-taskbar-id="${windowItem.id}"]`);

    if (!popupElement || !taskbarButton) {
      onMinimize(windowItem.id);
      return;
    }

    const popupRect = popupElement.getBoundingClientRect();
    const buttonRect = taskbarButton.getBoundingClientRect();
    const scaleX = Math.max(0.12, buttonRect.width / popupRect.width);
    const scaleY = Math.max(0.12, buttonRect.height / popupRect.height);

    setMinimizeStyle({
      transform: `translate(${buttonRect.left - popupRect.left}px, ${buttonRect.top - popupRect.top}px) scale(${scaleX}, ${scaleY})`,
      opacity: 0.35,
    });

    window.clearTimeout(minimizeTimeoutRef.current);
    minimizeTimeoutRef.current = window.setTimeout(() => {
      onMinimize(windowItem.id);
      setMinimizeStyle(null);
    }, 220);
  };

  const startDrag = (event) => {
    if (window.innerWidth <= 768 || windowItem.maximized) {
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
      ref={popupRef}
      className="popup"
      style={{
        top: windowItem.top,
        left: windowItem.left,
        width: windowItem.width,
        height: windowItem.height,
        zIndex: windowItem.zIndex,
        ...minimizeStyle,
      }}
      onClick={(event) => event.stopPropagation()}
      onMouseDown={() => onFocus(windowItem.id)}
    >
      <LegacyFrame
        title={windowItem.title}
        isMaximized={windowItem.maximized}
        onClose={() => onClose(windowItem.id)}
        onMinimize={handleMinimize}
        onToggleMaximize={() => onToggleMaximize(windowItem.id)}
        onDragStart={startDrag}
      />
      <iframe
        src={windowItem.url}
        title={windowItem.title}
        className="popup-iframe"
      />
    </section>
  );
}
