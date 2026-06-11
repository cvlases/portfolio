const MOBILE_BREAKPOINT = 768;
const WINDOW_MARGIN = 12;
const TASKBAR_HEIGHT = 38;
const DESKTOP_ICON_STRIP = 132;
const MOBILE_TOP_OFFSET = 110;

export function getWindowBounds() {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const isMobile = viewportWidth <= MOBILE_BREAKPOINT;

  const minLeft = isMobile ? WINDOW_MARGIN : DESKTOP_ICON_STRIP;
  const minTop = isMobile ? MOBILE_TOP_OFFSET : WINDOW_MARGIN;
  const maxWidth = Math.max(320, viewportWidth - minLeft - WINDOW_MARGIN);
  const maxHeight = Math.max(240, viewportHeight - minTop - TASKBAR_HEIGHT - WINDOW_MARGIN);

  return {
    isMobile,
    minLeft,
    minTop,
    maxWidth,
    maxHeight,
    maxRight: viewportWidth - WINDOW_MARGIN,
    maxBottom: viewportHeight - TASKBAR_HEIGHT - WINDOW_MARGIN,
  };
}

export function fitWindowRect(rect) {
  const bounds = getWindowBounds();
  const width = Math.min(rect.width, bounds.maxWidth);
  const height = Math.min(rect.height, bounds.maxHeight);
  const maxLeft = Math.max(bounds.minLeft, bounds.maxRight - width);
  const maxTop = Math.max(bounds.minTop, bounds.maxBottom - height);

  return {
    width,
    height,
    left: Math.min(Math.max(rect.left, bounds.minLeft), maxLeft),
    top: Math.min(Math.max(rect.top, bounds.minTop), maxTop),
  };
}

export function getMaximizedWindowRect() {
  const bounds = getWindowBounds();

  return {
    left: bounds.minLeft,
    top: bounds.minTop,
    width: bounds.maxWidth,
    height: bounds.maxHeight,
  };
}
