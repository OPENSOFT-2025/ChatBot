"use client";
import React from "react";

export default function Hamburger({ handleHamburger, hamburgerState }) {
  return (
    <div
      className="z-5 ease-out absolute cursor-pointer top-5 right-5 rounded-sm bg-red-700 w-10 h-10 flex flex-col justify-evenly items-center md:hidden"
      onClick={handleHamburger}
    >
      <span
        className={`rounded-sm absolute h-0.5 w-7 bg-white transition-transform ${
          hamburgerState ? "top-3" : "rotate-[-45deg]"
        }`}
      ></span>
      <span
        className={`rounded-sm absolute h-0.5 w-7 bg-white transition-opacity ${
          hamburgerState ? "top-5" : "opacity-0"
        }`}
      ></span>
      <span
        className={`rounded-sm absolute h-0.5 w-7 bg-white transition-transform ${
          hamburgerState ? "top-7" : "rotate-[45deg]"
        }`}
      ></span>
    </div>
  );
}
