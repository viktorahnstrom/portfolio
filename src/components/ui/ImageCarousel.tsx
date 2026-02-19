"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";

interface ImageCarouselProps {
  images: string[];
  title: string;
}

function Lightbox({ 
  images, 
  currentIndex, 
  onClose, 
  onPrevious, 
  onNext, 
  onGoToSlide,
  title 
}: {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onGoToSlide: (index: number) => void;
  title: string;
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrevious();
      if (e.key === "ArrowRight") onNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [onClose, onPrevious, onNext]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 99999,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        type="button"
        onClick={onClose}
        style={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
          zIndex: 10,
          width: "3rem",
          height: "3rem",
          borderRadius: "9999px",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "none",
          cursor: "pointer",
        }}
        aria-label="Close lightbox"
      >
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Main Image */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          maxWidth: "1200px",
          height: "70vh",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[currentIndex]}
          alt={`${title} - Image ${currentIndex + 1}`}
          fill
          className="object-contain"
          sizes="100vw"
          priority
        />
      </div>

      {/* Previous Button */}
      {images.length > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onPrevious();
          }}
          style={{
            position: "absolute",
            left: "1rem",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            width: "3.5rem",
            height: "3.5rem",
            borderRadius: "9999px",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            cursor: "pointer",
          }}
          aria-label="Previous image"
        >
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Next Button */}
      {images.length > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          style={{
            position: "absolute",
            right: "1rem",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            width: "3.5rem",
            height: "3.5rem",
            borderRadius: "9999px",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            cursor: "pointer",
          }}
          aria-label="Next image"
        >
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Bottom Bar */}
      <div
        style={{
          position: "absolute",
          bottom: "1.5rem",
          left: 0,
          right: 0,
          zIndex: 10,
        }}
      >
        {/* Counter */}
        {images.length > 1 && (
          <div style={{ textAlign: "center", color: "white", marginBottom: "0.75rem" }}>
            {currentIndex + 1} / {images.length}
          </div>
        )}

        {/* Thumbnails */}
        {images.length > 1 && (
          <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", padding: "0 1rem" }}>
            {images.map((img, index) => (
              <button
                type="button"
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  onGoToSlide(index);
                }}
                style={{
                  position: "relative",
                  width: "4rem",
                  height: "3rem",
                  flexShrink: 0,
                  borderRadius: "0.25rem",
                  overflow: "hidden",
                  border: index === currentIndex ? "2px solid #F9541D" : "2px solid transparent",
                  opacity: index === currentIndex ? 1 : 0.5,
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ImageCarousel({ images, title }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (!images || images.length === 0) return null;

  return (
    <>
      {/* Carousel */}
      <div className="relative max-w-2xl mx-auto">
        {/* Main Image - Clickable */}
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="relative aspect-video w-full rounded-lg overflow-hidden shadow-lg cursor-zoom-in block group"
        >
          <Image
            src={images[currentIndex]}
            alt={`${title} - Image ${currentIndex + 1}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Click to enlarge hint */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-sm bg-black/50 px-3 py-1 rounded-full flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
              Click to enlarge
            </span>
          </div>

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute top-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
              {currentIndex + 1} / {images.length}
            </div>
          )}
        </button>

        {/* Navigation Controls - Arrows + Dots in a row */}
        {images.length > 1 && (
        <div className="flex items-center justify-center gap-4 mt-4">
            {/* Previous Arrow */}
            <button
            type="button"
            onClick={goToPrevious}
            className="w-10 h-10 flex items-center justify-center transition-opacity hover:opacity-60"
            aria-label="Previous image"
            >
            <svg className="w-6 h-6 text-neutral-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
            </button>

            {/* Dots */}
            <div className="flex items-center gap-3">
            {images.map((_, index) => (
                <button
                type="button"
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex
                    ? "bg-primary-orange"
                    : "bg-neutral-black/40 hover:bg-neutral-black/60"
                }`}
                aria-label={`Go to image ${index + 1}`}
                />
            ))}
            </div>

            {/* Next Arrow */}
            <button
            type="button"
            onClick={goToNext}
            className="w-10 h-10 flex items-center justify-center transition-opacity hover:opacity-60"
            aria-label="Next image"
            >
            <svg className="w-6 h-6 text-neutral-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
            </button>
        </div>
        )}
      </div>

      {/* Lightbox - Rendered via Portal to body */}
      {lightboxOpen && mounted && createPortal(
        <Lightbox
          images={images}
          currentIndex={currentIndex}
          onClose={() => setLightboxOpen(false)}
          onPrevious={goToPrevious}
          onNext={goToNext}
          onGoToSlide={goToSlide}
          title={title}
        />,
        document.body
      )}
    </>
  );
}