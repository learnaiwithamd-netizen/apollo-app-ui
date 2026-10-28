import { cx } from '../../lib/cx';
import type { Tone } from '../../lib/tone';
import { Icon, type IconName } from './Icon';
import './IconTile.css';

interface IconTileProps {
  icon: IconName;
  tone?: Tone;
  /** lg 44 · md 40 · sm 36 · xs 28 */
  size?: 'lg' | 'md' | 'sm' | 'xs';
  round?: boolean;
  iconSize?: number;
  strokeWidth?: number;
  className?: string;
}

const defaultIconSize = { lg: 24, md: 20, sm: 20, xs: 15 } as const;

/** Tinted square (or circle) holding an icon. Decorative. */
export function IconTile({ icon, tone = 'info', size = 'md', round, iconSize, strokeWidth, className }: IconTileProps) {
  return (
    <span
      aria-hidden="true"
      className={cx('icon-tile', `icon-tile--${size}`, `icon-tile--${tone}`, round && 'icon-tile--round', className)}
    >
      <Icon name={icon} size={iconSize ?? defaultIconSize[size]} strokeWidth={strokeWidth} />
    </span>
  );
}
