"use client";

import Image from "next/image";

interface ImageCardProps {
    src: string;
    alt: string;
    priority?: boolean;
}

export default function ImageCard({ src, alt, priority = false }: ImageCardProps) {
    return (
        <div className="relative w-full h-full rounded-lg border p-4">
            <Image
                src={src}
                alt={alt}
                fill
                className="object-contain"
                priority={priority}
            />
        </div>
    );
}