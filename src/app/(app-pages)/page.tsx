import * as motion from "motion/react-client";
import BuyNow from "@/components/home/BuyNow";
import MostWanted from "@/components/home/MostWanted";
import React from "react";

export const metadata = {
  title: "La subasta cubana",
};

export default function Index() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "keyframes" }}
    >
      <div className="container-xxl">
        <div className="vstack g-2 gap-2">
          <BuyNow />
          <MostWanted />
        </div>
      </div>
    </motion.div>
  );
}
