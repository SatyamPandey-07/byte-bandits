import React, { useRef } from "react";

const navItems = ["Shop", "Discover", "Help"];

const NavBar = () => {
  const navContainerRef = useRef(null);

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-0 z-50 h-16 bg-white/80 backdrop-blur-md shadow-md transition-all duration-300"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex items-center justify-between px-6">
          <div className="flex items-center gap-7">
            <img src="src\assets\lego-symbol.png" alt="logo" className="w-20" />
          </div>
          <div className="flex items-center space-x-6">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={`#${item.toLowerCase()}`}
                className="text-gray-800 hover:text-blue-500 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </nav>
      </header>
    </div>
  );
};

export default NavBar;
