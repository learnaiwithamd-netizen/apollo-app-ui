import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cx } from '../../lib/cx';
import { Icon } from '../ui/Icon';
import './MobileScreen.css';

interface MobileScreenProps {
  header?: ReactNode;
  nav?: ReactNode;
  /** Rendered above everything, e.g. a bottom sheet. */
  overlay?: ReactNode;
  /** Vertical gap between main's children in px. */
  gap?: number;
  /** Drop main's padding so content can run edge to edge. */
  flush?: boolean;
  className?: string;
  mainClassName?: string;
  children: ReactNode;
}

/** Header, scrolling content and bottom tab bar for one app screen. */
export function MobileScreen({
  header,
  nav,
  overlay,
  gap = 12,
  flush,
  className,
  mainClassName,
  children,
}: MobileScreenProps) {
  return (
    <div className={cx('screen', className)}>
      {header}
      <main className={cx('screen__main', flush && 'screen__main--flush', mainClassName)} style={flush ? undefined : { gap }}>
        {children}
      </main>
      {nav}
      {overlay}
    </div>
  );
}

interface TitleHeaderProps {
  title: ReactNode;
  /** Control at the end of the title row (e.g. an "Add" button). */
  action?: ReactNode;
  /** Short text at the end of the title row, baseline-aligned. */
  meta?: ReactNode;
  className?: string;
  children?: ReactNode;
}

/** Top-level screen header with a large title. */
export function TitleHeader({ title, action, meta, className, children }: TitleHeaderProps) {
  const heading = <h1 className="m-header__title">{title}</h1>;
  return (
    <header className={cx('m-header', 'm-header--title', className)}>
      {action || meta ? (
        <div className={cx('m-header__row', meta !== undefined && 'm-header__row--baseline')}>
          {heading}
          {action}
          {meta && <span className="m-header__meta">{meta}</span>}
        </div>
      ) : (
        heading
      )}
      {children}
    </header>
  );
}

interface BackHeaderProps {
  title: ReactNode;
  backTo: string;
  /** Where the back button goes, e.g. "Schedule" → "Back to Schedule". */
  backLabel: string;
  children?: ReactNode;
}

/** Sub-screen header: round back button and a centered title. */
export function BackHeader({ title, backTo, backLabel, children }: BackHeaderProps) {
  return (
    <header className={cx('m-header', 'm-header--back', children !== undefined && 'm-header--extended')}>
      <div className="m-header__bar">
        <Link to={backTo} aria-label={`Back to ${backLabel}`} className="icon-button">
          <Icon name="chevronLeft" size={22} strokeWidth={2} />
        </Link>
        <h1 className="m-header__bar-title">{title}</h1>
        <span />
      </div>
      {children !== undefined && <div className="m-header__extra">{children}</div>}
    </header>
  );
}
