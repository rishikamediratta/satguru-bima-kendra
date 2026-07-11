import { ReactNode } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Navbar } from './navbar';
import { Footer } from './footer';
import { FloatingButtons } from './floating-buttons';

export function Layout({ children }: { children: ReactNode }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-[100dvh] flex flex-col font-sans">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
        style={{ scaleX }}
      />
      <Navbar />
      <main className="flex-1 flex flex-col mt-16">{children}</main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}
