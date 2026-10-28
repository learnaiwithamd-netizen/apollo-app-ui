import { useState } from 'react';
import { CrewTabBar } from '../../components/mobile/TabBar';
import { BackHeader, MobileScreen } from '../../components/mobile/MobileScreen';
import { Button } from '../../components/ui/Button';
import { FactGrid, KeyValueList } from '../../components/ui/DataList';
import { Icon } from '../../components/ui/Icon';
import { cx } from '../../lib/cx';
import { lastContract, onboardPanels } from '../../data/crew';
import { paths } from '../../routes';
import './CrewOnboard.css';

export function CrewOnboard() {
  const [selected, setSelected] = useState('salary');
  const panel = onboardPanels.find((p) => p.id === selected) ?? onboardPanels[0];

  return (
    <MobileScreen
      flush
      nav={<CrewTabBar active="schedule" />}
      header={<BackHeader title="Onboard Schedule" backTo={paths.crew.schedule} backLabel="Schedule" />}
    >
      <section className="contract-hero">
        <svg aria-hidden="true" className="contract-hero__waves" viewBox="0 0 390 90" preserveAspectRatio="none">
          <path d="M0 50 C 120 20, 260 70, 390 30 L390 90 L0 90 Z" fill="var(--c-blue)" />
          <path d="M0 72 C 140 50, 270 88, 390 60 L390 90 L0 90 Z" fill="var(--c-blue-wave)" />
        </svg>
        <div className="contract-hero__content">
          <span className="contract-hero__eyebrow">Last contract</span>
          <span className="contract-hero__vessel">{lastContract.vessel}</span>
          <FactGrid
            columns={3}
            tone="on-dark"
            className="contract-hero__facts"
            items={[
              { label: 'Signed on', value: lastContract.signedOn },
              { label: 'Signed off', value: lastContract.signedOff },
              { label: 'Sea time', value: lastContract.seaTime },
            ]}
          />
        </div>
      </section>

      <div className="onboard-tiles">
        {onboardPanels.map((p) => {
          const on = p.id === selected;
          return (
            <button
              key={p.id}
              type="button"
              aria-pressed={on}
              onClick={() => setSelected(p.id)}
              className={cx('onboard-tile', on && 'is-on')}
            >
              <Icon name={p.icon} size={24} />
              <span className="onboard-tile__label">{p.label}</span>
            </button>
          );
        })}
      </div>

      <section aria-live="polite" className="card onboard-panel">
        <h2 className="section-title">{panel.title}</h2>
        {panel.rows && <KeyValueList items={panel.rows} />}
        {panel.list && (
          <ul className="onboard-panel__list">
            {panel.list.map((item) => (
              <li key={item.title} className="onboard-panel__item">
                <span className="onboard-panel__text">
                  <span className="onboard-panel__title">{item.title}</span>
                  <span className={cx('onboard-panel__meta', item.metaTone && `text-${item.metaTone}`)}>{item.meta}</span>
                </span>
                <Button
                  href="#"
                  variant="soft"
                  size="sm"
                  icon={item.action === 'PDF' ? 'download' : 'eye'}
                  iconSize={16}
                  aria-label={`${item.action} ${item.title}`}
                >
                  {item.action}
                </Button>
              </li>
            ))}
          </ul>
        )}
        {panel.cta && (
          <Button href="#" block className="onboard-panel__cta">
            {panel.cta}
          </Button>
        )}
      </section>
    </MobileScreen>
  );
}
