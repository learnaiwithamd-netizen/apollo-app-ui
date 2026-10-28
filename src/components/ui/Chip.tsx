import type { ReactNode } from 'react';
import { cx } from '../../lib/cx';
import type { Tone } from '../../lib/tone';
import './Chip.css';

interface ChipProps {
  tone?: Tone;
  strong?: boolean;
  className?: string;
  children: ReactNode;
}

/** Small rounded status label. */
export function Chip({ tone = 'info', strong, className, children }: ChipProps) {
  return <span className={cx('chip', `chip--${tone}`, strong && 'chip--strong', className)}>{children}</span>;
}

interface PillProps {
  tone?: 'accent' | 'success';
  className?: string;
  children: ReactNode;
}

/** Fully rounded highlight used on navy surfaces ("in 17 days", "Ticket issued"). */
export function Pill({ tone = 'accent', className, children }: PillProps) {
  return <span className={cx('pill', `pill--${tone}`, className)}>{children}</span>;
}
