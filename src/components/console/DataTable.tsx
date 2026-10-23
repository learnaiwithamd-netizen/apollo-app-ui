import type { ReactNode } from 'react';
import { cx } from '../../lib/cx';
import './DataTable.css';

export interface Column<T> {
  header: string;
  /** Grid track, e.g. "1.4fr" or "180px". */
  width: string;
  render: (row: T) => ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  isSelected?: (row: T) => boolean;
  rowClassName?: (row: T) => string | undefined;
  /** Below this width the table scrolls sideways. */
  minWidth?: number;
}

/** Grid-laid table with an uppercase header row and optional selected row. */
export function DataTable<T>({ columns, rows, rowKey, isSelected, rowClassName, minWidth = 720 }: DataTableProps<T>) {
  const template = columns.map((c) => c.width).join(' ');
  return (
    <div className="table-scroll">
      <div role="table" className="table" style={{ minWidth }}>
        <div role="rowgroup">
          <div role="row" className="table__head" style={{ gridTemplateColumns: template }}>
            {columns.map((c) => (
              <span key={c.header} role="columnheader">
                {c.header}
              </span>
            ))}
          </div>
        </div>
        <div role="rowgroup">
          {rows.map((row) => (
            <div
              key={rowKey(row)}
              role="row"
              className={cx('table__row', isSelected?.(row) && 'is-selected', rowClassName?.(row))}
              style={{ gridTemplateColumns: template }}
            >
              {columns.map((c) => (
                <div key={c.header} role="cell" className="table__cell">
                  {c.render(row)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface TableCardProps {
  title: ReactNode;
  titleId: string;
  meta?: ReactNode;
  children: ReactNode;
}

/** Card with a titled header bar for a DataTable. */
export function TableCard({ title, titleId, meta, children }: TableCardProps) {
  return (
    <section aria-labelledby={titleId} className="card card--clip">
      <div className="table-card__head">
        <h2 id={titleId} className="table-card__title">
          {title}
        </h2>
        {meta && <span className="table-card__meta">{meta}</span>}
      </div>
      {children}
    </section>
  );
}

interface RowButtonProps {
  selected: boolean;
  onSelect: () => void;
  title: ReactNode;
  subtitle?: ReactNode;
}

/** Underlined name in a table's first cell that selects the row. */
export function RowButton({ selected, onSelect, title, subtitle }: RowButtonProps) {
  return (
    <button type="button" aria-pressed={selected} onClick={onSelect} className="row-button">
      <span className="row-button__title">{title}</span>
      {subtitle && <span className="row-button__subtitle">{subtitle}</span>}
    </button>
  );
}
