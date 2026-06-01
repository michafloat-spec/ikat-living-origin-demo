import { useEffect, useMemo, useRef, useState } from 'react';
import { demoContent } from './data/demoContent.js';

const OVERLAY_EXIT_MS = 320;

const translations = {
  en: {
    menu: 'Menu',
    language: 'Language',
    farmerAltitude: 'Farm altitude',
    cacaoType: 'Cacao type',
    trees: 'Trees',
    heroTitle: 'Ethical\njungle-grown\ncacao',
    heroSubtitle: 'From the island of Flores',
    journeyTitle: 'Follow the full journey',
    journeyCopy: 'From harvest to chocolate.',
    impactTitle: 'Your Impact',
    impactCopy: "You're not just enjoying great chocolate.\nYou're creating real change.",
    projectTitle: 'Community projects supported',
    projectCopy: 'Education, fermentation training, and farm infrastructure.',
    projectDetailTitle: 'Community projects supported',
    projectDetailCopy: 'A scrollable record of trainings, tools, and education supported by this batch.',
    closeCommunity: 'Close community projects',
    viewMap: 'View origin map',
    closeMap: 'Close map',
    mapTitle: 'Origin Region',
    mapCopy: 'This map shows the origin region. Each point marks one named partner farm that contributed cacao to this batch.',
    mapArea: 'Origin region',
    farmersTitle: 'Main Farmers',
    farmersCopy: 'This batch blends cacao from four named partners and 23 smaller contributors.',
    batchShare: 'Origin share',
    closeFarmer: 'Close farmer details',
    farm: 'Farm',
    farmMap: 'Farm map',
    village: 'Village',
    deliveredThisYear: 'Delivered',
    partnerStatus: 'Status',
    closeStep: 'Close journey detail',
  },
  de: {
    menu: 'Menu',
    language: 'Sprache',
    farmerAltitude: 'Farm altitude',
    cacaoType: 'Cacao type',
    trees: 'Trees',
    heroTitle: 'Ethical\njungle-grown\ncacao',
    heroSubtitle: 'From the island of Flores',
    journeyTitle: 'Follow the full journey',
    journeyCopy: 'From harvest to chocolate.',
    impactTitle: 'Your Impact',
    impactCopy: "You're not just enjoying great chocolate.\nYou're creating real change.",
    projectTitle: 'Community projects supported',
    projectCopy: 'Education, fermentation training, and farm infrastructure.',
    projectDetailTitle: 'Community projects supported',
    projectDetailCopy: 'A scrollable record of trainings, tools, and education supported by this batch.',
    closeCommunity: 'Close community projects',
    viewMap: 'View origin map',
    closeMap: 'Close map',
    mapTitle: 'Origin Region',
    mapCopy: 'This map shows the origin region. Each point marks one named partner farm that contributed cacao to this batch.',
    mapArea: 'Origin region',
    farmersTitle: 'Main Farmers',
    farmersCopy: 'This batch blends cacao from four named partners and 23 smaller contributors.',
    batchShare: 'Origin share',
    closeFarmer: 'Close farmer details',
    farm: 'Farm',
    farmMap: 'Farm map',
    village: 'Village',
    deliveredThisYear: 'Delivered',
    partnerStatus: 'Status',
    closeStep: 'Close journey detail',
  },
};

