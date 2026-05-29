import { useEffect, useMemo, useState } from 'react';
import { demoContent } from './data/demoContent.js';

const translations = {
  en: {
    menu: 'Menu',
    language: 'Language',
    farmerAltitude: 'Farm altitude',
    cacaoType: 'Cacao type',
    trees: 'Trees',
    journeyTitle: 'Follow the full journey',
    journeyCopy: 'From harvest to chocolate.',
    impactTitle: 'Your Impact',
    impactCopy: "You're not just enjoying great chocolate. You're creating real change.",
    projectTitle: 'Community projects supported',
    projectCopy: 'Education, fermentation training, and farm infrastructure.',
    projectDetailTitle: 'Community projects supported',
    projectDetailCopy: 'A scrollable record of trainings, tools, and education supported by this batch.',
    closeCommunity: 'Close community projects',
    viewMap: 'View origin map',
    closeMap: 'Close map',
    mapTitle: 'Farm locations',
    mapCopy: 'This map shows the origin region. Each point marks one named partner farm that contributed cacao to this batch.',
    mapArea: 'Origin region',
    farmersTitle: 'Main Farmers',
    farmersCopy: 'This batch blends cacao from four named partners and 23 smaller contributors.',
    batchShare: 'Batch share',
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
    journeyTitle: 'Follow the full journey',
    journeyCopy: 'From harvest to chocolate.',
    impactTitle: 'Your Impact',
    impactCopy: "You're not just enjoying great chocolate. You're creating real change.",
    projectTitle: 'Community projects supported',
    projectCopy: 'Education, fermentation training, and farm infrastructure.',
    projectDetailTitle: 'Community projects supported',
    projectDetailCopy: 'A scrollable record of trainings, tools, and education supported by this batch.',
    closeCommunity: 'Close community projects',
    viewMap: 'View origin map',
    closeMap: 'Close map',
    mapTitle: 'Farm locations',
    mapCopy: 'This map shows the origin region. Each point marks one named partner farm that contributed cacao to this batch.',
    mapArea: 'Origin region',
    farmersTitle: 'Main Farmers',
    farmersCopy: 'This batch blends cacao from four named partners and 23 smaller contributors.',
    batchShare: 'Batch share',
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
    cacaoSingle:
      'M12.4 3.4c5.1 3.4 6.5 10.2 2.6 16.7-5.6-2.4-8.1-8.8-5.4-15.5m2.8-1.2C7.6 8.1 7.9 15.5 15 20.1M9 7.8c1.7.8 3.6.8 5.4.2M8.3 11.5c2.3.8 4.8.8 7.2-.1M9.6 15.4c1.6.6 3.3.5 5-.1',
    pod: 'M8.5 20c-3-3.7-3-9.9 0-15.8 4.6 3.3 6.2 9.8 3.5 15.3M15.5 20c3-3.7 3-9.9 0-15.8-4.6 3.3-6.2 9.8-3.5 15.3M12 5v15M6 8.2c1.5.9 3 1.1 4.5.6M18 8.2c-1.5.9-3 1.1-4.5.6',
    ferment: 'M5 11h14v8H5v-8Zm2 3h4m2 0h4M8 8c0-1.4 1.6-1.4 1.6-3M12 8c0-1.4 1.6-1.4 1.6-3M16 8c0-1.4 1.6-1.4 1.6-3',
    sun: 'M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0-13v2.2m0 13.6V21M3 12h2.2m13.6 0H21M5.6 5.6l1.5 1.5m9.8 9.8 1.5 1.5m0-12.8-1.5 1.5m-9.8 9.8-1.5 1.5',
    flame: 'M12 21c3.7-1.8 5.7-4.7 5.7-8.2 0-3.6-2.1-6.4-5.6-9.8-.3 3.8-3.6 5.2-5 8.5-1.5 3.7.6 7.5 4.9 9.5Zm.1-1.2c-1.6-1.1-2.4-2.5-2.4-4.2 0-1.5.8-2.8 2.4-4.3 1.5 1.5 2.2 2.8 2.2 4.3 0 1.7-.7 3.1-2.2 4.2Z',
    craft: 'M5 5h14v14H5V5Zm0 7h14M12 5v14M8.5 8.5h.1m6.8 0h.1m-7 7h.1m6.8 0h.1',
    chevron: 'm9 18 6-6-6-6',
    people: 'M16 19c0-2.2-1.8-4-4-4s-4 1.8-4 4m8-8a4 4 0 1 0-8 0 4 4 0 0 0 8 0Zm6 8c0-1.9-1.3-3.4-3-3.9M19 7.5a3 3 0 0 1 0 5.9M2 19c0-1.9 1.3-3.4 3-3.9M5 7.5a3 3 0 0 0 0 5.9',
    community:
      'M8 19c0-2.3 1.8-4 4-4s4 1.7 4 4M15.5 11a3.5 3.5 0 1 0-7 0 3.5 3.5 0 0 0 7 0ZM3.5 18c.4-2 1.8-3.3 3.8-3.7M6.5 8.8a2.8 2.8 0 0 0 .7 5.5M20.5 18c-.4-2-1.8-3.3-3.8-3.7M17.5 8.8a2.8 2.8 0 0 1-.7 5.5',
    leaf: 'M6 18C6 9 12 4 21 4c0 9-5 15-14 15m0 0c2-5 6-8 11-10',
    close: 'M6 6l12 12M18 6 6 18',
  };

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="icon">
      <path d={paths[name]} />
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
        <span>{demoContent.headerBrand}</span>
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

      root.style.setProperty('--hero-parallax-y', `${Math.min(scrollY * 0.28, 96)}px`);
      root.style.setProperty('--hero-scale', `${1.3 + Math.min(scrollY * 0.00024, 0.08)}`);
      root.style.setProperty('--hero-copy-y', `${Math.min(scrollY * 0.14, 52)}px`);
      root.style.setProperty('--hero-copy-opacity', `${clamp(1 - scrollY / 330, 0, 1)}`);
      root.style.setProperty('--header-shadow-opacity', `${clamp(scrollY / 180, 0, 1)}`);

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
        <span>{demoContent.lot}</span>
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

function BatchProfile({ copy, onViewMap }) {
  const profile = demoContent.batchProfile;

  return (
    <section className="batch-profile" data-reveal data-scroll-motion aria-labelledby="batch-profile-title">
      <div className="batch-profile-head">
        <div className="batch-mark" aria-hidden="true">
          <Icon name="cacaoSingle" />
        </div>
        <div>
          <span>{profile.eyebrow}</span>
          <h2 id="batch-profile-title">{demoContent.lot}</h2>
          <p>{demoContent.cacaoType}</p>
        </div>
      </div>

      <p className="batch-profile-copy">{profile.copy}</p>

      <div className="flavor-chip-list" aria-label="Flavor notes">
        {profile.flavorNotes.map((note) => (
          <span key={note}>{note}</span>
        ))}
      </div>

      <div className="batch-moments" aria-label="Tasting moments">
        {profile.moments.map((moment) => (
          <div key={moment.label}>
            <span>{moment.label}</span>
            <strong>{moment.value}</strong>
          </div>
        ))}
      </div>

      <div className="batch-profile-footer">
        <p className="origin-cue">
          <Icon name="leaf" />
          From {demoContent.origin.location} · {demoContent.origin.altitude}
        </p>

        <button type="button" className="location-chip" onClick={onViewMap}>
          <Icon name="pin" />
          {copy.viewMap}
        </button>
      </div>
    </section>
  );
}

function FarmerOverlay({ farmer, copy, onClose }) {
  const pinStyle = {
    left: `${farmer.mapPin?.x ?? 56}%`,
    top: `${farmer.mapPin?.y ?? 50}%`,
  };

  return (
    <div className="farmer-overlay" role="dialog" aria-modal="true" aria-label={farmer.name}>
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
            <span>{farmer.role}</span>
            <h2>{farmer.name}</h2>
            <strong className="share-badge">{farmer.share} {copy.batchShare}</strong>
          </div>
        </div>
        <p className="farmer-story">{farmer.story}</p>
        <dl className="farmer-detail-stats">
          <div>
            <dt>{copy.farmerAltitude}</dt>
            <dd>
              <Icon name="mountain" />
              {farmer.altitude}
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
              {farmer.trees}
            </dd>
          </div>
        </dl>
        <dl className="farmer-partner-stats">
          <div>
            <dt>{copy.village}</dt>
            <dd>{farmer.village}</dd>
          </div>
          <div>
            <dt>{copy.deliveredThisYear}</dt>
            <dd>{farmer.deliveredThisYear}</dd>
          </div>
          <div>
            <dt>{copy.partnerStatus}</dt>
            <dd>{farmer.partnerStatus}</dd>
          </div>
        </dl>
        <p className="farm-note">
          <Icon name="pin" />
          {farmer.farm}
        </p>
        <section className="farmer-map-card" aria-label={copy.farmMap} style={{ '--pin-x': `${farmer.mapPin?.x ?? 56}%`, '--pin-y': `${farmer.mapPin?.y ?? 50}%` }}>
          <img src="./assets/farmer-detail-map.png" alt="" aria-hidden="true" />
          <div className="farmer-map-shade" />
          <div className="farmer-map-scan" />
          <div className="farmer-map-pin" style={pinStyle}>
            <span>
              <Icon name="pin" />
            </span>
            <strong>{farmer.name}</strong>
          </div>
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
          {values.map((value, index) => {
            const x = xPosition(index);
            const y = yPosition(value);
            return <circle key={`${value}-${index}`} cx={x} cy={y} r="1.8" />;
          })}
        </svg>
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
            <div className={`icon-disc ${item.accent}`}>
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

function StepOverlay({ step, copy, onClose }) {
  return (
    <div className="step-overlay" role="dialog" aria-modal="true" aria-label={step.step}>
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
        <div className="step-metrics">
          {step.metrics.map((metric) => (
            <div key={metric.label}>
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
            </div>
          ))}
        </div>
        {step.timeline && (
          <section className="step-chart" aria-label={step.timelineLabel}>
            <div>
              <span>{step.timelineLabel}</span>
              <strong>{step.timelineStat ?? `${Math.max(...step.timeline)} peak`}</strong>
            </div>
            <Sparkline values={step.timeline} chart={step.chart} />
          </section>
        )}
        {step.profile && (
          <section className="step-profile">
            {step.profile.map((item) => (
              <div key={item.label}>
                <span>{item.label}</span>
                <div className="profile-track">
                  <i style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}

function CommunityOverlay({ copy, onClose }) {
  return (
    <div className="community-overlay" role="dialog" aria-modal="true" aria-label={copy.projectDetailTitle}>
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
          <img src="./assets/photo-community.png" alt="" aria-hidden="true" />
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

      <article className="impact-card" data-scroll-motion>
        <img src={demoContent.impact.image} alt="IKAT origin community" />
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

function MapOverlay({ copy, onClose }) {
  return (
    <div className="map-overlay" role="dialog" aria-modal="true" aria-label={copy.mapTitle}>
      <div className="overlay-dismiss" aria-hidden="true" onClick={onClose} />
      <div className="map-sheet">
        <button type="button" className="close-button" aria-label={copy.closeMap} onClick={onClose}>
          <Icon name="close" />
        </button>
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
        <div className="map-copy">
          <span>{demoContent.origin.displayCoordinates}</span>
          <h2>{copy.mapTitle}</h2>
          <p>{copy.mapCopy}</p>
          <strong>{copy.mapArea}</strong>
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
  const copy = useMemo(() => translations[language], [language]);
  const overlayOpen = mapOpen || selectedFarmer || selectedStep || communityOpen;

  useRevealOnScroll();
  useScrollMotion();

  useEffect(() => {
    document.body.classList.toggle('modal-open', Boolean(overlayOpen));

    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [overlayOpen]);

  useEffect(() => {
    if (!overlayOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key !== 'Escape') return;
      setMapOpen(false);
      setSelectedFarmer(null);
      setSelectedStep(null);
      setCommunityOpen(false);
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
          <h1>{demoContent.origin.title}</h1>
          <p>{demoContent.origin.subtitle}</p>
        </div>
      </section>

      <section className="origin-card-wrap">
        <FarmersSection copy={copy} onSelect={setSelectedFarmer} />
      </section>

      <BatchProfile copy={copy} onViewMap={() => setMapOpen(true)} />

      <JourneySection copy={copy} onSelect={setSelectedStep} />
      <ImpactSection copy={copy} onCommunitySelect={() => setCommunityOpen(true)} />

      <footer className="powered-footer">
        <span>{demoContent.impact.footer}</span>
      </footer>

      {mapOpen && <MapOverlay copy={copy} onClose={() => setMapOpen(false)} />}
      {selectedFarmer && (
        <FarmerOverlay farmer={selectedFarmer} copy={copy} onClose={() => setSelectedFarmer(null)} />
      )}
      {selectedStep && (
        <StepOverlay step={selectedStep} copy={copy} onClose={() => setSelectedStep(null)} />
      )}
      {communityOpen && <CommunityOverlay copy={copy} onClose={() => setCommunityOpen(false)} />}
    </main>
  );
}

export default App;
