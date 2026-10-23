import { useId, useState } from 'react';
import { CrewTabBar } from '../../components/mobile/TabBar';
import { MobileScreen, TitleHeader } from '../../components/mobile/MobileScreen';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Chip } from '../../components/ui/Chip';
import { SearchField } from '../../components/ui/Form';
import { Icon } from '../../components/ui/Icon';
import { SegmentedControl } from '../../components/ui/SegmentedControl';
import { companyCirculars, ruleUpdates, type Circular } from '../../data/crew';
import './CrewCirculars.css';

type Tab = 'company' | 'rules';

const companyTags = new Set(['Policy', 'Travel', 'Safety']);

export function CrewCirculars() {
  const [tab, setTab] = useState<Tab>('company');
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState<Record<string, boolean>>({ c1: true });
  const [acked, setAcked] = useState<Record<string, boolean>>({});

  const q = query.trim().toLowerCase();
  const items = (tab === 'company' ? companyCirculars : ruleUpdates).filter(
    (c) => !q || c.title.toLowerCase().includes(q) || c.ref.toLowerCase().includes(q),
  );

  return (
    <MobileScreen
      gap={10}
      nav={<CrewTabBar active="circulars" />}
      header={
        <TitleHeader title="Circulars & Rules">
          <SearchField
            label="Search circulars"
            placeholder="Search by title or number"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <SegmentedControl
            label="Category"
            value={tab}
            onChange={setTab}
            options={[
              { value: 'company', label: 'Company circulars' },
              { value: 'rules', label: 'Rules & regulations' },
            ]}
          />
        </TitleHeader>
      }
    >
      {items.map((c) => (
        <CircularCard
          key={c.id}
          circular={c}
          open={!!open[c.id]}
          acknowledged={!!acked[c.id] || !!c.acknowledged}
          onToggle={() => setOpen({ ...open, [c.id]: !open[c.id] })}
          onAcknowledge={() => setAcked({ ...acked, [c.id]: true })}
        />
      ))}
      {items.length === 0 && <p className="circulars__empty">No circulars match “{query}”.</p>}
    </MobileScreen>
  );
}

interface CircularCardProps {
  circular: Circular;
  open: boolean;
  acknowledged: boolean;
  onToggle: () => void;
  onAcknowledge: () => void;
}

function CircularCard({ circular: c, open, acknowledged, onToggle, onAcknowledge }: CircularCardProps) {
  const bodyId = useId();
  const needsAck = c.requiresAck && !acknowledged;
  const unread = c.unread && !acknowledged;

  return (
    <Card as="article" clip>
      <button type="button" className="circular__head" aria-expanded={open} aria-controls={bodyId} onClick={onToggle}>
        <span className="circular__tags">
          {unread && (
            <span className="circular__unread">
              <span className="visually-hidden">Unread</span>
            </span>
          )}
          <Chip tone={companyTags.has(c.tag) ? 'info' : 'sky'}>{c.tag}</Chip>
          {needsAck && <Chip tone="warn">Acknowledge</Chip>}
          {acknowledged && <Chip tone="ok">Acknowledged</Chip>}
          <span className="circular__date">{c.date}</span>
        </span>
        <span className="circular__title">{c.title}</span>
        <span className="circular__ref">{c.ref}</span>
      </button>
      {open && (
        <div id={bodyId} className="circular__body">
          <p className="circular__summary">{c.summary}</p>
          <a href="#" className="circular__pdf">
            <Icon name="file" size={18} strokeWidth={2} />
            Read full circular (PDF)
          </a>
          {needsAck && (
            <Button size="xl" block className="circular__ack" onClick={onAcknowledge}>
              I have read and understood
            </Button>
          )}
        </div>
      )}
    </Card>
  );
}
