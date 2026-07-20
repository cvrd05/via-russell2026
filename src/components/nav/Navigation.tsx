import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { bride, groom, navItems } from '@/data/weddingConfig';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';

const sectionIds = navItems.map((item) => item.href.replace('#', ''));

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeId = useActiveSection(sectionIds);

  useLockBodyScroll(isMenuOpen);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    const target = document.querySelector(href);
    target?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        isScrolled || isMenuOpen ? 'bg-noir/85 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <nav
        aria-label="Primary"
        className="container-editorial flex h-20 items-center justify-between"
      >
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#home');
          }}
          className="font-serif text-lg tracking-wide text-ivory"
        >
          {bride.nickname} <span className="text-champagne">&amp;</span> {groom.nickname}
        </a>

        <ul className="hidden items-center gap-9 lg:flex">
          {navItems.map((item) => {
            const id = item.href.replace('#', '');
            const isActive = activeId === id;
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative text-[0.7rem] uppercase tracking-[0.28em] transition-colors duration-300 after:absolute after:-bottom-1.5 after:left-0 after:h-px after:bg-champagne after:transition-all after:duration-300 ${
                    isActive
                      ? 'text-champagne after:w-full'
                      : 'text-ivory/75 after:w-0 hover:text-ivory hover:after:w-full'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/*
          Opens the mobile menu only. The menu itself (portaled to <body>,
          see below) renders its own close button — trying to reuse this one
          would mean it needs a higher stacking order than the fullscreen
          overlay portal, which defeats the purpose of portaling.
        */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(true)}
          aria-expanded={isMenuOpen}
          aria-label="Open menu"
          aria-hidden={isMenuOpen}
          tabIndex={isMenuOpen ? -1 : 0}
          className={`relative flex h-10 w-10 flex-col items-center justify-center gap-[6px] transition-opacity duration-200 lg:hidden ${
            isMenuOpen ? 'pointer-events-none opacity-0' : 'opacity-100'
          }`}
        >
          <span className="h-px w-6 bg-ivory" />
          <span className="h-px w-6 bg-ivory" />
          <span className="h-px w-6 bg-ivory" />
        </button>
      </nav>

      {/*
        Rendered via a portal directly under <body> so the fullscreen
        overlay always paints above every other section regardless of any
        stacking context created by ancestor elements (e.g. animated
        wrappers) higher up the tree.
      */}
      {createPortal(
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-6 overflow-y-auto bg-noir py-24 lg:hidden"
            >
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
                className="fixed right-6 top-5 flex h-10 w-10 items-center justify-center"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-ivory" fill="none" stroke="currentColor" aria-hidden="true">
                  <path d="M5 5l14 14M19 5L5 19" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </button>

              {navItems.map((item, index) => {
                const id = item.href.replace('#', '');
                const isActive = activeId === id;
                return (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className={`font-serif text-2xl tracking-wide ${
                      isActive ? 'text-champagne' : 'text-ivory'
                    }`}
                  >
                    {item.label}
                  </motion.a>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </header>
  );
}
