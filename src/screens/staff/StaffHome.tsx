import { Link } from 'react-router-dom';
import { StaffTabBar } from '../../components/mobile/TabBar';
import { MobileScreen } from '../../components/mobile/MobileScreen';
import { Avatar } from '../../components/ui/Avatar';
import { ListGroup, ListRow } from '../../components/ui/Card';
import { Chip } from '../../components/ui/Chip';
import { SectionHeader } from '../../components/ui/Heading';
import { Icon } from '../../components/ui/Icon';
import { IconTile } from '../../components/ui/IconTile';
import { approvals, staffAlerts, staffMember, todayStats, upcomingJoiners } from '../../data/staff';
import { paths } from '../../routes';
import './StaffHome.css';

export function StaffHome() {
  const pending = {
    docs: approvals.docs.length,
    avail: approvals.avail.length,
    claims: approvals.claims.length,
  };
  const pendingTotal = pending.docs + pending.avail + pending.claims;

  return (
    <MobileScreen
      gap={20}
      mainClassName="staff-home__main"
      nav={<StaffTabBar active="today" />}
      header={
        <header className="staff-home__header">
          <div className="staff-home__who">
            <Avatar initials={staffMember.initials} size={44} tone="sky" />
            <div className="staff-home__greeting">
              <span className="staff-home__hello">Good afternoon, {staffMember.firstName}</span>
              <span className="staff-home__role">{staffMember.role}</span>
            </div>
            <Link to={paths.signIn} aria-label="Sign out" className="staff-home__signout">
              <Icon name="signOut" size={20} strokeWidth={1.9} />
            </Link>
          </div>
          <div className="staff-stats">
            {todayStats.map((s) => (
              <div key={s.label} className="staff-stats__tile">
                <span className="staff-stats__value">{s.value}</span>
                <span className="staff-stats__label">{s.label}</span>
              </div>
            ))}
          </div>
        </header>
      }
    >
      <Link to={paths.staff.approvals} className="approvals-callout">
        <span className="approvals-callout__count">{pendingTotal}</span>
        <span className="approvals-callout__text">
          <span className="approvals-callout__title">Waiting for your approval</span>
          <span className="approvals-callout__meta">
            {pending.docs} documents · {pending.avail} availability updates · {pending.claims} claim
          </span>
        </span>
        <Icon name="chevronRight" size={20} strokeWidth={2} />
      </Link>

      <section aria-labelledby="joiners" className="staff-home__section">
        <SectionHeader id="joiners" title="Joiners in the next 21 days" aside={`${upcomingJoiners.length} crew`} />
        <ListGroup>
          {upcomingJoiners.map((j) => (
            <ListRow
              key={j.name}
              to={paths.staff.crew}
              leading={<Avatar initials={j.initials} size={40} />}
              title={
                <>
                  {j.name} <span className="staff-home__rank">· {j.rank}</span>
                </>
              }
              meta={`${j.vessel} · ${j.date}`}
              trailing={<Chip tone={j.tone}>{j.status}</Chip>}
            />
          ))}
        </ListGroup>
      </section>

      <section aria-labelledby="alerts" className="staff-home__section">
        <SectionHeader id="alerts" title="Alerts" />
        {staffAlerts.map((a) => (
          <div key={a.title} className="card staff-alert">
            <IconTile icon={a.icon} tone={a.tone} size="sm" iconSize={18} strokeWidth={2} />
            <span className="staff-alert__text">
              <span className="staff-alert__title">{a.title}</span>
              <span className="staff-alert__meta">{a.meta}</span>
            </span>
          </div>
        ))}
      </section>

      <Link to={paths.console.planning} className="console-callout">
        <Icon name="monitor" size={22} className="console-callout__icon" />
        <span className="console-callout__text">
          <strong>Planning, flights and assignments</strong> are on the web console
        </span>
        <Icon name="chevronRight" size={18} strokeWidth={2} />
      </Link>
    </MobileScreen>
  );
}
