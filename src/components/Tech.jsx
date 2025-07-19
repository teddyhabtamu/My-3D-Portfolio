import React from "react";

import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";

const TechIcon = ({ technology, index }) => {
  return (
    <div className="w-28 h-28 flex flex-col items-center group">
      <div className="w-20 h-20 flex items-center justify-center bg-tertiary rounded-full p-4 hover:bg-secondary transition-all duration-300 transform hover:scale-110 hover:rotate-6">
        <img
          src={technology.icon}
          alt={technology.name}
          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      <div className="mt-3">
        <h2 className="text-center text-sm text-white font-medium group-hover:text-secondary transition-colors duration-300">
          {technology.name}
        </h2>
      </div>
    </div>
  );
};

const Tech = () => {
  return (
    <div className="flex flex-row flex-wrap justify-center gap-8">
      {technologies.map((technology, index) => (
        <TechIcon 
          key={technology.name}
          technology={technology}
          index={index}
        />
      ))}
    </div>
  );
};

export default SectionWrapper(Tech, "");
