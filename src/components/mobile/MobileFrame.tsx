import { Outlet } from 'react-router-dom';
import './MobileFrame.css';

/**
 * Layout route for the crew and shore-staff apps. On a desktop browser the
 * app sits in a 390×844 phone-sized frame; on a phone it fills the screen.
 */
export function MobileFrame() {
  return (
    <div className="device-stage">
      <div className="device">
        <Outlet />
      </div>
    </div>
  );
}
