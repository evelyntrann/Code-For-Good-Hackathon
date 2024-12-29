"use client";
import React from "react";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Spline from "@splinetool/react-spline";

const Home: React.FC = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      <div className="absolute top-40 left-0 w-full h-full bg-white bg-opacity-70">
        <Spline
          scene="https://prod.spline.design/OY2hEj9n7p3Itn2n/scene.splinecode"
          className="absolute inset-0 -z-10 transform scale-125"
        />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-7xl text-[#344966]
 font-semibold text-center mt-52 relative z-10"
      >
        <TypeAnimation
          sequence={[
            "Welcome to Inclusive Connect",
            2000,
            "Improve your job search",
            2000,
            "Search with confidence",
            2000,
          ]}
          repeat={Infinity}
        />
      </motion.div>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => router.push("/login")}
        className="border-2 bg-white bg-opacity-50 border-primary hover:bg-primary hover:text-white text-3xl font-bold py-2 px-4 rounded-3xl mt-28 mx-auto relative z-10 text-primary"
      >
        Get Started
      </motion.button>
    </div>
  );
};

export default Home;
