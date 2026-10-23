import { useState } from 'react';
import { CrewTabBar } from '../../components/mobile/TabBar';
import { BackHeader, MobileScreen } from '../../components/mobile/MobileScreen';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Chip } from '../../components/ui/Chip';
import { FactGrid } from '../../components/ui/DataList';
import { Icon } from '../../components/ui/Icon';
import { ChoiceChips } from '../../components/ui/SegmentedControl';
import { crewMember, vacancies, type VesselType } from '../../data/crew';
import { paths } from '../../routes';
import './CrewVacancies.css';

type Filter = 'All' | VesselType;

const filters: Filter[] = ['All', 'Bulk', 'Tanker', 'Container'];

export function CrewVacancies() {
  const [filter, setFilter] = useState<Filter>('All');
  const [sent, setSent] = useState<Record<number, boolean>>({});
  const jobs = vacancies.filter((j) => filter === 'All' || j.type === filter);

  return (
    <MobileScreen
      nav={<CrewTabBar active="schedule" />}
      header={
        <BackHeader title="Vacancies" backTo={paths.crew.schedule} backLabel="Schedule">
          <ChoiceChips
            size="sm"
            label="Vessel type"
            value={filter}
            onChange={setFilter}
            options={filters.map((f) => ({ value: f, label: f }))}
          />
        </BackHeader>
      }
    >
      <p className="vacancies__count">
        {jobs.length} open {jobs.length === 1 ? 'position' : 'positions'} for {crewMember.rank}
      </p>
      {jobs.map((j) => (
        <Card as="article" key={j.id} className="vacancy">
          <div className="vacancy__top">
            <div className="vacancy__heading">
              <h2 className="section-title">{j.rank}</h2>
              <span className="vacancy__vessel">{j.vessel}</span>
            </div>
            <Chip tone="sky">{j.type}</Chip>
          </div>
          <FactGrid
            items={[
              { label: 'Joining', value: j.when },
              { label: 'Contract', value: j.contract },
            ]}
          />
          {sent[j.id] ? (
            <div role="status" className="vacancy__sent">
              <Icon name="check" size={18} strokeWidth={2.4} />
              Interest sent to crewing desk
            </div>
          ) : (
            <Button variant="outline" block onClick={() => setSent({ ...sent, [j.id]: true })}>
              Express interest
            </Button>
          )}
        </Card>
      ))}
    </MobileScreen>
  );
}