function Icon({ name }) {
  const paths = {
    menu: 'M4 7h16M4 12h16M4 17h16',
    globe:
      'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM3.6 9h16.8M3.6 15h16.8M12 3c2.25 2.45 3.5 5.62 3.5 9s-1.25 6.55-3.5 9M12 3c-2.25 2.45-3.5 5.62-3.5 9s1.25 6.55 3.5 9',
    heart: 'M20.8 6.4a5.2 5.2 0 0 0-7.4 0L12 7.8l-1.4-1.4a5.2 5.2 0 1 0-7.4 7.4L12 22l8.8-8.2a5.2 5.2 0 0 0 0-7.4Z',
    pin: 'M12 21s7-5 7-12a7 7 0 1 0-14 0c0 7 7 12 7 12Zm0-9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
    mountain: 'M3 20h18L14 7l-4 7-2-3-5 9Z',
    bean: 'M13 3c5 2 7 8 5 13s-7 7-11 5C2 19 1 13 4 8s7-7 9-5Zm0 0c-1 5-3 11-8 15',
    sprout: 'M12 21V11m0 0C9 7 6 6 3 7c1 4 4 6 9 4Zm0 0c3-4 6-5 9-4-1 4-4 6-9 4Z',
    calendar: 'M7 3v3M17 3v3M4 8h16M6 5h12a2 2 0 0 1 2 2v12H4V7a2 2 0 0 1 2-2Zm3 7h2m4 0h2m-8 4h2m4 0h2',
    home: 'M4 11.4 12 4l8 7.4V20h-5v-5H9v5H4v-8.6Z',
    thermometer: 'M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0ZM12 17V9',
    box: 'M4 8.5 12 4l8 4.5v9L12 22l-8-4.5v-9Zm8 4.5 8-4.5M12 13 4 8.5M12 13v9',
    checkCircle: 'M21 12a9 9 0 1 1-5.3-8.2M8.8 12.2l2.4 2.4L20 5.8',
    award: 'M12 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm-3 0-1 6 4-2 4 2-1-6',
    cacaoSingle:
      'M12.4 3.4c5.1 3.4 6.5 10.2 2.6 16.7-5.6-2.4-8.1-8.8-5.4-15.5m2.8-1.2C7.6 8.1 7.9 15.5 15 20.1M9 7.8c1.7.8 3.6.8 5.4.2M8.3 11.5c2.3.8 4.8.8 7.2-.1M9.6 15.4c1.6.6 3.3.5 5-.1',
    pod: 'M8.5 20c-3-3.7-3-9.9 0-15.8 4.6 3.3 6.2 9.8 3.5 15.3M15.5 20c3-3.7 3-9.9 0-15.8-4.6 3.3-6.2 9.8-3.5 15.3M12 5v15M6 8.2c1.5.9 3 1.1 4.5.6M18 8.2c-1.5.9-3 1.1-4.5.6',
    ferment: 'M5 11h14v8H5v-8Zm2 3h4m2 0h4M8 8c0-1.4 1.6-1.4 1.6-3M12 8c0-1.4 1.6-1.4 1.6-3M16 8c0-1.4 1.6-1.4 1.6-3',
    sun: 'M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0-13v2.2m0 13.6V21M3 12h2.2m13.6 0H21M5.6 5.6l1.5 1.5m9.8 9.8 1.5 1.5m0-12.8-1.5 1.5m-9.8 9.8-1.5 1.5',
    flame: 'M12 21c3.7-1.8 5.7-4.7 5.7-8.2 0-3.6-2.1-6.4-5.6-9.8-.3 3.8-3.6 5.2-5 8.5-1.5 3.7.6 7.5 4.9 9.5Zm.1-1.2c-1.6-1.1-2.4-2.5-2.4-4.2 0-1.5.8-2.8 2.4-4.3 1.5 1.5 2.2 2.8 2.2 4.3 0 1.7-.7 3.1-2.2 4.2Z',
    craft: 'M5 5h14v14H5V5Zm0 7h14M12 5v14M8.5 8.5h.1m6.8 0h.1m-7 7h.1m6.8 0h.1',
    palm: 'M12 21V9m0 0C9.4 6.3 6.3 5.4 3 6.4c2.1 2.5 5.1 3.4 9 2.6Zm0 0c2.9-2.5 5.8-3.1 9-1.8-2.2 2.2-5.1 2.8-9 1.8Zm0 0C10.9 5.7 11.5 3.8 14 2.7c1 2.5.3 4.6-2 6.3Zm0 4c-2.8 0-5.2 1-7 3m7-3c2.8 0 5.2 1 7 3',
    chevron: 'm9 18 6-6-6-6',
    people: 'M16 19c0-2.2-1.8-4-4-4s-4 1.8-4 4m8-8a4 4 0 1 0-8 0 4 4 0 0 0 8 0Zm6 8c0-1.9-1.3-3.4-3-3.9M19 7.5a3 3 0 0 1 0 5.9M2 19c0-1.9 1.3-3.4 3-3.9M5 7.5a3 3 0 0 0 0 5.9',
    community:
      'M8 19c0-2.3 1.8-4 4-4s4 1.7 4 4M15.5 11a3.5 3.5 0 1 0-7 0 3.5 3.5 0 0 0 7 0ZM3.5 18c.4-2 1.8-3.3 3.8-3.7M6.5 8.8a2.8 2.8 0 0 0 .7 5.5M20.5 18c-.4-2-1.8-3.3-3.8-3.7M17.5 8.8a2.8 2.8 0 0 1-.7 5.5',
    instagram:
      'M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5Zm4 4.5A4.5 4.5 0 1 0 16.5 12 4.5 4.5 0 0 0 12 7.5Zm0 2A2.5 2.5 0 1 1 9.5 12 2.5 2.5 0 0 1 12 9.5Zm5.25-2.9a1.15 1.15 0 1 0 1.15 1.15 1.15 1.15 0 0 0-1.15-1.15Z',
    linkedin:
      'M7.2 9.2V18M7.2 6.6v.1M11.3 18V9.2M11.3 12.3c0-1.9 1.4-3.1 3.1-3.1 1.8 0 2.9 1.2 2.9 3.7V18M6.9 6.7a.3.3 0 1 1 .1 0',
    leaf: 'M6 18C6 9 12 4 21 4c0 9-5 15-14 15m0 0c2-5 6-8 11-10',
    play: 'M9 7.5v9l7-4.5-7-4.5Z',
    close: 'M6 6l12 12M18 6 6 18',
  };

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="icon">
      <path d={paths[name]} />
    </svg>
  );
}

