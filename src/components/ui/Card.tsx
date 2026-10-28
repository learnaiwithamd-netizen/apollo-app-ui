import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cx } from '../../lib/cx';
import type { Tone } from '../../lib/tone';
import { Icon } from './Icon';
import './Card.css';

interface CardProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  /** Adds 16px padding and stacks children. */
  padded?: boolean;
  /** Clips children to the rounded corners (for flush headers and tables). */
  clip?: boolean;
}

/** White surface with a hairline border and 16px corners. */
export function Card({ as: Tag = 'div', padded, clip, className, ...rest }: CardProps) {
  return <Tag className={cx('card', padded && 'card--padded', clip && 'card--clip', className)} {...rest} />;
}

interface ListGroupProps {
  /** md: 12×14 rows · lg: 14px rows · menu: 56px tall rows. */
  size?: 'md' | 'lg' | 'menu';
  as?: 'ul' | 'ol';
  className?: string;
  children: ReactNode;
}

/** A card of rows separated by dividers. Children are `ListRow`s or `li`s. */
export function ListGroup({ size = 'md', as: Tag = 'ul', className, children }: ListGroupProps) {
  return <Tag className={cx('card', 'list-group', `list-group--${size}`, className)}>{children}</Tag>;
}

interface ListRowProps {
  leading?: ReactNode;
  title: ReactNode;
  meta?: ReactNode;
  metaTone?: Tone;
  trailing?: ReactNode;
  /** Shows a grey chevron at the end; implied for linked rows unless `trailing` is set. */
  chevron?: boolean;
  to?: string;
  href?: string;
  titleSize?: 'md' | 'lg';
  className?: string;
}

export function ListRow({
  leading,
  title,
  meta,
  metaTone,
  trailing,
  chevron,
  to,
  href,
  titleSize = 'md',
  className,
}: ListRowProps) {
  const linked = to !== undefined || href !== undefined;
  const showChevron = chevron ?? (linked && trailing === undefined);
  const body = (
    <>
      {leading}
      <span className="list-row__text">
        <span className={cx('list-row__title', titleSize === 'lg' && 'list-row__title--lg')}>{title}</span>
        {meta && <span className={cx('list-row__meta', metaTone && `text-${metaTone}`)}>{meta}</span>}
      </span>
      {trailing}
      {showChevron && <Icon name="chevronRight" size={18} strokeWidth={2} className="list-row__chevron" />}
    </>
  );
  const rowClass = cx('list-row', linked && 'list-row--link', className);

  return (
    <li className="list-group__item">
      {to !== undefined ? (
        <Link to={to} className={rowClass}>
          {body}
        </Link>
      ) : href !== undefined ? (
        <a href={href} className={rowClass}>
          {body}
        </a>
      ) : (
        <div className={rowClass}>{body}</div>
      )}
    </li>
  );
}
