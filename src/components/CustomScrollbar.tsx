"use client";

import { useEffect, useState, useRef } from 'react';

export function CustomScrollbar() {
  const [isActive, setIsActive] = useState(false);

  // Vertical scrollbar state
  const [thumbHeight, setThumbHeight] = useState(0);
  const [thumbTop, setThumbTop] = useState(0);

  // Horizontal scrollbar state
  const [isHorizontalActive, setIsHorizontalActive] = useState(false);
  const [thumbWidth, setThumbWidth] = useState(0);
  const [thumbLeft, setThumbLeft] = useState(0);

  const [isScrolling, setIsScrolling] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isDraggingHorizontal, setIsDraggingHorizontal] = useState(false);

  const scrollbarRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const dragStartY = useRef(0);
  const dragStartScrollTop = useRef(0);

  const dragStartX = useRef(0);
  const dragStartScrollLeft = useRef(0);

  const fadeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Activation effect (runs on mount and resize)
  useEffect(() => {
    const checkShouldActivate = () => {
      const isMobileOrTablet = window.innerWidth < 1024 ||
        ('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0);
      const isFirefox = navigator.userAgent.toLowerCase().includes('firefox');
      return isMobileOrTablet || isFirefox;
    };

    const handleResize = () => {
      if (checkShouldActivate()) {
        setIsActive(true);
        document.documentElement.classList.add('custom-scroll-active');
      } else {
        setIsActive(false);
        document.documentElement.classList.remove('custom-scroll-active');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      document.documentElement.classList.remove('custom-scroll-active');
    };
  }, []);

  // Recalculate thumb positions and sizes
  const updateScrollbar = () => {
    if (typeof window === 'undefined') return;

    // 1. Vertical calculation
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (scrollHeight <= clientHeight) {
      setThumbHeight(0);
    } else {
      const isMobile = window.innerWidth < 1024;
      let calculatedHeight = Math.max(40, (clientHeight / scrollHeight) * clientHeight);

      // On mobile, cap the vertical scrollbar thumb height to 80px so it doesn't grow too tall
      if (isMobile) {
        calculatedHeight = Math.min(80, calculatedHeight);
      }

      const maxScrollY = scrollHeight - clientHeight;
      const scrollRatioY = scrollTop / maxScrollY;
      const calculatedTop = scrollRatioY * (clientHeight - calculatedHeight);

      setThumbHeight(calculatedHeight);
      setThumbTop(calculatedTop);
    }

    // 2. Horizontal calculation
    const scrollWidth = document.documentElement.scrollWidth;
    const clientWidth = document.documentElement.clientWidth;
    const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

    if (scrollWidth <= clientWidth) {
      setIsHorizontalActive(false);
      setThumbWidth(0);
    } else {
      setIsHorizontalActive(true);
      const isMobile = window.innerWidth < 1024;
      let calculatedWidth = Math.max(40, (clientWidth / scrollWidth) * clientWidth);

      // On mobile, cap the horizontal scrollbar thumb width to 80px so it doesn't grow too wide
      if (isMobile) {
        calculatedWidth = Math.min(80, calculatedWidth);
      }

      const maxScrollX = scrollWidth - clientWidth;
      const scrollRatioX = scrollLeft / maxScrollX;
      const calculatedLeft = scrollRatioX * (clientWidth - calculatedWidth);

      setThumbWidth(calculatedWidth);
      setThumbLeft(calculatedLeft);
    }
  };

  // Listen to scroll, resize, and DOM updates
  useEffect(() => {
    if (!isActive) return;

    const handleScroll = () => {
      updateScrollbar();

      setIsScrolling(true);
      if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
      fadeTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 1500);
    };

    updateScrollbar();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateScrollbar);

    const observer = new ResizeObserver(() => {
      updateScrollbar();
    });
    observer.observe(document.body);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateScrollbar);
      observer.disconnect();
      if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
    };
  }, [isActive]);

  // Handle Drag-to-scroll (Vertical)
  const handleDragStart = (clientY: number) => {
    setIsDragging(true);
    dragStartY.current = clientY;
    dragStartScrollTop.current = window.scrollY || document.documentElement.scrollTop;
    document.body.style.userSelect = 'none';
  };

  const handleDrag = (clientY: number) => {
    if (!isDragging) return;

    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollHeight <= clientHeight) return;

    const deltaY = clientY - dragStartY.current;
    const trackHeight = clientHeight - thumbHeight;
    const scrollRatio = deltaY / trackHeight;
    const maxScroll = scrollHeight - clientHeight;
    const targetScrollTop = dragStartScrollTop.current + scrollRatio * maxScroll;

    window.scrollTo(window.scrollX, Math.max(0, Math.min(maxScroll, targetScrollTop)));
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    document.body.style.userSelect = '';
  };

  // Handle Drag-to-scroll (Horizontal)
  const handleDragStartHorizontal = (clientX: number) => {
    setIsDraggingHorizontal(true);
    dragStartX.current = clientX;
    dragStartScrollLeft.current = window.scrollX || document.documentElement.scrollLeft;
    document.body.style.userSelect = 'none';
  };

  const handleDragHorizontal = (clientX: number) => {
    if (!isDraggingHorizontal) return;

    const scrollWidth = document.documentElement.scrollWidth;
    const clientWidth = document.documentElement.clientWidth;

    if (scrollWidth <= clientWidth) return;

    const deltaX = clientX - dragStartX.current;
    const trackWidth = clientWidth - thumbWidth;
    const scrollRatio = deltaX / trackWidth;
    const maxScrollX = scrollWidth - clientWidth;
    const targetScrollLeft = dragStartScrollLeft.current + scrollRatio * maxScrollX;

    window.scrollTo(Math.max(0, Math.min(maxScrollX, targetScrollLeft)), window.scrollY);
  };

  const handleDragEndHorizontal = () => {
    setIsDraggingHorizontal(false);
    document.body.style.userSelect = '';
  };

  useEffect(() => {
    if (isDragging) {
      const handleMouseMove = (e: MouseEvent) => handleDrag(e.clientY);
      const handleTouchMove = (e: TouchEvent) => {
        if (e.touches.length > 0) handleDrag(e.touches[0].clientY);
      };
      const handleMouseUp = () => handleDragEnd();

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchend', handleMouseUp);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('touchend', handleMouseUp);
      };
    }
  }, [isDragging, thumbHeight]);

  useEffect(() => {
    if (isDraggingHorizontal) {
      const handleMouseMove = (e: MouseEvent) => handleDragHorizontal(e.clientX);
      const handleTouchMove = (e: TouchEvent) => {
        if (e.touches.length > 0) handleDragHorizontal(e.touches[0].clientX);
      };
      const handleMouseUp = () => handleDragEndHorizontal();

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchend', handleMouseUp);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('touchend', handleMouseUp);
      };
    }
  }, [isDraggingHorizontal, thumbWidth]);

  // Handle clicking on vertical track
  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === thumbRef.current) return;

    const clientHeight = document.documentElement.clientHeight;
    const clickY = e.clientY;
    const scrollHeight = document.documentElement.scrollHeight;
    const maxScroll = scrollHeight - clientHeight;

    const targetScrollRatio = (clickY - thumbHeight / 2) / (clientHeight - thumbHeight);
    window.scrollTo({
      top: Math.max(0, Math.min(maxScroll, targetScrollRatio * maxScroll)),
      behavior: 'smooth',
    });
  };

  // Handle clicking on horizontal track
  const handleTrackClickHorizontal = (e: React.MouseEvent<HTMLDivElement>) => {
    const horizontalThumb = document.getElementById('custom-scrollbar-thumb-horizontal');
    if (e.target === horizontalThumb) return;

    const clientWidth = document.documentElement.clientWidth;
    const clickX = e.clientX;
    const scrollWidth = document.documentElement.scrollWidth;
    const maxScrollX = scrollWidth - clientWidth;

    const targetScrollRatio = (clickX - thumbWidth / 2) / (clientWidth - thumbWidth);
    window.scrollTo({
      left: Math.max(0, Math.min(maxScrollX, targetScrollRatio * maxScrollX)),
      behavior: 'smooth',
    });
  };

  if (!isActive) return null;

  const showScrollbar = isScrolling || isDragging || isDraggingHorizontal;

  const isMobileDevice = typeof window !== 'undefined' && window.innerWidth < 1024;
  const scrollbarSize = isMobileDevice ? '5px' : '10px';

  return (
    <>
      {/* Vertical Scrollbar */}
      {thumbHeight > 0 && (
        <div
          ref={scrollbarRef}
          className={`custom-scrollbar-track ${showScrollbar ? 'opacity-100' : 'opacity-20 hover:opacity-100'}`}
          style={{
            width: scrollbarSize,
          }}
          onClick={handleTrackClick}
          onTouchStart={(e) => e.stopPropagation()}
        >
          <div
            ref={thumbRef}
            className="custom-scrollbar-thumb"
            style={{
              width: scrollbarSize,
              height: `${thumbHeight}px`,
              transform: `translateY(${thumbTop}px)`,
            }}
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleDragStart(e.clientY);
            }}
            onTouchStart={(e) => {
              e.stopPropagation();
              if (e.touches.length > 0) {
                handleDragStart(e.touches[0].clientY);
              }
            }}
          />
        </div>
      )}

      {/* Horizontal Scrollbar */}
      {isHorizontalActive && thumbWidth > 0 && (
        <div
          className={`custom-scrollbar-track-horizontal ${showScrollbar ? 'opacity-100' : 'opacity-20 hover:opacity-100'}`}
          style={{
            position: 'fixed',
            left: '4px',
            right: '4px',
            bottom: '4px',
            height: scrollbarSize,
            zIndex: 9999,
            borderRadius: '999px',
            background: 'rgba(0, 0, 0, 0.05)',
            backdropFilter: 'blur(2px)',
            transition: 'opacity 0.3s ease',
            cursor: 'pointer',
          }}
          onClick={handleTrackClickHorizontal}
          onTouchStart={(e) => e.stopPropagation()}
        >
          <div
            id="custom-scrollbar-thumb-horizontal"
            className="custom-scrollbar-thumb-horizontal"
            style={{
              width: `${thumbWidth}px`,
              height: scrollbarSize,
              transform: `translateX(${thumbLeft}px)`,
              borderRadius: '999px',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              background: 'linear-gradient(90deg, #DC2626 0%, #1E40AF 60%, #0B1324 100%)',
              cursor: 'grab',
              transition: 'background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleDragStartHorizontal(e.clientX);
            }}
            onTouchStart={(e) => {
              e.stopPropagation();
              if (e.touches.length > 0) {
                handleDragStartHorizontal(e.touches[0].clientX);
              }
            }}
          />
        </div>
      )}
    </>
  );
}
