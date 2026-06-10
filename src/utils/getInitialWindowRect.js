export function getInitialWindowRect(width, height, index) {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight - 48;
  const maxLeft = Math.max(12, viewportWidth - width - 12);
  const maxTop = Math.max(12, viewportHeight - height - 12);

  if (viewportWidth <= 768) {
    return {
      left: 12,
      top: 110 + (index % 2) * 12,
      width: Math.min(viewportWidth - 24, width),
      height: Math.min(viewportHeight - 24, height),
    };
  }

  return {
    left: 24 + (index * 28) % maxLeft,
    top: 64 + (index * 22) % maxTop,
    width,
    height,
  };
}
