import type { ReactNode } from 'react';
import { cx } from '../../lib/cx';
import './SegmentedControl.css';

export interface SegmentOption<T extends string> {
  value: T;
  label: ReactNode;
  /** Optional count badge (choice chips only). */
  count?: number;
}

interface ChoiceProps<T extends string> {
  options: SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
  /** Accessible name for the group. */
  label: string;
  /** `tabs` exposes role="tab" with aria-selected; `toggle` uses pressed buttons. */
  mode?: 'tabs' | 'toggle';
  className?: string;
}

function itemProps(mode: 'tabs' | 'toggle', on: boolean) {
  return mode === 'tabs' ? { role: 'tab', 'aria-selected': on } : { 'aria-pressed': on };
}

/** Two-up switch on a grey track; the selected half turns navy. */
export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  label,
  mode = 'tabs',
  size = 'md',
  className,
}: ChoiceProps<T> & { size?: 'sm' | 'md' | 'lg' }) {
  return (
    <div
      role={mode === 'tabs' ? 'tablist' : 'group'}
      aria-label={label}
      className={cx('segmented', `segmented--${size}`, className)}
      style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}
    >
      {options.map((o) => {
        const on = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            className={cx('segmented__item', on && 'is-on')}
            onClick={() => onChange(o.value)}
            {...itemProps(mode, on)}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

/** Row of rounded filter chips, optionally with counts. */
export function ChoiceChips<T extends string>({
  options,
  value,
  onChange,
  label,
  mode = 'toggle',
  size = 'md',
  className,
}: ChoiceProps<T> & { size?: 'sm' | 'md' }) {
  return (
    <div
      role={mode === 'tabs' ? 'tablist' : 'group'}
      aria-label={label}
      className={cx('choice-chips', `choice-chips--${size}`, className)}
    >
      {options.map((o) => {
        const on = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            className={cx('choice-chip', on && 'is-on')}
            onClick={() => onChange(o.value)}
            {...itemProps(mode, on)}
          >
            {o.label}
            {o.count !== undefined && <span className="choice-chip__count">{o.count}</span>}
          </button>
        );
      })}
    </div>
  );
}
