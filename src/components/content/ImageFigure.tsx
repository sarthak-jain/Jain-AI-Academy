import Image from "next/image";

interface ImageFigureProps {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

export function ImageFigure({
  src,
  alt,
  caption,
  width = 800,
  height = 400,
}: ImageFigureProps) {
  return (
    <figure className="my-6">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="rounded-lg w-full h-auto"
      />
      {caption && (
        <figcaption className="mt-2 text-sm text-gray-500 text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
