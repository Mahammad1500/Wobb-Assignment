interface AvatarProps {
  src: string;
  alt: string;
  size?: "sm" | "md" | "lg" | "xl";
  verified?: boolean;
}

const sizeMap = {
  sm: "w-10 h-10",
  md: "w-14 h-14",
  lg: "w-20 h-20",
  xl: "w-28 h-28",
};

export function Avatar({ src, alt, size = "md", verified = false }: AvatarProps) {
  return (
    <div className="relative inline-block shrink-0">
      <img
        src={src}
        alt={alt}
        className={`${sizeMap[size]} rounded-full object-cover ring-2 ring-white/10`}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src =
            `https://ui-avatars.com/api/?name=${encodeURIComponent(alt)}&background=7c3aed&color=fff`;
        }}
      />
      {verified && (
        <span
          className="absolute bottom-0 right-0 bg-blue-500 rounded-full flex items-center justify-center text-white"
          style={{ width: "1.1rem", height: "1.1rem", fontSize: "0.6rem" }}
          aria-label="Verified account"
          title="Verified"
        >
          ✓
        </span>
      )}
    </div>
  );
}
