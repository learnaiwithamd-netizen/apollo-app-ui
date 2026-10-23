import type { ReactNode } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import logo from '../../assets/apollo-logo.png';
import { cx } from '../../lib/cx';
import { paths } from '../../routes';
import { Avatar } from '../ui/Avatar';
import { Icon, type IconName } from '../ui/Icon';
import { SearchField } from '../ui/Form';
import './ConsoleLayout.css';

const navItems: { to: string; label: string; icon: IconName }[] = [
  { to: paths.console.planning, label: 'Crew planning', icon: 'users' },
  { to: paths.console.flights, label: 'Flights & travel', icon: 'plane' },
  { to: paths.console.training, label: 'Training', icon: 'training' },
  { to: paths.console.circulars, label: 'Circulars', icon: 'megaphone' },
];

/** Layout route for the shore staff web console: top bar, side nav, page. */
export function ConsoleLayout() {
  return (
    <div className="console">
      <header className="console__bar">
        <img src={logo} alt="Apollo" width={118} height={36} className="console__logo" />
        <span aria-hidden="true" className="console__divider" />
        <span className="console__product">Shore Staff Console</span>
        <span className="console__spacer" />
        <SearchField size="sm" label="Search" placeholder="Search crew, vessel or CDC no." className="console__search" />
        <div className="console__user">
          <Avatar initials="PS" size={36} tone="navy" />
          <span>Priya Sharma</span>
        </div>
      </header>

      <div className="console__body">
        <nav aria-label="Console" className="console__nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => cx('console__nav-link', isActive && 'is-active')}
            >
              <Icon name={item.icon} size={20} />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <main className="console__main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

interface PageHeaderProps {
  title: ReactNode;
  description: ReactNode;
  actions?: ReactNode;
}

export function ConsolePageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <div className="page-header">
      <div className="page-header__text">
        <h1 className="page-header__title">{title}</h1>
        <p className="page-header__description">{description}</p>
      </div>
      {actions}
    </div>
  );
}

/** Primary content beside a narrower aside; the aside wraps under on small screens. */
export function SplitView({ asideBasis = 340, children }: { asideBasis?: number; children: [ReactNode, ReactNode] }) {
  const [primary, aside] = children;
  return (
    <div className="split">
      <div className="split__primary">{primary}</div>
      <div className="split__aside" style={{ flexBasis: asideBasis }}>
        {aside}
      </div>
    </div>
  );
}

interface PanelHeadingProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  id?: string;
  meta?: ReactNode;
}

/** Heading block at the top of an aside panel. */
export function PanelHeading({ eyebrow, title, id, meta }: PanelHeadingProps) {
  return (
    <div className="panel-heading">
      {eyebrow && <span className="panel-heading__eyebrow">{eyebrow}</span>}
      <h2 id={id} className="panel-heading__title">
        {title}
      </h2>
      {meta && <span className="panel-heading__meta">{meta}</span>}
    </div>
  );
}

export function KpiTile({ label, value, tone }: { label: string; value: ReactNode; tone: 'navy' | 'ok' | 'bad' | 'blue' }) {
  return (
    <div className="kpi">
      <span className="kpi__label">{label}</span>
      <span className={cx('kpi__value', `kpi__value--${tone}`)}>{value}</span>
    </div>
  );
}
