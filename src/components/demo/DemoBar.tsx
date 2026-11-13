import { Link } from 'react-router-dom';
import { overviewReturnPath } from '../../lib/overviewReturn';
import { Icon } from '../ui/Icon';
import './DemoBar.css';

/**
 * Slim bar above every demo screen with a way back to the leadership overview.
 * Layouts skip it when the screen is embedded as a preview.
 */
export function DemoBar() {
  return (
    <div className="demo-bar">
      <Link to={overviewReturnPath()} className="demo-bar__back">
        <Icon name="chevronLeft" size={16} strokeWidth={2.4} />
        Back to overview
      </Link>
      <span className="demo-bar__note">Apollo demo · sample data</span>
    </div>
  );
}
