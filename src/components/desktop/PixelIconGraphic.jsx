export default function PixelIconGraphic({ kind }) {
  return <span className={`pixel-icon pixel-icon--${kind}`} aria-hidden="true" />;
}
