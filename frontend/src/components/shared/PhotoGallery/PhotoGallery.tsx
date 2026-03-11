"use client"

import { useState } from "react"
import { ApplicationPhoto } from "@/types"

interface PhotoGalleryProps {
  photos: ApplicationPhoto[]
}

export const PhotoGallery = ({ photos }: PhotoGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0)

  if (photos.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 bg-neutral-100 text-neutral-400 text-sm">
        Нет фотографий
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-square w-full bg-neutral-100 overflow-hidden">
        <img
          src={photos[activeIndex].file}
          alt={`Фото ${activeIndex + 1}`}
          className="w-full h-full object-contain"
        />
        {photos.length > 1 && (
          <>
            <button
              onClick={() => setActiveIndex((prev) => Math.max(prev - 1, 0))}
              disabled={activeIndex === 0}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white w-8 h-8 flex items-center justify-center disabled:opacity-30 transition-colors"
            >
              ‹
            </button>
            <button
              onClick={() => setActiveIndex((prev) => Math.min(prev + 1, photos.length - 1))}
              disabled={activeIndex === photos.length - 1}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white w-8 h-8 flex items-center justify-center disabled:opacity-30 transition-colors"
            >
              ›
            </button>
          </>
        )}
        <span className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1">
          {activeIndex + 1} / {photos.length}
        </span>
      </div>

      {photos.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {photos.map((photo, index) => (
            <button
              key={photo.id}
              onClick={() => setActiveIndex(index)}
              className={`shrink-0 w-16 h-16 overflow-hidden border-2 transition-colors ${
                index === activeIndex ? "border-black" : "border-transparent"
              }`}
            >
              <img
                src={photo.file}
                alt={`Миниатюра ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}