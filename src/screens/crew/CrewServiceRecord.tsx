import { CrewTabBar } from '../../components/mobile/TabBar';
import { BackHeader, MobileScreen } from '../../components/mobile/MobileScreen';
import { Button } from '../../components/ui/Button';
import { Chip } from '../../components/ui/Chip';
import { FactGrid } from '../../components/ui/DataList';
import { cx } from '../../lib/cx';
import { seaServiceSummary, serviceRecord } from '../../data/crew';
import { paths } from '../../routes';
import './CrewServiceRecord.css';

export function CrewServiceRecord() {
  return (
    <MobileScreen
      nav={<CrewTabBar active="home" />}
      header={<BackHeader title="Service Record" backTo={paths.crew.profile} backLabel="My Profile" />}
    >
      <section aria-label="Sea service summary" className="sea-summary">
        {seaServiceSummary.map((s, i) => (
          <div key={s.label} className={cx('sea-summary__tile', i === 0 && 'sea-summary__tile--dark')}>
            <span className="sea-summary__value">{s.value}</span>
            <span className="sea-summary__label">{s.label}</span>
          </div>
        ))}
      </section>

      <Button href="#" variant="outline" icon="download" block className="service__download">
        Download sea service statement (PDF)
      </Button>

      <ol className="service-list">
        {serviceRecord.map((r) => (
          <li key={r.vessel + r.on} className="card service-item">
            <div className="service-item__top">
              <div className="service-item__heading">
                <span className="service-item__vessel">{r.vessel}</span>
                <span className="service-item__meta">
                  {r.company} · {r.type}
                </span>
              </div>
              <Chip strong>{r.rank}</Chip>
            </div>
            <FactGrid
              columns={3}
              size="sm"
              className="service-item__facts"
              items={[
                { label: 'Sign on', value: r.on },
                { label: 'Sign off', value: r.off },
                { label: 'Duration', value: r.length },
              ]}
            />
          </li>
        ))}
      </ol>
      <p className="service__note">Something missing or wrong? Contact the crewing desk to correct your record.</p>
    </MobileScreen>
  );
}
