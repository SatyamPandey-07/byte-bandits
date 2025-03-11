import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React from "react";
import Button from "../components/Button.jsx";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [loading, setLoading] = useState(true);
  const videoRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    if (!loading) {
      const tl = gsap.timeline();

      // Title animation
      tl.from(headingRef.current, {
        opacity: 0,
        y: -50,
        duration: 1,
        ease: "power2.out",
      }).from(
        subheadingRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.5"
      );

      // Parallax effect on scroll
      gsap.to(heroRef.current, {
        y: -50,
        scale: 1.05,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top center",
          scrub: 1,
        },
      });
    }
  }, [loading]);

  const handleVideoLoad = () => {
    setLoading(false);
  };

  return (
    <div
      ref={heroRef}
      className="relative h-dvh w-screen overflow-x-hidden bg-gray-900"
    >
      {loading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen bg-black">
          {/* Loading Animation */}
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}

      <div className="relative z-10 h-dvh w-screen overflow-hidden">
        {/* Background Video */}
        <video
          ref={videoRef}
          src="/back-lego.mp4"
          autoPlay
          loop
          muted
          onLoadedData={handleVideoLoad}
          className="absolute left-0 top-0 w-full h-full object-cover"
        />

        {/* Hero Content */}
        <div className="absolute left-0 top-0 z-40 flex h-full w-full flex-col items-center justify-center text-center px-4">
          <h1
            ref={headingRef}
            className="special-font hero-heading text-yellow-300 text-9xl"
          >
            Redefi<b>n</b>e
          </h1>
          <p
            ref={subheadingRef}
            className="mt-4 max-w-xl text-blue-100 text-lg md:text-2xl"
          >
            Enter the Metagame Layer <br /> Unleash the Play Economy
          </p>

          <Button
            id="watch-trailer"
            title="Watch Trailer"
            containerClass="bg-yellow-300 text-black flex-center gap-2 mt-5 px-6 py-3 rounded-lg text-lg font-bold"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;