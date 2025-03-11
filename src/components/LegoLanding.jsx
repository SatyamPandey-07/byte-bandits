import { useEffect, useRef } from "react";
import React from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin"; // Import ScrollTo Plugin
import legoBlock1 from "../assets/legoblock1.png";
import legoBlock2 from "../assets/legoblock2.png";
import legoBlock3 from "../assets/legoblock3.png";
import legoBlock4 from "../assets/legoblock4.png";
import legoBlock5 from "../assets/legoblock5.png";
import legoLogo from "../assets/lego-symbol.png"; // Add LEGO logo image

gsap.registerPlugin(ScrollToPlugin); // Register ScrollToPlugin

const legoBlocks = [legoBlock1, legoBlock2, legoBlock3, legoBlock4, legoBlock5];

const LegoLanding = () => {
  const legoContainer = useRef(null);
  const blockRefs = useRef([]);

  useEffect(() => {
    gsap.set(blockRefs.current, {
      x: () => Math.random() * (window.innerWidth - 100),
      y: () => Math.random() * (window.innerHeight - 100),
      rotation: () => Math.random() * 360,
    });

    const collapseBlocks = () => {
      gsap.to(blockRefs.current, {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        rotation: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
      });
    };

    const spreadBlocks = () => {
      gsap.to(blockRefs.current, {
        x: () => Math.random() * (window.innerWidth - 100),
        y: () => Math.random() * (window.innerHeight - 100),
        rotation: () => Math.random() * 360,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
      });
    };

    const container = legoContainer.current;
    container.addEventListener("mouseenter", spreadBlocks);
    container.addEventListener("mouseleave", collapseBlocks);

    return () => {
      container.removeEventListener("mouseenter", spreadBlocks);
      container.removeEventListener("mouseleave", collapseBlocks);
    };
  }, []);

  const handleLogoClick = () => {
    // LEGO Blocks Subtle Animation Before Scroll
    gsap.to(blockRefs.current, {
      y: "+=20",
      rotation: "+=10",
      duration: 0.5,
      ease: "power1.inOut",
    });

    // Smoothly Scroll to Hero Section
    gsap.to(window, {
      scrollTo: { y: "#hero-section", autoKill: false },
      duration: 1.5,
      ease: "power2.inOut",
    });
  };

  return (
    <div className="h-screen w-full flex justify-center items-center bg-gray-900 relative" style={{
        background: "#F9EF81",
        backgroundImage: "linear-gradient(180deg, #F9EF81, #F0ED81)",
      }}>
      {/* LEGO Blocks Container */}
      <div ref={legoContainer} className="lego-container absolute top-0 left-0 w-full h-full">
        {legoBlocks.map((block, i) => (
          <img
            key={i}
            ref={(el) => (blockRefs.current[i] = el)}
            src={block}
            alt={`Lego Block ${i + 1}`}
            className="lego-block absolute w-24 h-24"
          />
        ))}
      </div>

      {/* Centered LEGO Logo (Clickable) */}
      <img
        src={legoLogo}
        alt="LEGO Logo"
        className="relative z-10 w-32 h-32 cursor-pointer transition transform hover:scale-110"
        onClick={handleLogoClick}
      />
    </div>
  );
};

export default LegoLanding;
