import Image from "next/image";
import { cn, getInitials } from "@/lib/utils";

export type AvatarSize = "sm" | "md" | "lg";
export type AvatarShape = "circle" | "square";

const SIZE_CLASSES: Record<AvatarSize, string> = {
  sm: "size-8 text-caption",
  md: "size-9 text-label",
  lg: "size-12 text-body font-semibold",
};

const SIZE_PIXELS: Record<AvatarSize, number> = { sm: 32, md: 36, lg: 48 };

export interface AvatarProps {
  name: string;
  src?: string | null;
  size?: AvatarSize;
  /** Square suits organization logos, circle suits people. */
  shape?: AvatarShape;
  className?: string;
}

export function Avatar({ name, src, size = "md", shape = "circle", className }: AvatarProps) {
  const classes = cn(
    "inline-flex shrink-0 select-none items-center justify-center overflow-hidden font-medium",
    shape === "circle" ? "rounded-full" : "rounded-control",
    SIZE_CLASSES[size],
    className,
  );

  if (src) {
    return (
      <Image
        src={src}
        alt={name}
        width={SIZE_PIXELS[size]}
        height={SIZE_PIXELS[size]}
        className={cn(classes, "object-cover")}
      />
    );
  }

  return (
    <span role="img" aria-label={name} className={cn(classes, "bg-primary-subtle text-primary-hover")}>
      {getInitials(name)}
    </span>
  );
}
