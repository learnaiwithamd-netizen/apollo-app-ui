import { useLayoutEffect, useRef, useState } from 'react';
import { cx } from '../../lib/cx';

interface ScaledFrameProps {
  /** Route of this app to preview. */
  src: string;
  /** Viewport the previewed page is laid out at, in CSS pixels. */
  width: number;
  height: number;
  className?: string;
}

/**
 * A live, non-interactive preview of another route, rendered at a fixed
 * viewport and scaled to fit its container. Decorative: the page beside it
 * always carries a real link to the same route.
 */
export function ScaledFrame({ src, width, height, className }: ScaledFrameProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / width);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [width]);

  return (
    <div ref={ref} className={cx('scaled-frame', className)} style={{ aspectRatio: `${width} / ${height}` }}>
      <iframe
        src={src}
        title=""
        aria-hidden="true"
        tabIndex={-1}
        loading="lazy"
        width={width}
        height={height}
        style={{ transform: `scale(${scale})`, visibility: scale ? 'visible' : 'hidden' }}
      />
    </div>
  );
}
