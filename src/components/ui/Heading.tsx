import type { ReactNode } from 'react';
import { cx } from '../../lib/cx';
import './Heading.css';

interface SectionHeaderProps {
  title: ReactNode;
  id?: string;
  /** Right-hand count or link, baseline-aligned with the title. */
  aside?: ReactNode;
  className?: string;
}

/** 19px condensed section title with an optional aside. */
export function SectionHeader({ title, id, aside, className }: SectionHeaderProps) {
  const heading = (
    <h2 id={id} className="section-title">
      {title}
    </h2>
  );
  if (!aside) return heading;
  return (
    <div className={cx('section-header', className)}>
      {heading}
      {typeof aside === 'string' ? <span className="section-header__aside">{aside}</span> : aside}
    </div>
  );
}

/** Small uppercase group label. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <h2 className={cx('eyebrow', className)}>{children}</h2>;
}

/** Centered uppercase label between two hairlines. */
export function RuleHeading({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cx('rule-heading', className)}>
      <span aria-hidden="true" className="rule-heading__line" />
      <h2 className="rule-heading__text">{children}</h2>
      <span aria-hidden="true" className="rule-heading__line" />
    </div>
  );
}
