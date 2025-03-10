import { AnimatePresence, motion } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";

import { Footer } from "@/shared/components/footer";
import { Navbar } from "@/shared/components/navbar";

export const AppLayout = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-75 ease-linear">
      <Navbar />
      <main className="flex-grow">
        <AnimatePresence mode="sync">
          <motion.div
            key={location.pathname}
            exit={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="container mx-auto pb-6 px-4 md:px-0"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};
