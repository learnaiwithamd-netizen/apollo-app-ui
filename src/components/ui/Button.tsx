import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import { cx } from '../../lib/cx';
import { Icon, type IconName } from './Icon';
import './Button.css';

export type ButtonVariant =
  | 'primary'
  | 'outline'
  | 'soft'
  | 'neutral'
  | 'danger'
  | 'danger-outline'
  | 'light'
  | 'success';

/** Heights: xs 38 · sm 40 · md 44 · lg 46 · xl 48 · hero 52. */
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hero';

interface OwnProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: IconName;
  iconAfter?: IconName;
  iconSize?: number;
  block?: boolean;
  className?: string;
  children?: ReactNode;
}

type AsButton = OwnProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof OwnProps> & { to?: undefined; href?: undefined };
type AsLink = OwnProps & Omit<LinkProps, keyof OwnProps> & { href?: undefined };
type AsAnchor = OwnProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof OwnProps> & { href: string; to?: undefined };

export type ButtonProps = AsButton | AsLink | AsAnchor;

/** Renders a router link with `to`, an anchor with `href`, otherwise a button. */
export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'lg', icon, iconAfter, iconSize = 18, block, className, children, ...rest } = props;
  const classes = cx('btn', `btn--${variant}`, `btn--${size}`, block && 'btn--block', className);
  const content = (
    <>
      {icon && <Icon name={icon} size={iconSize} strokeWidth={2} />}
      {children}
      {iconAfter && <Icon name={iconAfter} size={iconSize} strokeWidth={2} />}
    </>
  );

  if (rest.to !== undefined) {
    return (
      <Link className={classes} {...(rest as Omit<LinkProps, 'className'>)}>
        {content}
      </Link>
    );
  }
  if (rest.href !== undefined) {
    return (
      <a className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {content}
      </a>
    );
  }
  return (
    <button type="button" className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
}
