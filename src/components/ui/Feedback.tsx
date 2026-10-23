import { useEffect, useId, useRef, type ReactNode } from 'react';
import { cx } from '../../lib/cx';
import { Icon } from './Icon';
import './Feedback.css';

interface ProgressBarProps {
  /** Fraction complete, 0 to 1. */
  value: number;
  onDark?: boolean;
  className?: string;
}

/** Thin decorative bar; always show the number in text beside it. */
export function ProgressBar({ value, onDark, className }: ProgressBarProps) {
  const pct = Math.round(Math.min(Math.max(value, 0), 1) * 100);
  return (
    <span aria-hidden="true" className={cx('progress', onDark && 'progress--on-dark', className)}>
      <span className="progress__fill" style={{ width: `${pct}%` }} />
    </span>
  );
}

interface NoticeProps {
  title?: ReactNode;
  /** md: 14px card · sm: compact single message. */
  size?: 'sm' | 'md';
  className?: string;
  children?: ReactNode;
}

/** Green confirmation box. */
export function Notice({ title, size = 'md', className, children }: NoticeProps) {
  return (
    <div role="status" className={cx('notice', size === 'sm' && 'notice--sm', className)}>
      {title && <span className="notice__title">{title}</span>}
      {children}
    </div>
  );
}

interface BottomSheetProps {
  title: ReactNode;
  onClose: () => void;
  children: ReactNode;
}

/** Modal sheet that rises from the bottom of the mobile screen. */
export function BottomSheet({ title, onClose, children }: BottomSheetProps) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  return (
    <div
      className="sheet-backdrop"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onKeyDown={(e) => e.key === 'Escape' && onClose()}
    >
      <div role="dialog" aria-modal="true" aria-labelledby={titleId} className="sheet">
        <span aria-hidden="true" className="sheet__handle" />
        <div className="sheet__head">
          <h2 id={titleId} className="sheet__title">
            {title}
          </h2>
          <button ref={closeRef} type="button" aria-label="Close" className="icon-button" onClick={onClose}>
            <Icon name="close" size={20} strokeWidth={2} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
