import { Link } from 'react-router-dom';
import { CrewTabBar } from '../../components/mobile/TabBar';
import { MobileScreen, TitleHeader } from '../../components/mobile/MobileScreen';
import { ListGroup, ListRow } from '../../components/ui/Card';
import { RuleHeading } from '../../components/ui/Heading';
import { Icon } from '../../components/ui/Icon';
import { IconTile } from '../../components/ui/IconTile';
import { cx } from '../../lib/cx';
import { contractSteps, currentStep, mustView, scheduleTiles } from '../../data/crew';
import './CrewSchedule.css';

export function CrewSchedule() {
  return (
    <MobileScreen
      gap={16}
      mainClassName="schedule__main"
      nav={<CrewTabBar active="schedule" />}
      header={
        <TitleHeader title="Schedule" className="schedule__header">
          <ol aria-label="Contract journey" className="stepper">
            {contractSteps.map((label, i) => {
              const state = i < currentStep ? 'done' : i === currentStep ? 'current' : 'todo';
              return (
                <li
                  key={label}
                  className={cx('stepper__step', `stepper__step--${state}`, i <= currentStep && 'stepper__step--reached')}
                  aria-current={state === 'current' ? 'step' : undefined}
                >
                  <span aria-hidden="true" className="stepper__line" />
                  <span aria-hidden="true" className="stepper__dot">
                    {state === 'done' && <Icon name="check" size={14} strokeWidth={3} />}
                  </span>
                  <span className="stepper__label">{label}</span>
                </li>
              );
            })}
          </ol>
        </TitleHeader>
      }
    >
      <RuleHeading>My schedule</RuleHeading>

      <div className="schedule-tiles">
        {scheduleTiles.map((t, i) => (
          <Link key={t.title} to={t.to} className={cx('schedule-tile', i === currentStep && 'schedule-tile--current')}>
            <IconTile icon={t.icon} size="lg" />
            <span className="schedule-tile__text">
              <span className="schedule-tile__title">{t.title}</span>
              <span className={cx('schedule-tile__status', t.statusTone && `text-${t.statusTone}`)}>{t.status}</span>
            </span>
          </Link>
        ))}
      </div>

      <RuleHeading className="schedule__must-view">Must view</RuleHeading>

      <ListGroup size="lg">
        {mustView.map((l) => (
          <ListRow key={l.title} to={l.to} leading={<IconTile icon={l.icon} tone="sky" />} title={l.title} titleSize="lg" meta={l.meta} />
        ))}
      </ListGroup>
    </MobileScreen>
  );
}
