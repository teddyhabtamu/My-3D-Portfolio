import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const ServiceCard = ({ index, title, icon }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Lightweight animation variants
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.4, delay: index * 0.2 }
    }
  };

  return (
    <div className='xs:w-[250px] w-full'>
      <motion.div
        variants={!isMobile ? cardVariants : { hidden: { opacity: 1 }, show: { opacity: 1 } }}
        initial="hidden"
        animate="show"
        className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
      >
        <div
          className={`bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col transition-transform duration-300 ${
            !isMobile && isHovered ? 'transform scale-105' : ''
          }`}
          onMouseEnter={() => !isMobile && setIsHovered(true)}
          onMouseLeave={() => !isMobile && setIsHovered(false)}
          style={{
            transform: !isMobile && isHovered ? 'rotateY(10deg)' : 'none',
            transformStyle: 'preserve-3d',
          }}
        >
          <img
            src={icon}
            alt={title}
            className='w-16 h-16 object-contain'
            loading="lazy"
          />

          <h3 className='text-white text-[20px] font-bold text-center'>
            {title}
          </h3>
        </div>
      </motion.div>
    </div>
  );
};

const About = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return (
    <>
      <motion.div 
        variants={!isMobile ? textVariant() : { hidden: { opacity: 1 }, show: { opacity: 1 } }}
        initial="hidden"
        animate="show"
      >
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>About Me.</h2>
      </motion.div>

      <motion.p
        variants={!isMobile ? fadeIn("", "", 0.1, 1) : { hidden: { opacity: 1 }, show: { opacity: 1 } }}
        initial="hidden"
        animate="show"
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        I'm a frontend developer who loves building clean and easy-to-use
        websites. I work with React, Tailwind and Node to turn ideas into real
        websites.
        <br />
        <br />
        <span className={styles.sectionSubText}>My Approach</span>
        <br />
        I enjoy learning new tools and finding smart ways to solve problems. I
        always try to make websites look great and work well.
        <br />
        <br />
        <span className={styles.sectionSubText}>Experience</span>
        <br />
        I've worked on many projects, from small websites to bigger web apps.
        Working with other developers and designers has helped me grow a lot.
        <br />
        <br />
        <span className={styles.sectionSubText}>Always Learning</span>
        <br />
        Tech is always changing, so I keep learning new things and stay updated.
        I also like sharing ideas with other developers.
      </motion.p>

      <div className="mt-20 flex flex-wrap gap-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
