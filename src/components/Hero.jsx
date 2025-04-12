import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";

const Hero = () => {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768); // tablet and up
    };

    handleResize(); // check on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className={`relative w-full h-screen mx-auto`}>
      <div
        className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915EFF]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm <span className="text-[#915EFF]">Tewodros Habtamu</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            And I'm a Web Developer and Data Scientist{" "}
            <br className="sm:block hidden" />
            My expertise lies in transforming design concepts into interactive
            web applications that leave a lasting impression. I believe in the
            power of aesthetics and usability to enhance the way users interact
            with technology.
          </p>
        </div>
      </div>

      {/* Conditional Render */}
      {isDesktop ? (
        <ComputersCanvas />
      ) : (
        <div className="absolute xs:bottom-10 bottom-32 left-4 flex justify-center items-center">
          <img
            src="/computer.png"
            alt="3D Computer Static"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{ y: [0, 24, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
