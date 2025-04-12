import React from "react";

import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";

const Tech = () => {
  return (
    <div className="flex flex-row flex-wrap justify-center gap-10">
      {technologies.map((technology) => (
        <div className="w-28 h-28" key={technology.name}>
          <BallCanvas icon={technology.icon} />
          <div className="flex justify-center">
            <h2 className="">{technology.name}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SectionWrapper(Tech, "");
