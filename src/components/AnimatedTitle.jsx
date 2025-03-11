import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";
import React from "react";

gsap.registerPlugin(ScrollTrigger);

const AnimatedTitle = ({ title, containerClass }) => {
  const containerRef = useRef(null);
  const wordsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        wordsRef.current,
        {
          opacity: 0,
          y: 50,
          scale: 0.8,
          rotateX: 20,
          rotateY: -10,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1.2,
          rotateX: 0,
          rotateY: 0,
          color: "#FFD700",
          textShadow: "2px 2px 8px rgba(255, 215, 0, 0.8)",
          ease: "power2.out",
          duration: 1,
          stagger: 0.05,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "center 50%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert(); // Cleanup GSAP animations
  }, []);

  return (
    <div
      ref={containerRef}
      className={clsx(
        "animated-title text-center text-4xl md:text-6xl font-bold text-yellow-500",
        containerClass
      )}
    >
      {title.split("<br />").map((line, index) => (
        <div key={index} className="flex justify-center items-center flex-wrap gap-3 px-10 md:gap-4">
          {line.split(" ").map((word, idx) => (
            <span
              key={idx}
              ref={(el) => (wordsRef.current[idx] = el)}
              className="animated-word block p-2 bg-yellow-500 text-black rounded-md shadow-lg transform"
              dangerouslySetInnerHTML={{ __html: word }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default AnimatedTitle;
