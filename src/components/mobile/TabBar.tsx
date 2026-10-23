import { Link } from 'react-router-dom';
import { paths } from '../../routes';
import { cx } from '../../lib/cx';
import { Icon, type IconName } from '../ui/Icon';
import './TabBar.css';

interface TabItem<K extends string> {
  key: K;
  label: string;
  to: string;
  icon: IconName;
}

function TabBar<K extends string>({ items, active }: { items: TabItem<K>[]; active: K }) {
  return (
    <nav aria-label="Main" className="tabbar" style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}>
      {items.map((item) => {
        const on = item.key === active;
        return (
          <Link
            key={item.key}
            to={item.to}
            aria-current={on ? 'page' : undefined}
            className={cx('tabbar__item', on && 'is-active')}
          >
            <Icon name={item.icon} size={24} strokeWidth={on ? 1.9 : 1.8} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export type CrewTab = 'home' | 'schedule' | 'documents' | 'circulars';

const crewTabs: TabItem<CrewTab>[] = [
  { key: 'home', label: 'Home', to: paths.crew.home, icon: 'home' },
  { key: 'schedule', label: 'Schedule', to: paths.crew.schedule, icon: 'calendar' },
  { key: 'documents', label: 'Documents', to: paths.crew.documents, icon: 'document' },
  { key: 'circulars', label: 'Circulars', to: paths.crew.circulars, icon: 'megaphone' },
];

/** Bottom navigation for the crew app; `active` is the section the screen belongs to. */
export function CrewTabBar({ active }: { active: CrewTab }) {
  return <TabBar items={crewTabs} active={active} />;
}

export type StaffTab = 'today' | 'approvals' | 'crew';

const staffTabs: TabItem<StaffTab>[] = [
  { key: 'today', label: 'Today', to: paths.staff.home, icon: 'dashboard' },
  { key: 'approvals', label: 'Approvals', to: paths.staff.approvals, icon: 'inbox' },
  { key: 'crew', label: 'Crew', to: paths.staff.crew, icon: 'users' },
];

/** Bottom navigation for the shore-staff mobile app. */
export function StaffTabBar({ active }: { active: StaffTab }) {
  return <TabBar items={staffTabs} active={active} />;
}
