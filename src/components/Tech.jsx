import React, { useEffect, useState } from "react";

import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";

const Tech = () => {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkScreenSize(); // Initial check
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div className="flex flex-row flex-wrap justify-center gap-10">
      {technologies.map((technology) => (
        <div
          className="w-28 h-28 flex flex-col items-center"
          key={technology.name}
        >
          {isDesktop ? (
            <BallCanvas icon={technology.icon} />
          ) : (
            <>
              <img
                src={technology.icon}
                alt={technology.name}
                className="w-16 h-16 object-contain"
              />
            </>
          )}
          <div className="mt-2">
            <h2 className="text-center text-sm text-white">
              {technology.name}
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SectionWrapper(Tech, "");
