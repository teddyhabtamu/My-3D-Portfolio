import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { testimonials } from "../constants";

const FeedbackCard = ({
  index,
  testimonial,
  name,
  designation,
  company,
  image,
  isMobile
}) => {
  // Safe animation variants with proper fallbacks
  const cardVariants = !isMobile ? fadeIn("", "spring", index * 0.5, 0.75) : { 
    hidden: { opacity: 1 }, 
    show: { opacity: 1 } 
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="show"
      className='bg-black-200 p-10 rounded-3xl xs:w-[320px] w-full'
    >
      <p className='text-white font-black text-[48px]'>"</p>

      <div className='mt-1'>
        <p className='text-white tracking-wider text-[18px]'>{testimonial}</p>

        <div className='mt-7 flex justify-between items-center gap-1'>
          <div className='flex-1 flex flex-col'>
            <p className='text-white font-medium text-[16px]'>
              <span className='blue-text-gradient'>@</span> {name}
            </p>
            <p className='mt-1 text-secondary text-[12px]'>
              {designation} of {company}
            </p>
          </div>

          <img
            src={image}
            alt={`feedback_by-${name}`}
            className='w-10 h-10 rounded-full object-cover'
            loading="lazy"
          />
        </div>
      </div>
    </motion.div>
  );
};

const Feedbacks = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Safe animation variants with proper fallbacks
  const headerVariants = !isMobile ? textVariant() : { 
    hidden: { opacity: 1 }, 
    show: { opacity: 1 } 
  };

  return (
    <div className={`mt-12 bg-black-100 rounded-[20px]`}>
      <div
        className={`bg-tertiary rounded-2xl ${styles.padding} min-h-[300px]`}
      >
        <motion.div 
          variants={headerVariants}
          initial="hidden"
          animate="show"
        >
          <p className={styles.sectionSubText}>What others say</p>
          <h2 className={styles.sectionHeadText}>Testimonials.</h2>
        </motion.div>
      </div>
      <div className={`-mt-20 pb-14 ${styles.paddingX} flex flex-wrap gap-7`}>
        {testimonials.map((testimonial, index) => (
          <FeedbackCard 
            key={testimonial.name} 
            index={index} 
            isMobile={isMobile}
            {...testimonial} 
          />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Feedbacks, "");
