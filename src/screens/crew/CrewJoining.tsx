import { CrewTabBar } from '../../components/mobile/TabBar';
import { BackHeader, MobileScreen } from '../../components/mobile/MobileScreen';
import { Accordion } from '../../components/ui/Accordion';
import { Button } from '../../components/ui/Button';
import { Pill } from '../../components/ui/Chip';
import { KeyValueList } from '../../components/ui/DataList';
import { Icon } from '../../components/ui/Icon';
import { joiningSections, nextJoining } from '../../data/crew';
import { paths } from '../../routes';
import './CrewJoining.css';

export function CrewJoining() {
  return (
    <MobileScreen
      nav={<CrewTabBar active="schedule" />}
      header={<BackHeader title="Joining Schedule" backTo={paths.crew.schedule} backLabel="Schedule" />}
    >
      <div className="joining-banner">
        <Icon name="ship" size={28} strokeWidth={1.7} className="joining-banner__icon" />
        <div className="joining-banner__text">
          <span className="joining-banner__vessel">{nextJoining.vessel}</span>
          <span className="joining-banner__meta">
            Join {nextJoining.date} at {nextJoining.port}
          </span>
        </div>
        <Pill>{nextJoining.daysToGo} days</Pill>
      </div>

      {joiningSections.map((section, i) => (
        <Accordion
          key={section.title}
          title={section.title}
          summary={section.summary}
          icon={section.icon}
          defaultOpen={i === 0}
        >
          <KeyValueList items={section.rows} labelWidth={132} />
          {section.cta && (
            <Button variant="outline" block {...(section.cta.to ? { to: section.cta.to } : { href: '#' })}>
              {section.cta.label}
            </Button>
          )}
        </Accordion>
      ))}
    </MobileScreen>
  );
}
