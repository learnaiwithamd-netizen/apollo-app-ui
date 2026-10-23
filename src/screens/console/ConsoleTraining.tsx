import { useState } from 'react';
import { ConsolePageHeader, PanelHeading, SplitView } from '../../components/console/ConsoleLayout';
import { DataTable, RowButton, TableCard, type Column } from '../../components/console/DataTable';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Chip } from '../../components/ui/Chip';
import { Notice, ProgressBar } from '../../components/ui/Feedback';
import { Field } from '../../components/ui/Form';
import { cx } from '../../lib/cx';
import { assignAudiences, courseLibrary, courseTypeTone } from '../../data/console';
import './ConsoleTraining.css';

type Course = (typeof courseLibrary)[number];

const doneLabel = (c: Course) => `${c.done} of ${c.of} done`;

export function ConsoleTraining() {
  const [selectedId, setSelectedId] = useState('k1');
  const [audienceId, setAudienceId] = useState('all');
  const [adding, setAdding] = useState(false);
  const [assigned, setAssigned] = useState<Record<string, boolean>>({});

  const selected = courseLibrary.find((c) => c.id === selectedId) ?? courseLibrary[0];
  const audience = assignAudiences.find((a) => a.id === audienceId) ?? assignAudiences[0];
  const assignKey = `${selected.id}:${audience.id}`;

  const columns: Column<Course>[] = [
    {
      header: 'Course',
      width: '2.2fr',
      render: (c) => (
        <RowButton
          selected={c.id === selectedId}
          onSelect={() => {
            setSelectedId(c.id);
            setAdding(false);
          }}
          title={c.title}
          subtitle={c.url}
        />
      ),
    },
    { header: 'Type', width: '1fr', render: (c) => <Chip tone={courseTypeTone[c.type]}>{c.type}</Chip> },
    { header: 'For', width: '1fr', render: (c) => c.audience },
    {
      header: 'Completed',
      width: '180px',
      render: (c) => (
        <span className="progress-cell">
          <span className="progress-cell__label">{doneLabel(c)}</span>
          <ProgressBar value={c.done / c.of} />
        </span>
      ),
    },
  ];

  return (
    <>
      <ConsolePageHeader
        title="Training"
        description="Keep the course list, assign courses to crew and track completion. Course content stays on the external site; Apollo stores the link."
        actions={
          <Button size="md" icon="plus" className="training-console__add" onClick={() => setAdding(true)}>
            Add course link
          </Button>
        }
      />

      <SplitView asideBasis={360}>
        <TableCard title="Course list" titleId="course-list">
          <DataTable columns={columns} rows={courseLibrary} rowKey={(c) => c.id} isSelected={(c) => c.id === selectedId} />
        </TableCard>

        <Card as="aside" aria-labelledby={adding ? 'add-course' : 'assign-course'} className="panel">
          {adding ? (
            <form
              className="course-form"
              onSubmit={(e) => {
                e.preventDefault();
                setAdding(false);
              }}
            >
              <h2 id="add-course" className="panel-heading__title">
                Add course link
              </h2>
              <Field label="Course title" htmlFor="course-title" size="sm">
                <input id="course-title" type="text" className="input input--sm" placeholder="e.g. Environmental awareness 2027" />
              </Field>
              <Field label="Course URL" htmlFor="course-url" size="sm">
                <input id="course-url" type="url" className="input input--sm" placeholder="https://" />
              </Field>
              <div className="course-form__pair">
                <Field label="Type" htmlFor="course-type" size="sm">
                  <select id="course-type" className="input input--sm">
                    <option>Compliance</option>
                    <option>Pre-joining</option>
                    <option>STCW refresher</option>
                  </select>
                </Field>
                <Field label="Complete within" htmlFor="course-due" size="sm">
                  <select id="course-due" className="input input--sm">
                    <option>30 days</option>
                    <option>Before joining</option>
                    <option>60 days</option>
                  </select>
                </Field>
              </div>
              <div className="course-form__pair">
                <Button variant="neutral" size="md" onClick={() => setAdding(false)}>
                  Cancel
                </Button>
                <Button type="submit" size="md">
                  Save course
                </Button>
              </div>
            </form>
          ) : (
            <div className="assign">
              <PanelHeading
                eyebrow="Assign course"
                id="assign-course"
                title={selected.title}
                meta={`${doneLabel(selected)} · ${selected.due}`}
              />
              <fieldset className="assign__audiences">
                <legend className="assign__legend">Assign to</legend>
                {assignAudiences.map((a) => (
                  <button
                    key={a.id}
                    type="button"
                    aria-pressed={a.id === audienceId}
                    onClick={() => setAudienceId(a.id)}
                    className={cx('audience-option', a.id === audienceId && 'is-on')}
                  >
                    <span className="audience-option__label">{a.label}</span>
                    <span className="audience-option__count">{a.count} crew</span>
                  </button>
                ))}
              </fieldset>
              <Field label="Due date" htmlFor="assign-due" size="sm">
                <input id="assign-due" type="text" className="input input--sm" placeholder="DD MMM YYYY" />
              </Field>
              {assigned[assignKey] && (
                <Notice size="sm">
                  Assigned to {audience.count} crew. They will see it under Training › Company compliance.
                </Notice>
              )}
              <Button onClick={() => setAssigned({ ...assigned, [assignKey]: true })}>Assign to {audience.count} crew</Button>
            </div>
          )}
        </Card>
      </SplitView>
    </>
  );
}
