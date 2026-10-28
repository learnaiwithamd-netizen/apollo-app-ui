import { useId, useState, type ReactNode } from 'react';
import { cx } from '../../lib/cx';
import type { Tone } from '../../lib/tone';
import { Card } from './Card';
import { Icon, type IconName } from './Icon';
import { IconTile } from './IconTile';
import './Accordion.css';

interface AccordionProps {
  title: ReactNode;
  summary?: ReactNode;
  icon?: IconName;
  iconTone?: Tone;
  /** Controlled open state; leave undefined to let the accordion manage it. */
  open?: boolean;
  defaultOpen?: boolean;
  onToggle?: (open: boolean) => void;
  titleSize?: 'md' | 'lg';
  bodyClassName?: string;
  children: ReactNode;
}

/** Card with a +/− header button that reveals its body. */
export function Accordion({
  title,
  summary,
  icon,
  iconTone = 'info',
  open,
  defaultOpen = false,
  onToggle,
  titleSize = 'lg',
  bodyClassName,
  children,
}: AccordionProps) {
  const [ownOpen, setOwnOpen] = useState(defaultOpen);
  const isOpen = open ?? ownOpen;
  const bodyId = useId();

  const toggle = () => {
    setOwnOpen(!isOpen);
    onToggle?.(!isOpen);
  };

  return (
    <Card as="section" clip>
      <button type="button" className="accordion__head" aria-expanded={isOpen} aria-controls={bodyId} onClick={toggle}>
        {icon && <IconTile icon={icon} tone={iconTone} size="sm" />}
        <span className="accordion__text">
          <span className={cx('accordion__title', titleSize === 'md' && 'accordion__title--md')}>{title}</span>
          {summary && <span className="accordion__summary">{summary}</span>}
        </span>
        <Icon name={isOpen ? 'minus' : 'plus'} size={22} strokeWidth={2} className="accordion__toggle" />
      </button>
      {isOpen && (
        <div id={bodyId} className={cx('accordion__body', bodyClassName)}>
          {children}
        </div>
      )}
    </Card>
  );
}

/** The bare +/− glyph, for custom disclosure headers. */
export function ToggleGlyph({ open, className }: { open: boolean; className?: string }) {
  return <Icon name={open ? 'minus' : 'plus'} size={22} strokeWidth={2} className={cx('accordion__toggle', className)} />;
}