function FlavorArt({ label }) {
  const key = label.toLowerCase();

  if (key.includes('chocolate')) {
    return (
      <svg className="flavor-art" viewBox="0 0 120 90" aria-hidden="true">
        <defs>
          <linearGradient id="chocBar" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#7a3d24" />
            <stop offset="1" stopColor="#30150e" />
          </linearGradient>
        </defs>
        <path d="M12 72c25 6 61 6 96-2" fill="none" stroke="#dacbb7" strokeWidth="4" strokeLinecap="round" />
        <g transform="translate(22 12) rotate(-10 38 31)">
          <rect x="2" y="20" width="68" height="44" rx="5" fill="url(#chocBar)" />
          <path d="M2 34h68M2 49h68M19 20v44M36 20v44M53 20v44" stroke="#965d3c" strokeWidth="2" opacity="0.82" />
          <path d="M9 13h58l5 7H3z" fill="#814326" />
          <path d="M13 26h9M30 26h9M47 26h9" stroke="#b8754b" strokeWidth="2" opacity="0.72" />
        </g>
        <path d="M67 63c10-13 25-18 43-14-7 13-21 19-43 14Z" fill="#805033" />
        <path d="M74 62c8-5 19-8 32-9" fill="none" stroke="#351710" strokeWidth="2" opacity="0.35" />
      </svg>
    );
  }

  if (key.includes('nut')) {
    return (
      <svg className="flavor-art" viewBox="0 0 120 90" aria-hidden="true">
        <path d="M17 76c27 5 56 4 87-2" fill="none" stroke="#dacbb7" strokeWidth="4" strokeLinecap="round" />
        <ellipse cx="43" cy="54" rx="14" ry="28" fill="#bd7339" transform="rotate(24 43 54)" />
        <ellipse cx="65" cy="47" rx="14" ry="28" fill="#d0914b" transform="rotate(49 65 47)" />
        <ellipse cx="82" cy="60" rx="16" ry="21" fill="#e4bc80" transform="rotate(65 82 60)" />
        <ellipse cx="29" cy="65" rx="12" ry="18" fill="#a9602d" transform="rotate(61 29 65)" />
        <path d="M34 31c11 12 18 28 18 46M57 27c10 12 17 25 20 39M71 51c10 2 18 6 25 12" fill="none" stroke="#5e331d" strokeWidth="2" opacity="0.35" />
        <path d="M74 27c11-4 19-2 24 6-10 3-18 1-24-6Z" fill="#7a8f42" opacity="0.65" />
      </svg>
    );
  }

  if (key.includes('berry') || key.includes('fruit')) {
    const tropical = key.includes('tropical');
    return tropical ? (
      <svg className="flavor-art" viewBox="0 0 120 90" aria-hidden="true">
        <circle cx="45" cy="46" r="25" fill="#7e4327" />
        <circle cx="45" cy="46" r="20" fill="#f3c33d" />
        <circle cx="45" cy="46" r="8" fill="#74401f" />
        <g fill="none" stroke="#fff0a7" strokeWidth="3" strokeLinecap="round">
          <path d="M45 28v9M45 55v9M27 46h9M54 46h9M33 33l7 7M58 33l-7 7M33 59l7-7M58 59l-7-7" />
        </g>
        <path d="M57 69c15-28 34-39 50-34-5 22-22 34-50 34Z" fill="#f7cc44" />
        <path d="M70 64c10-12 21-20 33-24" fill="none" stroke="#de8e2d" strokeWidth="3" strokeLinecap="round" />
        <path d="M74 35c10-7 20-8 30-3-9 7-19 8-30 3Z" fill="#4d9044" />
      </svg>
    ) : (
      <svg className="flavor-art" viewBox="0 0 120 90" aria-hidden="true">
        <g fill="#c82338">
          <circle cx="42" cy="51" r="13" />
          <circle cx="56" cy="42" r="12" />
          <circle cx="68" cy="55" r="13" />
          <circle cx="51" cy="66" r="12" />
          <circle cx="78" cy="43" r="10" />
        </g>
        <g fill="#223f63">
          <circle cx="78" cy="66" r="11" />
          <circle cx="94" cy="59" r="9" />
        </g>
        <path d="M63 34c4-12 11-18 22-19M70 28c-7-5-14-6-22-4M79 23c8-4 16-4 24 1" fill="none" stroke="#2f6b39" strokeWidth="3" strokeLinecap="round" />
        <path d="M49 25c11-7 20-6 27 2-10 5-19 4-27-2ZM80 18c10-4 18-2 24 6-9 3-17 1-24-6Z" fill="#5f9a4e" />
      </svg>
    );
  }

  if (key.includes('floral')) {
    return (
      <svg className="flavor-art" viewBox="0 0 120 90" aria-hidden="true">
        <circle cx="60" cy="49" r="9" fill="#dfb842" />
        <g fill="#fffaf0" stroke="#e5ddcf" strokeWidth="2">
          <ellipse cx="60" cy="27" rx="11" ry="19" />
          <ellipse cx="60" cy="71" rx="11" ry="19" />
          <ellipse cx="38" cy="49" rx="19" ry="11" />
          <ellipse cx="82" cy="49" rx="19" ry="11" />
          <ellipse cx="44" cy="33" rx="10" ry="17" transform="rotate(-45 44 33)" />
          <ellipse cx="76" cy="65" rx="10" ry="17" transform="rotate(-45 76 65)" />
        </g>
        <path d="M63 78c8-12 18-20 31-25M56 78c-8-11-18-18-30-22" fill="none" stroke="#4c7d43" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg className="flavor-art" viewBox="0 0 120 90" aria-hidden="true">
      <path d="M58 72C55 46 70 25 102 17c3 28-14 47-44 55Z" fill="#3f7c43" />
      <path d="M57 72C45 45 25 30 6 28c4 27 22 42 51 44Z" fill="#4c9146" />
      <path d="M60 72C55 51 58 31 72 10c16 22 12 43-12 62Z" fill="#5a9c4d" />
      <g fill="none" stroke="#24552e" strokeWidth="3" strokeLinecap="round">
        <path d="M58 72c9-19 23-35 42-51" />
        <path d="M57 72C45 53 30 39 9 29" />
        <path d="M60 72c1-20 5-39 12-58" />
      </g>
    </svg>
  );
}

function Header({ copy, language, setLanguage }) {
  return (
    <header className="app-header">
      <button type="button" className="header-button" aria-label={copy.menu}>
        <Icon name="menu" />
      </button>
      <div className="brand" aria-label={demoContent.headerBrand}>
        <img src="./assets/ikat-logo-final.png" alt="" aria-hidden="true" />
      </div>
      <button
        type="button"
        className="language-button"
        aria-label={copy.language}
        onClick={() => setLanguage(language === 'en' ? 'de' : 'en')}
      >
        <Icon name="globe" />
        {language.toUpperCase()}
      </button>
    </header>
  );
}

function Footer() {
  return (
    <footer className="powered-footer">
      <div className="footer-main">
        <div className="footer-story">
          <div className="footer-mark" aria-hidden="true">
            <img src="./assets/living-origin-logo.png" alt="" />
          </div>
          <div className="footer-story-copy">
            <strong>IKAT Living Origin</strong>
            <p>Every product has a story.</p>
            <p>This is yours.</p>
          </div>
        </div>

        <div className="footer-links" aria-label="Footer links">
          <a href="#" className="footer-link">
            <span className="footer-link-icon" aria-hidden="true">
              <Icon name="instagram" />
            </span>
            <span>Instagram</span>
          </a>
          <a href="#" className="footer-link">
            <span className="footer-link-icon" aria-hidden="true">
              <Icon name="linkedin" />
            </span>
            <span>LinkedIn</span>
          </a>
          <a href="#" className="footer-link">
            <span className="footer-link-icon" aria-hidden="true">
              <Icon name="globe" />
            </span>
            <span>Website</span>
          </a>
        </div>
      </div>

      <div className="footer-meta">
        <small>Powered by IKAT</small>
      </div>
    </footer>
  );
}

function useRevealOnScroll() {
  useEffect(() => {
    const revealTargets = Array.from(document.querySelectorAll('[data-reveal]'));

    if (!('IntersectionObserver' in window)) {
      revealTargets.forEach((target) => target.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -64px', threshold: 0.16 },
    );

    revealTargets.forEach((target, index) => {
      target.style.setProperty('--reveal-delay', `${Math.min(index * 35, 180)}ms`);
      observer.observe(target);
    });

    return () => observer.disconnect();
  }, []);
}

function useScrollMotion() {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotion.matches) return undefined;

    const root = document.documentElement;
    const motionTargets = Array.from(document.querySelectorAll('[data-scroll-motion]'));
    let ticking = false;

    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

    const updateMotion = () => {
      const viewportHeight = window.innerHeight || 1;
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const heroProgress = clamp(scrollY / (viewportHeight * 0.9), 0, 1);
      const headerFade = clamp(scrollY / (viewportHeight * 0.24), 0, 1);
      const heroCopyFade = clamp(scrollY / (viewportHeight * 0.68), 0, 1);

      root.style.setProperty('--hero-parallax-y', `${Math.min(scrollY * 0.055, 28)}px`);
      root.style.setProperty('--hero-scale', `${(1.032 - heroProgress * 0.012).toFixed(3)}`);
      root.style.setProperty('--hero-copy-y', `${Math.min(scrollY * -0.045, 0)}px`);
      root.style.setProperty('--hero-copy-opacity', `${clamp(1 - heroCopyFade * 1.08, 0, 1).toFixed(3)}`);
      root.style.setProperty('--header-content-opacity', `${clamp(1 - headerFade * 1.04, 0, 1).toFixed(3)}`);
      root.style.setProperty('--header-content-y', `${Math.min(scrollY * -0.04, 0).toFixed(2)}px`);
      root.style.setProperty('--hero-vignette-alpha', `${(0.08 + heroProgress * 0.2).toFixed(3)}`);

      motionTargets.forEach((target) => {
        const rect = target.getBoundingClientRect();
        const centerProgress = (rect.top + rect.height / 2) / viewportHeight;
        const focus = clamp(1 - Math.abs(centerProgress - 0.52) * 1.72, 0, 1);
        const lift = (0.52 - centerProgress) * 34;
        const imageDrift = (0.52 - centerProgress) * 28;
        const isImpactSection = target.classList.contains('impact-section');
        const isImpactCard = target.classList.contains('impact-card');
        const isImpactMetrics = target.classList.contains('impact-metrics');
        const isCommunityCard = target.classList.contains('community-card');
        const softLiftMultiplier = isImpactSection || isCommunityCard ? 0.16 : 0.42;
        const impactLiftMultiplier = isImpactCard ? 0.2 : 0.62;
        const metricLiftMultiplier = isImpactMetrics ? -0.06 : -0.18;
        const borderScale = isImpactMetrics ? 0.985 + focus * 0.015 : 0.94 + focus * 0.06;
        const shadowAlpha = isImpactCard || isImpactMetrics || isCommunityCard ? focus * 0.035 : focus * 0.08;
        const valueScale = isImpactMetrics ? 0.992 + focus * 0.018 : 0.96 + focus * 0.08;

        target.style.setProperty('--scroll-focus', focus.toFixed(3));
        target.style.setProperty('--scroll-accent-alpha', (focus * 0.16).toFixed(3));
        target.style.setProperty('--scroll-border-alpha', (focus * 0.22).toFixed(3));
        target.style.setProperty('--scroll-subtle-border-alpha', (focus * 0.06).toFixed(3));
        target.style.setProperty('--scroll-border-scale', borderScale.toFixed(3));
        target.style.setProperty('--scroll-glow-opacity', (focus * 0.76).toFixed(3));
        target.style.setProperty('--scroll-lift', `${lift.toFixed(2)}px`);
        target.style.setProperty('--scroll-soft-lift', `${(lift * softLiftMultiplier).toFixed(2)}px`);
        target.style.setProperty('--scroll-list-lift', `${(lift * 0.5).toFixed(2)}px`);
        target.style.setProperty('--scroll-impact-lift', `${(lift * impactLiftMultiplier).toFixed(2)}px`);
        target.style.setProperty('--scroll-metric-lift', `${(lift * metricLiftMultiplier).toFixed(2)}px`);
        target.style.setProperty('--scroll-image-drift', `${imageDrift.toFixed(2)}px`);
        target.style.setProperty('--scroll-scale', `${(0.965 + focus * 0.035).toFixed(3)}`);
        target.style.setProperty('--scroll-shadow-alpha', `${shadowAlpha.toFixed(3)}`);
        target.style.setProperty('--scroll-value-scale', `${valueScale.toFixed(3)}`);
      });

      ticking = false;
    };

    const requestMotionUpdate = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateMotion);
    };

    updateMotion();
    window.addEventListener('scroll', requestMotionUpdate, { passive: true });
    window.addEventListener('resize', requestMotionUpdate);

    return () => {
      window.removeEventListener('scroll', requestMotionUpdate);
      window.removeEventListener('resize', requestMotionUpdate);
    };
  }, []);
}

