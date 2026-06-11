import { fitWindowRect, getWindowBounds } from './windowBounds';

export function getInitialWindowRect(width, height, index) {
  const bounds = getWindowBounds();

  if (bounds.isMobile) {
    return fitWindowRect({
      left: bounds.minLeft,
      top: bounds.minTop + (index % 2) * 12,
      width,
      height,
    });
  }

  const horizontalRange = Math.max(0, bounds.maxWidth - Math.min(width, bounds.maxWidth));
  const verticalRange = Math.max(0, bounds.maxHeight - Math.min(height, bounds.maxHeight));

  return fitWindowRect({
    left: bounds.minLeft + ((index * 37) % Math.max(1, horizontalRange + 1)),
    top: bounds.minTop + 28 + ((index * 29) % Math.max(1, verticalRange + 1)),
    width,
    height,
  });
}
