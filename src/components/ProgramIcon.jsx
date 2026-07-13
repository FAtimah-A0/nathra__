export default function ProgramIcon({ src, alt, size = 28 }) {
  return (
    <img
      className="program-icon"
      src={src}
      alt={alt}
      width={size}
      height={size}
      loading="lazy"
    />
  );
}
