
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white px-3 py-2 transition-colors"
      >
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4">
              <motion.div
                transition={transition}
                layoutId="active"
                className="bg-white dark:bg-black/90 backdrop-blur-lg rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-[0_4px_12px_-2px_rgba(0,0,0,0.3)]"
              >
                <motion.div
                  layout
                  className="w-max h-full"
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className="relative flex items-center space-x-1"
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) => {
  return (
    <Link to={href} className="flex space-x-2 items-start p-2 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-colors">
      <img
        src={src}
        width={60}
        height={60}
        alt={title}
        loading="eager"
        className="flex-shrink-0 rounded-md shadow-md object-cover"
      />
      <div>
        <h4 className="text-sm font-bold mb-1 text-black dark:text-white">
          {title}
        </h4>
        <p className="text-gray-600 text-xs max-w-[10rem] dark:text-gray-300">
          {description}
        </p>
      </div>
    </Link>
  );
};

export const HoveredLink = ({ children, ...rest }: any) => {
  return (
    <Link
      {...rest}
      className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white px-3 py-2 text-sm block rounded-md hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
    >
      {children}
    </Link>
  );
};
