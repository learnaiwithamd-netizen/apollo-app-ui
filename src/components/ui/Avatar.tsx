import { cx } from '../../lib/cx';
import './Avatar.css';

interface AvatarProps {
  initials: string;
  /** Diameter in px. */
  size?: number;
  tone?: 'navy' | 'sky' | 'soft';
  className?: string;
}

/** Initials in a circle. Decorative: pair it with the person's name in text. */
export function Avatar({ initials, size = 40, tone = 'soft', className }: AvatarProps) {
  return (
    <span
      aria-hidden="true"
      className={cx('avatar', `avatar--${tone}`, className)}
      style={{ width: size, height: size, fontSize: Math.round(size * 0.36) }}
    >
      {initials}
    </span>
  );
}
