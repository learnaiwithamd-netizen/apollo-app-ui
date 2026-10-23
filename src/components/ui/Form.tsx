import type { InputHTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';
import { Icon } from './Icon';
import './Form.css';

interface FieldProps {
  label: ReactNode;
  htmlFor: string;
  /** Content shown at the end of the label row, e.g. "Forgot password?". */
  aside?: ReactNode;
  /** sm: dense web console labels (13px). */
  size?: 'sm' | 'md';
  className?: string;
  children: ReactNode;
}

/** Label stacked over a control. Style the control with `.input` classes. */
export function Field({ label, htmlFor, aside, size = 'md', className, children }: FieldProps) {
  const labelEl = (
    <label htmlFor={htmlFor} className="field__label">
      {label}
    </label>
  );
  return (
    <div className={cx('field', size === 'sm' && 'field--sm', className)}>
      {aside ? (
        <div className="field__label-row">
          {labelEl}
          {aside}
        </div>
      ) : (
        labelEl
      )}
      {children}
    </div>
  );
}

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: ReactNode;
}

export function Checkbox({ label, className, ...rest }: CheckboxProps) {
  return (
    <label className={cx('checkbox', className)}>
      <input type="checkbox" {...rest} />
      {label}
    </label>
  );
}

interface SearchFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label: string;
  size?: 'sm' | 'md';
}

/** Pill search box with a leading magnifier and a visually hidden label. */
export function SearchField({ label, size = 'md', className, ...rest }: SearchFieldProps) {
  return (
    <label className={cx('search', size === 'sm' && 'search--sm', className)}>
      <Icon name="search" size={18} strokeWidth={2} />
      <span className="visually-hidden">{label}</span>
      <input type="search" className="search__input" {...rest} />
    </label>
  );
}
