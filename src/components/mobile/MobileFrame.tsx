import { Outlet } from 'react-router-dom';
import { cx } from '../../lib/cx';
import { isEmbedded } from '../../lib/overviewReturn';
import { DemoBar } from '../demo/DemoBar';
import './MobileFrame.css';

/**
 * Layout route for the crew and shore-staff apps. On a desktop browser the
 * app sits in a 390×844 phone-sized frame; on a phone it fills the screen.
 * A "Back to overview" bar sits above, except inside overview previews.
 */
export function MobileFrame() {
  const showBar = !isEmbedded();
  return (
    <>
      {showBar && <DemoBar />}
      <div className={cx('device-stage', showBar && 'device-stage--with-bar')}>
        <div className="device">
          <Outlet />
        </div>
      </div>
    </>
  );
}
