import { useState } from 'react';
import { StaffTabBar } from '../../components/mobile/TabBar';
import { MobileScreen, TitleHeader } from '../../components/mobile/MobileScreen';
import { Avatar } from '../../components/ui/Avatar';
import { Button } from '../../components/ui/Button';
import { ListGroup, ListRow } from '../../components/ui/Card';
import { SearchField } from '../../components/ui/Form';
import { SectionHeader } from '../../components/ui/Heading';
import { Icon, type IconName } from '../../components/ui/Icon';
import { IconTile } from '../../components/ui/IconTile';
import { crewProfile, joiningReadiness, recentContracts, type ReadinessState } from '../../data/staff';
import { paths } from '../../routes';
import './StaffCrew.css';

const stateIcon: Record<ReadinessState, IconName> = { ok: 'check', warn: 'clockHands', bad: 'exclaim' };

export function StaffCrew() {
  const [reminded, setReminded] = useState(false);

  return (
    <MobileScreen
      gap={16}
      nav={<StaffTabBar active="crew" />}
      header={
        <TitleHeader title="Crew">
          <SearchField label="Search crew" placeholder="Name, rank or CDC number" defaultValue={crewProfile.name} />
        </TitleHeader>
      }
    >
      <section aria-label={crewProfile.name} className="card crew-summary">
        <div className="crew-summary__who">
          <Avatar initials={crewProfile.initials} size={54} tone="navy" />
          <div className="crew-summary__text">
            <span className="crew-summary__name">{crewProfile.name}</span>
            <span className="crew-summary__sub">{crewProfile.subtitle}</span>
          </div>
        </div>
        <div className="crew-summary__joining">
          <Icon name="ship" size={22} />
          <span>{crewProfile.joining}</span>
        </div>
        <div className="crew-summary__actions">
          <Button href="#" variant="neutral" size="md" icon="phone" iconSize={16} className="crew-summary__action">
            Call
          </Button>
          <Button href="#" variant="neutral" size="md" icon="mail" iconSize={16} className="crew-summary__action">
            Email
          </Button>
          <Button href="#" variant="neutral" size="md" icon="message" iconSize={16} className="crew-summary__action">
            Message
          </Button>
        </div>
      </section>

      <section aria-labelledby="readiness" className="staff-crew__section">
        <SectionHeader id="readiness" title="Joining readiness" />
        <ListGroup>
          {joiningReadiness.map((c) => (
            <ListRow
              key={c.label}
              leading={<IconTile icon={stateIcon[c.state]} tone={c.state} size="xs" strokeWidth={2.6} />}
              title={c.label}
              meta={c.meta}
              metaTone={c.state === 'ok' ? undefined : c.state}
              trailing={
                c.remindable &&
                (reminded ? (
                  <span role="status" className="staff-crew__reminded">
                    Reminder sent
                  </span>
                ) : (
                  <Button size="xs" onClick={() => setReminded(true)}>
                    Remind
                  </Button>
                ))
              }
            />
          ))}
        </ListGroup>
      </section>

      <section aria-labelledby="contracts" className="staff-crew__section">
        <SectionHeader id="contracts" title="Recent contracts" />
        <ListGroup>
          {recentContracts.map((h) => (
            <ListRow
              key={h.vessel}
              title={h.vessel}
              meta={h.dates}
              trailing={<span className="staff-crew__rank">{h.rank}</span>}
            />
          ))}
        </ListGroup>
      </section>

      <Button to={paths.console.planning} variant="outline" size="xl" iconAfter="chevronRight" iconSize={16} block className="staff-crew__console">
        Open full record in web console
      </Button>
    </MobileScreen>
  );
}