function OriginStats({ copy }) {
  return (
    <dl className="origin-stats">
      <div>
        <dt>{copy.farmerAltitude}</dt>
        <dd>
          <Icon name="mountain" />
          {demoContent.origin.altitude}
        </dd>
      </div>
      <div>
        <dt>{copy.cacaoType}</dt>
        <dd>
          <Icon name="bean" />
          {demoContent.origin.cacaoType}
        </dd>
      </div>
      <div>
        <dt>{copy.trees}</dt>
        <dd>
          <Icon name="sprout" />
          {demoContent.origin.trees}
        </dd>
      </div>
    </dl>
  );
}

function FarmersSection({ copy, onSelect }) {
  return (
    <section className="farmers-card" aria-labelledby="farmers-title">
      <div className="farmers-heading">
        <h2 id="farmers-title">{copy.farmersTitle}</h2>
        <p>{copy.farmersCopy}</p>
      </div>
      <div className="farmer-strip">
        {demoContent.farmers.map((farmer, index) => {
          const chipStyle = { '--chip-delay': `${index * 85}ms` };
          const chipContents = (
            <>
              <img src={farmer.image} alt={`${farmer.name}, ${farmer.role}`} />
              <strong>{farmer.name}</strong>
              <span>{farmer.share}</span>
            </>
          );

          if (farmer.isAggregate) {
            return (
              <div className="farmer-chip farmer-chip-summary" key={farmer.name} style={chipStyle}>
                {chipContents}
              </div>
            );
          }

          return (
            <button
              type="button"
              className="farmer-chip"
              key={farmer.name}
              onClick={() => onSelect(farmer)}
              style={chipStyle}
            >
              {chipContents}
            </button>
          );
        })}
      </div>
    </section>
  );
}

