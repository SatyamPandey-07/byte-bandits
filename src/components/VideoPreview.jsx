import { gsap } from "gsap";
import { useState, useRef, useEffect } from "react";
import React from "react";

export const VideoPreview = ({ children }) => {
  const [isHovering, setIsHovering] = useState(false);
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  const handleMouseMove = ({ clientX, clientY, currentTarget }) => {
    const rect = currentTarget.getBoundingClientRect();
    const xOffset = clientX - (rect.left + rect.width / 2);
    const yOffset = clientY - (rect.top + rect.height / 2);

    if (isHovering) {
      gsap.to(sectionRef.current, {
        x: xOffset * 0.2,
        y: yOffset * 0.2,
        rotationY: xOffset * 0.05,
        rotationX: -yOffset * 0.05,
        transformPerspective: 600,
        duration: 0.8,
        ease: "power2.out",
      });

      gsap.to(contentRef.current, {
        x: -xOffset * 0.1,
        y: -yOffset * 0.1,
        duration: 0.8,
        ease: "power2.out",
      });
    }
  };

  useEffect(() => {
    if (!isHovering) {
      gsap.to(sectionRef.current, {
        x: 0,
        y: 0,
        rotationY: 0,
        rotationX: 0,
        duration: 1,
        ease: "power2.out",
      });

      gsap.to(contentRef.current, {
        x: 0,
        y: 0,
        duration: 1,
        ease: "power2.out",
      });
    }
  }, [isHovering]);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="absolute z-50 size-full overflow-hidden rounded-lg lego-block-shadow"
      style={{
        perspective: "600px",
        clipPath: "polygon(10% 0%, 90% 0%, 100% 90%, 0% 100%)", // LEGO block-like clip-path
      }}
    >
      <div
        ref={contentRef}
        className="origin-center rounded-lg lego-texture"
        style={{ transformStyle: "preserve-3d" }}
      >
        {children}
      </div>
    </section>
  );
};

export default VideoPreview;