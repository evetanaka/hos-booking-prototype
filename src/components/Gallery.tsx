interface Props { images: string[]; }

export function Gallery({ images }: Props) {
  return (
    <div id="gallery" className="gallery fade-in">
      {images.map((src, i) => (
        <img key={i} src={src} alt={`Photo ${i + 1}`} loading="lazy" />
      ))}
    </div>
  );
}