function TastingNotes({ copy, onViewMap }) {
  const profile = demoContent.tastingNotes;

  return (
    <section className="tasting-notes" data-reveal data-scroll-motion aria-labelledby="tasting-notes-title">
      <div className="tasting-notes-hero">
        <div className="tasting-notes-copy-block">
          <span>{profile.eyebrow}</span>
          <h2 id="tasting-notes-title">{profile.title}</h2>
          <p className="tasting-profile-source">
            <span>{profile.supportingLine}</span>
            <span className="tasting-lot-badge" aria-label={`Batch ${demoContent.origin.lot}`}>
              <span aria-hidden="true" />
              {demoContent.origin.lot}
            </span>
          </p>
          <p>{profile.copy}</p>
        </div>
        <img className="tasting-landscape" src={profile.landscapeImage} alt="" aria-hidden="true" />
      </div>

      <div className="tasting-note-strip" aria-label="Flavor notes">
        {profile.notes.map((note) => (
          <div className="tasting-note" key={note.label}>
            <img className="flavor-art" src={note.image} alt="" aria-hidden="true" />
            <span>{note.label}</span>
          </div>
        ))}
      </div>

      <div className="tasting-detail-grid">
        <div className="flavor-factors">
          <h3>What Shapes This Flavor</h3>
          <div className="factor-list">
            {profile.factors.map((factor) => (
              <div className="factor-row" key={factor.title}>
                <div className="factor-icon" aria-hidden="true">
                  <Icon name={factor.icon} />
                </div>
                <div>
                  <strong>{factor.title}</strong>
                  <p>{factor.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="tasting-notes-footer">
        <div className="tasting-origin-icon" aria-hidden="true">
          <Icon name="pin" />
        </div>
        <div className="tasting-origin-copy">
          <strong>{profile.originTitle}</strong>
          <p>{profile.originCopy}</p>
        </div>

        <button type="button" className="location-chip" onClick={onViewMap}>
          <span>{copy.viewMap}</span>
          <Icon name="chevron" />
        </button>
      </div>
    </section>
  );
}

function FarmerOverlay({ farmer, copy, onClose, isClosing = false }) {
  const pinStyle = {
    left: `${farmer.mapPin?.x ?? 56}%`,
    top: `${farmer.mapPin?.y ?? 50}%`,
  };
  const originFacts = [
    { label: copy.farmerAltitude, value: farmer.altitude, icon: 'mountain' },
    { label: copy.cacaoType, value: demoContent.origin.cacaoType, icon: 'bean' },
    { label: copy.trees, value: farmer.trees, icon: 'sprout' },
    { label: 'Partner level', value: farmer.partnerStatus, icon: 'award' },
  ];

  return (
    <div className={`farmer-overlay${isClosing ? ' is-closing' : ''}`} role="dialog" aria-modal="true" aria-label={farmer.name}>
      <div className="overlay-dismiss" aria-hidden="true" onClick={onClose} />
      <div className="farmer-sheet">
        <button
          type="button"
          className="close-button"
          aria-label={copy.closeFarmer}
          onClick={onClose}
        >
          <Icon name="close" />
        </button>
        <div className="farmer-hero">
          <img src={farmer.personalHeroImage ?? './assets/farmer-cacao-jungle.png'} alt="" aria-hidden="true" />
        </div>
        <div className="farmer-sheet-head">
          <img src={farmer.image} alt={`${farmer.name}, ${farmer.role}`} />
          <div>
            <span>{farmer.personalMeta?.join(' · ') ?? farmer.role}</span>
            <h2>{farmer.name}</h2>
            <strong className="share-badge">{farmer.share} {copy.batchShare}</strong>
          </div>
        </div>
        <p className="farmer-story">{farmer.story}</p>
        <h3 className="detail-section-title">Origin facts</h3>
        <dl className="farmer-detail-stats">
          {originFacts.map((fact) => (
            <div key={fact.label}>
              <dd>
                <Icon name={fact.icon} />
                {fact.value}
              </dd>
              <dt>{fact.label}</dt>
            </div>
          ))}
        </dl>
        <h3 className="detail-section-title">Where this cacao grows</h3>
        <section className="farmer-map-card" aria-label={copy.farmMap} style={{ '--pin-x': `${farmer.mapPin?.x ?? 56}%`, '--pin-y': `${farmer.mapPin?.y ?? 50}%` }}>
          <img src="./assets/farmer-detail-map.png" alt="" aria-hidden="true" />
          <div className="farmer-map-shade" />
          <div className="farmer-map-scan" />
          <div className="map-location-pill">
            <Icon name="pin" />
            {farmer.village}, Flores
          </div>
          <div className="farmer-map-pin" style={pinStyle} aria-label={farmer.farm} />
        </section>
      </div>
    </div>
  );
}

function Sparkline({ values, chart }) {
  if (!values?.length) return null;
  const min = chart?.yMin ?? Math.min(...values);
  const max = chart?.yMax ?? Math.max(...values);
  const span = max - min || 1;
  const yPosition = (value) => 82 - ((value - min) / span) * 56;
  const xPosition = (index) => (index / (values.length - 1 || 1)) * 100;
  const points = values
    .map((value, index) => {
      const x = xPosition(index);
      const y = yPosition(value);
      return `${x},${y}`;
    })
    .join(' ');
  const pointMarkers = values.map((value, index) => ({
    key: `${value}-${index}`,
    x: xPosition(index),
    y: yPosition(value),
  }));
  const xLabels = chart?.xLabels?.map((item, index, labels) => {
    const label = typeof item === 'string' ? item : item.label;
    const position =
      typeof item === 'string'
        ? (index / ((labels.length - 1) || 1)) * 100
        : item.position;
    return { label, position };
  });

  return (
    <div className="step-chart-body" aria-hidden="true">
      {chart?.yLabels && (
        <div className="chart-y-scale">
          {chart.yLabels.map((item) => (
            <span key={item.label} style={{ top: `${yPosition(item.value)}%` }}>
              {item.label}
            </span>
          ))}
        </div>
      )}
      <div className="chart-plot">
        <svg className="step-sparkline" viewBox="0 0 100 100" preserveAspectRatio="none">
          {chart?.gridValues?.map((value) => {
            const y = yPosition(value);
            return <line className="chart-grid-line" key={value} x1="0" x2="100" y1={y} y2={y} />;
          })}
          <polyline points={points} />
        </svg>
        <div className="chart-points">
          {pointMarkers.map((point) => (
            <span key={point.key} style={{ left: `${point.x}%`, top: `${point.y}%` }} />
          ))}
        </div>
        {xLabels && (
          <div className="chart-x-scale">
            {xLabels.map((item) => (
              <span key={item.label} style={{ left: `${item.position}%` }}>
                {item.label}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function MultiSeriesSparkline({ series, chart }) {
  if (!series?.length) return null;

  const xLabels = chart?.xLabels?.map((item, index, labels) => {
    const label = typeof item === 'string' ? item : item.label;
    const position =
      typeof item === 'string'
        ? (index / ((labels.length - 1) || 1)) * 100
        : item.position;
    return { label, position };
  });

  const xPosition = (index, values) => (index / (values.length - 1 || 1)) * 100;
  const yPosition = (value, values) => {
    const min = Math.min(...values);
    const max = Math.max(...values);
    const span = max - min || 1;
    return 82 - ((value - min) / span) * 56;
  };

  return (
    <div className="step-chart-body step-chart-body-multi" aria-hidden="true">
      <div className="chart-plot">
        <svg className="step-sparkline" viewBox="0 0 100 100" preserveAspectRatio="none">
          {chart?.gridPositions?.map((y) => (
            <line className="chart-grid-line" key={y} x1="0" x2="100" y1={y} y2={y} />
          ))}
          {series.map((item, seriesIndex) => {
            const points = item.values
              .map((value, index) => `${xPosition(index, item.values)},${yPosition(value, item.values)}`)
              .join(' ');

            return (
              <g key={item.label} className={seriesIndex === 0 ? 'chart-series-primary' : 'chart-series-secondary'}>
                <polyline points={points} />
              </g>
            );
          })}
        </svg>
        <div className="chart-points chart-points-multi">
          {series.flatMap((item, seriesIndex) =>
            item.values.map((value, index) => (
              <span
                className={seriesIndex === 0 ? 'chart-point-primary' : 'chart-point-secondary'}
                key={`${item.label}-${value}-${index}`}
                style={{ left: `${xPosition(index, item.values)}%`, top: `${yPosition(value, item.values)}%` }}
              />
            ))
          )}
        </div>
        {xLabels && (
          <div className="chart-x-scale">
            {xLabels.map((item) => (
              <span key={item.label} style={{ left: `${item.position}%` }}>
                {item.label}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function JourneySection({ copy, onSelect }) {
  return (
    <section className="journey-section" data-reveal data-scroll-motion>
      <h2>{copy.journeyTitle}</h2>
      <p>{copy.journeyCopy}</p>
      <div className="journey-list" data-scroll-motion>
        {demoContent.journey.map((item, index) => (
          <button
            className="journey-item"
            key={item.step}
            type="button"
            onClick={() => onSelect(item)}
            style={{ '--item-delay': `${index * 160}ms` }}
          >
            <div className="icon-disc">
              <img src={item.iconImage} alt="" aria-hidden="true" />
            </div>
            <div className="journey-copy">
              <h3>{item.step}</h3>
              <p>{item.date}</p>
              <span>{item.detail}</span>
              <small>{item.badge}</small>
            </div>
            <Icon name="chevron" />
          </button>
        ))}
      </div>
    </section>
  );
}

function StepFacts({ step }) {
  const iconNamesByStep = {
    Harvest: ['home', 'calendar', 'bean', 'checkCircle'],
    Fermentation: ['calendar', 'thermometer', 'box', 'checkCircle'],
    Drying: ['calendar', 'sun', 'checkCircle', 'sprout'],
    Roasting: ['thermometer', 'thermometer', 'calendar', 'flame'],
    Crafting: ['craft', 'calendar', 'box', 'people'],
  };
  const iconNames = iconNamesByStep[step.step] ?? ['people', 'calendar', 'bean', 'checkCircle'];

  return (
    <section className="step-facts" aria-label={`${step.step} facts`}>
      <h3 className="detail-section-title">{step.step} snapshot</h3>
      <dl>
        {step.metrics.map((metric, index) => (
          <div key={metric.label}>
            <dd>
              <Icon name={iconNames[index] ?? 'sprout'} />
              <strong>{metric.value}</strong>
            </dd>
            <dt>{metric.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
}

function QualityBars({ items }) {
  if (!items?.length) return null;

  return (
    <section className="step-profile" aria-label="Quality profile">
      {items.map((item) => (
        <div key={item.label}>
          <div className="profile-label-row">
            <span>{item.label}</span>
            <strong>{item.value}%</strong>
          </div>
          <div className="profile-track">
            <i style={{ width: `${item.value}%` }} />
          </div>
        </div>
      ))}
    </section>
  );
}

function StepTrendChart({ step }) {
  if (step.timelineSeries) {
    return (
      <section className="step-chart" aria-label={step.timelineLabel}>
        <h3 className="detail-section-title">{step.timelineLabel}</h3>
        <div className="chart-legend">
          {step.timelineSeries.map((item) => (
            <div key={item.label}>
              <span>{item.label}</span>
              <strong>{item.valueLabel}</strong>
            </div>
          ))}
        </div>
        <MultiSeriesSparkline series={step.timelineSeries} chart={step.chart} />
      </section>
    );
  }

  if (!step.timeline) return null;

  return (
    <section className="step-chart" aria-label={step.timelineLabel}>
      <h3 className="detail-section-title">{step.timelineLabel}</h3>
      <Sparkline values={step.timeline} chart={step.chart} />
    </section>
  );
}

function StepOverlay({ step, copy, onClose, isClosing = false }) {
  return (
    <div className={`step-overlay${isClosing ? ' is-closing' : ''}`} role="dialog" aria-modal="true" aria-label={step.step}>
      <div className="overlay-dismiss" aria-hidden="true" onClick={onClose} />
      <div className="step-sheet">
        <button type="button" className="close-button" aria-label={copy.closeStep} onClick={onClose}>
          <Icon name="close" />
        </button>
        <div className="step-sheet-hero">
          <img src={step.image} alt="" aria-hidden="true" />
        </div>
        <div className="step-sheet-copy">
          <span>{step.date}</span>
          <h2>{step.step}</h2>
          <p>{step.summary}</p>
        </div>
        <StepFacts step={step} />
        <StepTrendChart step={step} />
        <QualityBars items={step.profile} />
      </div>
    </div>
  );
}

function CommunityOverlay({ copy, onClose, isClosing = false }) {
  return (
    <div className={`community-overlay${isClosing ? ' is-closing' : ''}`} role="dialog" aria-modal="true" aria-label={copy.projectDetailTitle}>
      <div className="overlay-dismiss" aria-hidden="true" onClick={onClose} />
      <div className="community-sheet">
        <button
          type="button"
          className="close-button"
          aria-label={copy.closeCommunity}
          onClick={onClose}
        >
          <Icon name="close" />
        </button>
        <div className="community-sheet-hero">
          <img src={demoContent.impact.image} alt="" aria-hidden="true" />
          <div>
            <span>{demoContent.impact.pledge} pledged back</span>
            <h2>{copy.projectDetailTitle}</h2>
            <p>{copy.projectDetailCopy}</p>
          </div>
        </div>
        <div className="community-event-list">
          {demoContent.impact.communityProjects.map((event, index) => (
            <article
              className="community-event-card"
              key={event.title}
              style={{ '--event-delay': `${180 + index * 90}ms` }}
            >
              <img src={event.image} alt="" aria-hidden="true" />
              <div className="community-event-copy">
                <span>{event.type}</span>
                <h3>{event.title}</h3>
                <p>{event.summary}</p>
              </div>
              <dl className="community-event-profile">
                <div>
                  <dt>Date</dt>
                  <dd>{event.date}</dd>
                </div>
                <div>
                  <dt>Location</dt>
                  <dd>{event.location}</dd>
                </div>
              </dl>
              <div className="community-event-stats">
                {event.stats.map((stat) => (
                  <div key={stat.label}>
                    <span>{stat.label}</span>
                    <strong>{stat.value}</strong>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

function ImpactSection({ copy, onCommunitySelect }) {
  return (
    <section className="impact-section" data-scroll-motion>
      <h2>{copy.impactTitle}</h2>
      <p>{copy.impactCopy}</p>

      <img className="impact-image" src={demoContent.impact.image} alt="IKAT origin community" />

      <article className="impact-card" data-scroll-motion>
        <span className="impact-thanks-icon" aria-hidden="true">
          <Icon name="sprout" />
        </span>
        <div className="impact-copy">
          <h3>{demoContent.impact.title}</h3>
          <p>{demoContent.impact.copy}</p>
        </div>
      </article>

      <div className="impact-metrics" data-scroll-motion>
        <div>
          <span>Farmer price</span>
          <strong>{demoContent.impact.farmerPrice}</strong>
          <p>above local market average</p>
        </div>
        <div>
          <span>Pledging back</span>
          <strong>{demoContent.impact.pledge}</strong>
          <p>of this purchase supports the origin</p>
        </div>
      </div>

      <button
        type="button"
        className="community-card"
        data-scroll-motion
        onClick={onCommunitySelect}
        aria-label={copy.projectTitle}
      >
        <span className="community-icon">
          <Icon name="community" />
        </span>
        <div>
          <h3>{copy.projectTitle}</h3>
          <p>{copy.projectCopy}</p>
        </div>
        <Icon name="chevron" />
      </button>
    </section>
  );
}

function MapOverlay({ copy, onClose, isClosing = false }) {
  const originFacts = [
    { label: 'Named partners', value: '4', icon: 'people' },
    { label: 'Contributing families', value: '23', icon: 'community' },
    { label: 'Avg. elevation', value: demoContent.origin.altitude, icon: 'mountain' },
    { label: 'Cacao type', value: demoContent.origin.cacaoType, icon: 'pod' },
  ];

  return (
    <div className={`map-overlay${isClosing ? ' is-closing' : ''}`} role="dialog" aria-modal="true" aria-label={copy.mapTitle}>
      <div className="overlay-dismiss" aria-hidden="true" onClick={onClose} />
      <div className="map-sheet">
        <button type="button" className="close-button" aria-label={copy.closeMap} onClick={onClose}>
          <Icon name="close" />
        </button>
        <div className="map-copy">
          <span>{demoContent.origin.displayCoordinates}</span>
          <h2>{copy.mapTitle}</h2>
          <p>{copy.mapCopy}</p>
        </div>
        <div className="mini-map" aria-label={copy.mapTitle}>
          <img src="./assets/farmer-detail-map.png" alt="" aria-hidden="true" />
          <div className="mini-map-shade" />
          <div className="mini-map-scan" />
          {demoContent.farmers.filter((farmer) => !farmer.isAggregate).map((farmer, index) => (
            <div
              className="origin-map-dot"
              key={farmer.name}
              aria-label={farmer.name}
              title={farmer.name}
              style={{
                left: `${farmer.overviewPin?.x ?? farmer.mapPin?.x ?? 50}%`,
                top: `${farmer.overviewPin?.y ?? farmer.mapPin?.y ?? 50}%`,
                '--dot-delay': `${220 + index * 90}ms`,
              }}
            />
          ))}
        </div>
        <div className="map-detail-body">
          <dl className="map-origin-facts">
            {originFacts.map((fact) => (
              <div key={fact.label}>
                <dd>
                  <Icon name={fact.icon} />
                  {fact.value}
                </dd>
                <dt>{fact.label}</dt>
              </div>
            ))}
          </dl>
          <div className="map-context-block">
            <Icon name="sprout" />
            <p>Grown on the lush island of Flores, Indonesia. Volcanic soils, rich biodiversity, and generations of care shape the character of this cacao.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [language, setLanguage] = useState('en');
  const [mapOpen, setMapOpen] = useState(false);
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [selectedStep, setSelectedStep] = useState(null);
  const [communityOpen, setCommunityOpen] = useState(false);
  const [closingOverlay, setClosingOverlay] = useState(null);
  const closeTimerRef = useRef(null);
  const copy = useMemo(() => translations[language], [language]);
  const overlayOpen = mapOpen || selectedFarmer || selectedStep || communityOpen || closingOverlay;

  const clearCloseTimer = () => {
    if (!closeTimerRef.current) return;
    window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = null;
  };

  const closeOverlay = (overlay) => {
    clearCloseTimer();
    setClosingOverlay(overlay);

    closeTimerRef.current = window.setTimeout(() => {
      if (overlay === 'map') setMapOpen(false);
      if (overlay === 'farmer') setSelectedFarmer(null);
      if (overlay === 'step') setSelectedStep(null);
      if (overlay === 'community') setCommunityOpen(false);
      setClosingOverlay(null);
      closeTimerRef.current = null;
    }, OVERLAY_EXIT_MS);
  };

  const openMap = () => {
    clearCloseTimer();
    setClosingOverlay(null);
    setMapOpen(true);
  };

  const openFarmer = (farmer) => {
    clearCloseTimer();
    setClosingOverlay(null);
    setSelectedFarmer(farmer);
  };

  const openStep = (step) => {
    clearCloseTimer();
    setClosingOverlay(null);
    setSelectedStep(step);
  };

  const openCommunity = () => {
    clearCloseTimer();
    setClosingOverlay(null);
    setCommunityOpen(true);
  };

  useRevealOnScroll();
  useScrollMotion();

  useEffect(() => {
    document.body.classList.toggle('modal-open', Boolean(overlayOpen));

    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [overlayOpen]);

  useEffect(() => () => clearCloseTimer(), []);

  useEffect(() => {
    if (!overlayOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key !== 'Escape') return;
      if (communityOpen) closeOverlay('community');
      else if (selectedStep) closeOverlay('step');
      else if (selectedFarmer) closeOverlay('farmer');
      else if (mapOpen) closeOverlay('map');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [overlayOpen]);

  return (
    <main className="app-shell">
      <Header copy={copy} language={language} setLanguage={setLanguage} />

      <section className="origin-hero">
        <img src={demoContent.origin.image} alt="Flores Island cacao origin landscape" />
        <div className="origin-hero-copy">
          <h1>{copy.heroTitle}</h1>
          <p>{copy.heroSubtitle}</p>
          <div className="hero-origin-card" aria-label="Cacao traceability summary">
            <div className="hero-origin-line hero-origin-line-short" />
            <div className="hero-origin-message">
              <span className="hero-origin-icon" aria-hidden="true">
                <img src="./assets/living-origin-logo.png" alt="" />
              </span>
              <div>
                <strong>This is your cacao</strong>
                <span>Trace every step from farm to chocolate.</span>
              </div>
            </div>
            <div className="lot-chip">
              <span aria-hidden="true" />
              Lot {demoContent.origin.lot}
            </div>
          </div>
        </div>
      </section>

      <section className="origin-card-wrap">
        <FarmersSection copy={copy} onSelect={openFarmer} />
      </section>

      <TastingNotes copy={copy} onViewMap={openMap} />

      <JourneySection copy={copy} onSelect={openStep} />
      <ImpactSection copy={copy} onCommunitySelect={openCommunity} />

      <Footer />

      {(mapOpen || closingOverlay === 'map') && (
        <MapOverlay copy={copy} onClose={() => closeOverlay('map')} isClosing={closingOverlay === 'map'} />
      )}
      {selectedFarmer && (
        <FarmerOverlay
          farmer={selectedFarmer}
          copy={copy}
          onClose={() => closeOverlay('farmer')}
          isClosing={closingOverlay === 'farmer'}
        />
      )}
      {selectedStep && (
        <StepOverlay
          step={selectedStep}
          copy={copy}
          onClose={() => closeOverlay('step')}
          isClosing={closingOverlay === 'step'}
        />
      )}
      {(communityOpen || closingOverlay === 'community') && (
        <CommunityOverlay
          copy={copy}
          onClose={() => closeOverlay('community')}
          isClosing={closingOverlay === 'community'}
        />
      )}
    </main>
  );
}

export default App;
