import { useEffect, useLayoutEffect, type MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { rememberOverviewSection } from '../../lib/overviewReturn';
import logo from '../../assets/apollo-logo.png';
import { Button } from '../../components/ui/Button';
import { Icon } from '../../components/ui/Icon';
import { IconTile } from '../../components/ui/IconTile';
import { care, closing, hero, journey, personas, pilotMetrics, problem, rollout, value } from '../../data/overview';
import { paths } from '../../routes';
import { ScaledFrame } from './ScaledFrame';
import './Overview.css';

const navLinks = [
  { href: '#journey', label: 'Journey' },
  { href: '#care', label: 'Crew care' },
  { href: '#pilot', label: 'Pilot' },
];

/** Leadership overview: the value proposition, with links into the live demo. */
export function Overview() {
  useEffect(() => {
    const previous = document.title;
    document.title = 'Apollo Maritime · Overview';
    return () => {
      document.title = previous;
    };
  }, []);

  // Arriving from a demo screen: land on the section the viewer left from.
  useLayoutEffect(() => {
    const target = window.location.hash && document.getElementById(window.location.hash.slice(1));
    if (target) target.scrollIntoView();
    else window.scrollTo(0, 0);
  }, []);

  // Before leaving for a demo screen, note which section the link sat in.
  const rememberSection = (e: MouseEvent<HTMLDivElement>) => {
    const link = (e.target as Element).closest('a');
    if (!link || !link.getAttribute('href')?.startsWith('/')) return;
    rememberOverviewSection(link.closest('section[id]')?.id ?? 'top');
  };

  return (
    <div className="ov" onClickCapture={rememberSection}>
      <header className="ov-nav">
        <div className="ov-wrap ov-nav__inner">
          <Link to={paths.overview} className="ov-nav__brand" aria-label="Apollo Maritime overview">
            <img src={logo} alt="" width={118} height={36} />
          </Link>
          <nav aria-label="Sections" className="ov-nav__links">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>
          <Button to={paths.signIn} size="sm" className="ov-nav__cta">
            Open the live demo
          </Button>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section id="top" className="ov-hero" aria-labelledby="ov-title">
          <div className="ov-wrap ov-hero__copy">
            <p className="ov-eyebrow">{hero.eyebrow}</p>
            <h1 id="ov-title" className="ov-hero__title">
              {hero.headlineLead} <em>{hero.headlineAccent}</em>.
            </h1>
            <p className="ov-hero__sub">{hero.subtext}</p>
            <div className="ov-hero__ctas">
              <Button to={paths.signIn} size="hero" iconAfter="chevronRight">
                Open the live demo
              </Button>
              <Button href="#problem" variant="outline" size="hero">
                See what changes
              </Button>
            </div>
          </div>

          <div className="ov-wrap ov-reveal">
            <figure className="ov-reveal__phone">
              <div className="ov-phone">
                <ScaledFrame src={paths.crew.home} width={390} height={844} />
              </div>
              <figcaption>
                <Link to={paths.crew.home}>Crew app</Link> · what the seafarer sees
              </figcaption>
            </figure>
            <figure className="ov-reveal__console">
              <div className="ov-window">
                <div className="ov-window__bar" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
                <ScaledFrame src={paths.console.planning} width={1280} height={800} />
              </div>
              <figcaption>
                <Link to={paths.console.planning}>Web console</Link> · how the crewing team plans
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Problem */}
        <section id="problem" className="ov-section" aria-labelledby="problem-title">
          <div className="ov-wrap ov-split">
            <div>
              <p className="ov-eyebrow">The problem today</p>
              <h2 id="problem-title" className="ov-h2">
                {problem.title}
              </h2>
              <p className="ov-lead">{problem.lead}</p>
            </div>
            <ul className="ov-problem">
              {problem.points.map((p) => (
                <li key={p.who}>
                  <strong>{p.who}</strong> {p.text}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Who it's for */}
        <section id="who" className="ov-section ov-section--tint" aria-labelledby="who-title">
          <div className="ov-wrap">
            <p className="ov-eyebrow">Who it’s for</p>
            <h2 id="who-title" className="ov-h2">
              One record, three people who depend on it
            </h2>
            <div className="ov-grid ov-grid--3">
              {personas.map((p) => (
                <article key={p.who} className="ov-card">
                  <IconTile icon={p.icon} tone={p.tone} size="lg" />
                  <h3 className="ov-card__title">{p.who}</h3>
                  <p className="ov-card__meta">{p.example}</p>
                  <dl className="ov-card__facts">
                    <dt>Their job</dt>
                    <dd>{p.job}</dd>
                    <dt>What Apollo gives</dt>
                    <dd>{p.gives}</dd>
                  </dl>
                  <Link to={p.to} className="ov-card__link">
                    {p.linkLabel}
                    <Icon name="chevronRight" size={16} strokeWidth={2.2} />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Journey */}
        <section id="journey" className="ov-section" aria-labelledby="journey-title">
          <div className="ov-wrap">
            <p className="ov-eyebrow">The seafarer’s journey</p>
            <h2 id="journey-title" className="ov-h2">
              From anxious to <em>ready</em>
            </h2>
            <ol className="ov-journey">
              {journey.map((s, i) => (
                <li key={s.step} className="ov-journey__stage">
                  <div className="ov-journey__head">
                    <span className="ov-journey__num" aria-hidden="true">
                      {i + 1}
                    </span>
                    <h3>{s.step}</h3>
                  </div>
                  <div className="ov-journey__today">
                    <span className="ov-tag ov-tag--warn">Today · {s.feeling}</span>
                    <p>{s.today}</p>
                  </div>
                  <div className="ov-journey__apollo">
                    <span className="ov-tag ov-tag--ok">With Apollo</span>
                    <p>{s.apollo}</p>
                  </div>
                  <Link to={s.to} className="ov-card__link">
                    See the screen
                    <Icon name="chevronRight" size={16} strokeWidth={2.2} />
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Care */}
        <section id="care" className="ov-section ov-section--tint" aria-labelledby="care-title">
          <div className="ov-wrap">
            <p className="ov-eyebrow">Crew care</p>
            <h2 id="care-title" className="ov-h2">
              {care.title}
            </h2>
            <p className="ov-lead">{care.lead}</p>
            <div className="ov-grid ov-grid--4">
              {care.cards.map((c) => (
                <Link key={c.title} to={c.to} className="ov-card ov-card--link">
                  <IconTile icon={c.icon} tone={c.tone} size="md" />
                  <h3 className="ov-card__title">{c.title}</h3>
                  <p className="ov-card__text">{c.text}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Value */}
        <section id="value" className="ov-section" aria-labelledby="value-title">
          <div className="ov-wrap ov-split">
            <div>
              <p className="ov-eyebrow">For leadership</p>
              <h2 id="value-title" className="ov-h2">
                {value.title}
              </h2>
              <p className="ov-lead">{value.lead}</p>
            </div>
            <ol className="ov-ranked">
              {value.ranked.map((v) => (
                <li key={v.title}>
                  <h3>{v.title}</h3>
                  <p>{v.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Pilot metrics: the navy band */}
        <section id="pilot" className="ov-band" aria-labelledby="pilot-title">
          <div className="ov-wrap">
            <p className="ov-eyebrow ov-eyebrow--on-navy">Proof, not promises</p>
            <h2 id="pilot-title" className="ov-h2 ov-h2--on-navy">
              {pilotMetrics.title}
            </h2>
            <p className="ov-lead ov-lead--on-navy">{pilotMetrics.lead}</p>
            <ul className="ov-metrics">
              {pilotMetrics.metrics.map((m) => (
                <li key={m.label} className={'afterPilot' in m ? 'is-after-pilot' : undefined}>
                  <Icon name={m.icon} size={22} strokeWidth={1.8} />
                  <span>
                    {m.label}
                    {'afterPilot' in m && <span className="ov-metrics__tag">Tracked after the pilot</span>}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Rollout */}
        <section id="rollout" className="ov-section" aria-labelledby="rollout-title">
          <div className="ov-wrap">
            <p className="ov-eyebrow">Next steps</p>
            <h2 id="rollout-title" className="ov-h2">
              {rollout.title}
            </h2>
            <ol className="ov-grid ov-grid--3 ov-steps">
              {rollout.steps.map((s, i) => (
                <li key={s.title} className="ov-card">
                  <span className="ov-steps__num" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="ov-card__title">{s.title}</h3>
                  <p className="ov-card__text">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Closing CTA */}
        <section id="closing" className="ov-closing" aria-labelledby="closing-title">
          <div className="ov-wrap ov-closing__inner">
            <h2 id="closing-title" className="ov-h2">
              {closing.title}
            </h2>
            <p className="ov-lead">{closing.text}</p>
            <div className="ov-hero__ctas">
              <Button to={paths.signIn} size="hero" iconAfter="chevronRight">
                Open the live demo
              </Button>
              <Button to={paths.console.planning} variant="outline" size="hero">
                Open the web console
              </Button>
            </div>
            <p className="ov-closing__contact">
              {closing.contact.lead} <strong>{closing.contact.name}</strong>
              <span className="ov-closing__channels">
                <a href={`mailto:${closing.contact.email}`}>
                  <Icon name="mail" size={16} />
                  {closing.contact.email}
                </a>
                <a href={closing.contact.phoneHref}>
                  <Icon name="phone" size={16} />
                  {closing.contact.phone}
                </a>
              </span>
            </p>
          </div>
        </section>
      </main>

      <footer className="ov-footer">
        <div className="ov-wrap">Apollo Maritime · demo with sample data</div>
      </footer>
    </div>
  );
}
