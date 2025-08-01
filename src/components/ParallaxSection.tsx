import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxSectionProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'swirl';
  intensity?: number;
  className?: string;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({ 
  children, 
  direction = 'up', 
  intensity = 50,
  className = ''
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  let x, y, rotate;

  switch (direction) {
    case 'up':
      y = useTransform(scrollYProgress, [0, 1], [intensity, -intensity]);
      break;
    case 'down':
      y = useTransform(scrollYProgress, [0, 1], [-intensity, intensity]);
      break;
    case 'left':
      x = useTransform(scrollYProgress, [0, 1], [intensity, -intensity]);
      break;
    case 'right':
      x = useTransform(scrollYProgress, [0, 1], [-intensity, intensity]);
      break;
    case 'swirl':
      x = useTransform(scrollYProgress, [0, 1], [-intensity/2, intensity/2]);
      y = useTransform(scrollYProgress, [0, 1], [intensity/2, -intensity/2]);
      rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
      break;
    default:
      y = useTransform(scrollYProgress, [0, 1], [intensity, -intensity]);
  }

  return (
    <motion.div
      ref={ref}
      style={{ x, y, rotate }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ParallaxSection;