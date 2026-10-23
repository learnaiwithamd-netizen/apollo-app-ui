import type { ReactNode } from 'react';
import { cx } from '../../lib/cx';
import type { Tone } from '../../lib/tone';
import './DataList.css';

export interface DataItem {
  label: ReactNode;
  value: ReactNode;
  tone?: Tone;
  /** Bold the whole row (totals). */
  emphasis?: boolean;
}

interface KeyValueListProps {
  items: DataItem[];
  /** Fixed label column width in px; with `split` the value is right-aligned instead. */
  labelWidth?: number;
  split?: boolean;
  className?: string;
}

/** Label/value rows separated by hairlines. */
export function KeyValueList({ items, labelWidth = 120, split, className }: KeyValueListProps) {
  return (
    <dl className={cx('kv', split && 'kv--split', className)}>
      {items.map((item, i) => (
        <div
          key={i}
          className={cx('kv__row', item.emphasis && 'kv__row--emphasis')}
          style={split ? undefined : { gridTemplateColumns: `${labelWidth}px 1fr` }}
        >
          <dt className="kv__label">{item.label}</dt>
          <dd className={cx('kv__value', item.tone && `text-${item.tone}`)}>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

interface FactGridProps {
  items: DataItem[];
  columns?: 2 | 3;
  /** Value size: sm 14 · md 15 · lg 16. */
  size?: 'sm' | 'md' | 'lg';
  weight?: 'medium' | 'semibold';
  /** default ink values · navy values · white-on-navy. */
  tone?: 'default' | 'navy' | 'on-dark';
  className?: string;
}

/** Small label above a value, laid out in columns. */
export function FactGrid({
  items,
  columns = 2,
  size = 'md',
  weight = 'semibold',
  tone = 'default',
  className,
}: FactGridProps) {
  return (
    <dl
      className={cx('facts', `facts--${size}`, `facts--${weight}`, `facts--${tone}`, className)}
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
      {items.map((item, i) => (
        <div key={i} className="facts__item">
          <dt className="facts__label">{item.label}</dt>
          <dd className={cx('facts__value', item.tone && `text-${item.tone}`)}>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
