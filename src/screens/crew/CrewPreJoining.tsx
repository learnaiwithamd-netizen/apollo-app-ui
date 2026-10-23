import { useState, type FormEvent } from 'react';
import { CrewTabBar } from '../../components/mobile/TabBar';
import { BackHeader, MobileScreen } from '../../components/mobile/MobileScreen';
import { Accordion } from '../../components/ui/Accordion';
import { Button } from '../../components/ui/Button';
import { KeyValueList } from '../../components/ui/DataList';
import { Field } from '../../components/ui/Form';
import { cx } from '../../lib/cx';
import { formatDate, toIsoDate } from '../../lib/dates';
import { availabilityLog, lastContact, type AvailabilityEntry } from '../../data/crew';
import { paths } from '../../routes';
import './CrewPreJoining.css';

export function CrewPreJoining() {
  const [log, setLog] = useState<AvailabilityEntry[]>(availabilityLog);
  const [editing, setEditing] = useState(false);
  const current = log[0];

  const save = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const from = new FormData(e.currentTarget).get('from');
    if (typeof from === 'string' && from) {
      setLog([{ from: formatDate(from), logged: formatDate(toIsoDate(new Date())) }, ...log]);
    }
    setEditing(false);
  };

  return (
    <MobileScreen
      nav={<CrewTabBar active="schedule" />}
      header={<BackHeader title="Pre-Joining Schedule" backTo={paths.crew.schedule} backLabel="Schedule" />}
    >
      <Accordion title="Availability log" summary={`Available from ${current.from}`} defaultOpen bodyClassName="availability">
        {editing ? (
          <form className="availability__form" onSubmit={save}>
            <Field label="I am available from" htmlFor="available-from">
              <input id="available-from" name="from" type="date" className="input" defaultValue="2026-11-01" required />
            </Field>
            <Field label="Remarks for crewing desk" htmlFor="remarks">
              <textarea id="remarks" name="remarks" rows={3} className="input" placeholder="e.g. Prefer to join at an Asian port" />
            </Field>
            <div className="availability__actions">
              <Button variant="neutral" onClick={() => setEditing(false)}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        ) : (
          <Button variant="outline" icon="plus" block onClick={() => setEditing(true)}>
            Update availability
          </Button>
        )}

        <ol className="availability__log">
          {log.map((entry, i) => (
            <li key={`${entry.from}-${entry.logged}-${i}`} className="availability__entry">
              <span aria-hidden="true" className={cx('availability__dot', i === 0 && 'availability__dot--current')} />
              <span className="availability__text">
                <span className="availability__from">Available from {entry.from}</span>
                <span className="availability__meta">
                  Logged {entry.logged} · {i === 0 ? 'Current' : 'Superseded'}
                </span>
              </span>
            </li>
          ))}
        </ol>
      </Accordion>

      <Accordion title="NRE / RJB / Last contact" summary="Last contact 12 Oct 2026" bodyClassName="last-contact">
        <KeyValueList items={lastContact} />
      </Accordion>
    </MobileScreen>
  );
}
