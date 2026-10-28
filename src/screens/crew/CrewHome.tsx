import { Link } from 'react-router-dom';
import { CrewTabBar } from '../../components/mobile/TabBar';
import { MobileScreen } from '../../components/mobile/MobileScreen';
import { Button } from '../../components/ui/Button';
import { Chip, Pill } from '../../components/ui/Chip';
import { FactGrid } from '../../components/ui/DataList';
import { SectionHeader } from '../../components/ui/Heading';
import { Icon } from '../../components/ui/Icon';
import { IconTile } from '../../components/ui/IconTile';
import { ListGroup, ListRow } from '../../components/ui/Card';
import { actionsNeeded, crewMember, latestUpdates, nextJoining } from '../../data/crew';
import { paths } from '../../routes';
import './CrewHome.css';

export function CrewHome() {
  const { flight } = nextJoining;

  return (
    <MobileScreen
      gap={22}
      mainClassName="crew-home__main"
      nav={<CrewTabBar active="home" />}
      header={
        <header className="crew-home__header">
          <Link to={paths.crew.profile} aria-label="My profile" className="crew-home__avatar">
            {crewMember.initials}
          </Link>
          <div className="crew-home__who">
            <span className="crew-home__welcome">Welcome back</span>
            <span className="crew-home__name">{crewMember.name}</span>
            <span className="crew-home__meta">
              {crewMember.rank} · Last login {crewMember.lastLogin}
            </span>
          </div>
          <Link
            to={paths.crew.circulars}
            aria-label={`Notifications, ${crewMember.unreadNotifications} unread`}
            className="icon-button crew-home__bell"
          >
            <Icon name="bell" size={22} />
            <span aria-hidden="true" className="crew-home__badge">
              {crewMember.unreadNotifications}
            </span>
          </Link>
        </header>
      }
    >
      <section aria-labelledby="next-joining" className="next-joining">
        <div className="next-joining__top">
          <h2 id="next-joining" className="next-joining__eyebrow">
            Next joining
          </h2>
          <Pill>in {nextJoining.daysToGo} days</Pill>
        </div>
        <div className="next-joining__vessel">
          <span className="next-joining__vessel-name">{nextJoining.vessel}</span>
          <span className="next-joining__vessel-type">{nextJoining.vesselType} · Planned vessel</span>
        </div>
        <FactGrid
          tone="on-dark"
          size="lg"
          className="next-joining__facts"
          items={[
            { label: 'Joining date', value: nextJoining.date },
            { label: 'Joining port', value: nextJoining.port },
          ]}
        />
        <ul className="next-joining__readiness" aria-label="Readiness">
          {nextJoining.readiness.map((r) => (
            <li key={r.label} className="next-joining__ready-chip">
              <Icon
                name={r.done ? 'check' : 'clock'}
                size={14}
                strokeWidth={2.4}
                className={r.done ? 'next-joining__ready-icon--done' : 'next-joining__ready-icon--pending'}
              />
              {r.label}
            </li>
          ))}
        </ul>
        <Link to={paths.crew.flight} className="next-joining__flight">
          <Icon name="plane" size={20} className="next-joining__plane" />
          <span className="next-joining__flight-text">
            <span className="next-joining__flight-route">
              {flight.route} · {flight.number}
            </span>
            <span className="next-joining__flight-meta">
              Departs {flight.departs} · PNR {flight.pnr}
            </span>
          </span>
          <Icon name="chevronRight" size={18} strokeWidth={2} />
        </Link>
        <Button to={paths.crew.joining} variant="light" size="xl" block>
          View joining details
        </Button>
      </section>

      <section aria-labelledby="actions" className="crew-home__section">
        <SectionHeader id="actions" title="Action needed" aside={`${actionsNeeded.length} items`} />
        <ListGroup size="lg">
          {actionsNeeded.map((a) => (
            <ListRow
              key={a.title}
              to={a.to}
              leading={<IconTile icon={a.icon} tone={a.tone} />}
              title={a.title}
              meta={a.meta}
              metaTone={a.tone === 'info' ? undefined : a.tone}
            />
          ))}
        </ListGroup>
      </section>

      <section aria-labelledby="updates" className="crew-home__section">
        <SectionHeader id="updates" title="Latest updates" aside={<Link to={paths.crew.circulars}>See all</Link>} />
        {latestUpdates.map((u) => (
          <Link key={u.title} to={paths.crew.circulars} className="card update-card">
            <span className="update-card__top">
              <Chip tone={u.tone}>{u.tag}</Chip>
              <span className="update-card__date">{u.date}</span>
            </span>
            <span className="update-card__title">{u.title}</span>
          </Link>
        ))}
      </section>
    </MobileScreen>
  );
}
