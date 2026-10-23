import { useState, type FormEvent } from 'react';
import { ConsolePageHeader, SplitView } from '../../components/console/ConsoleLayout';
import { DataTable, TableCard, type Column } from '../../components/console/DataTable';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Chip } from '../../components/ui/Chip';
import { Notice, ProgressBar } from '../../components/ui/Feedback';
import { Checkbox, Field } from '../../components/ui/Form';
import { SegmentedControl } from '../../components/ui/SegmentedControl';
import { formatDayMonth } from '../../lib/dates';
import {
  circularAudiences,
  circularCategoryTone,
  publishedCirculars,
  type CircularCategory,
  type PublishedCircular,
} from '../../data/console';
import './ConsoleCirculars.css';

type Category = 'company' | 'rules';

const categoryName: Record<Category, CircularCategory> = {
  company: 'Company circular',
  rules: 'Rules & regulations',
};

export function ConsoleCirculars() {
  const [category, setCategory] = useState<Category>('company');
  const [needAck, setNeedAck] = useState(true);
  const [push, setPush] = useState(true);
  const [published, setPublished] = useState<PublishedCircular[]>([]);

  const company = category === 'company';
  const rows = [...published, ...publishedCirculars];
  const freshIds = new Set(published.map((p) => p.id));

  const pickCategory = (c: Category) => {
    setCategory(c);
    // Company circulars default to needing acknowledgement; rule updates are for information.
    setNeedAck(c === 'company');
  };

  const publish = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const text = (key: string) => String(data.get(key) ?? '').trim();
    const audience = circularAudiences[Number(data.get('audience'))] ?? circularAudiences[0];
    setPublished([
      {
        id: `new-${published.length + 1}`,
        title: text('title') || '[New circular title]',
        ref: text('ref') || (company ? 'APL/XX/2026/xx' : 'Source'),
        date: formatDayMonth(new Date()),
        category: categoryName[category],
        audience: audience.label,
        ack: needAck ? { done: 0, of: audience.count } : undefined,
      },
      ...published,
    ]);
    e.currentTarget.reset();
  };

  const columns: Column<PublishedCircular>[] = [
    {
      header: 'Title',
      width: '2.2fr',
      render: (p) => (
        <span className="circular-cell">
          <span className="circular-cell__title">{p.title}</span>
          <span className="circular-cell__meta">
            {p.ref} · {p.date}
          </span>
        </span>
      ),
    },
    { header: 'Category', width: '1.1fr', render: (p) => <Chip tone={circularCategoryTone[p.category]}>{p.category}</Chip> },
    { header: 'Audience', width: '0.9fr', render: (p) => p.audience },
    {
      header: 'Acknowledged',
      width: '170px',
      render: (p) =>
        p.ack ? (
          <span className="progress-cell">
            <span className="progress-cell__label">
              {p.ack.done} of {p.ack.of}
            </span>
            <ProgressBar value={p.ack.done / p.ack.of} />
          </span>
        ) : (
          <span className="circular-cell__meta">For information</span>
        ),
    },
  ];

  return (
    <>
      <ConsolePageHeader
        title="Circulars"
        description="Publish company circulars and rule updates to the crew app, and track who has acknowledged them."
      />

      <SplitView asideBasis={380}>
        <TableCard title="Published" titleId="published">
          <DataTable
            columns={columns}
            rows={rows}
            rowKey={(p) => p.id}
            minWidth={700}
            rowClassName={(p) => (freshIds.has(p.id) ? 'circulars-console__fresh' : undefined)}
          />
        </TableCard>

        <Card as="aside" aria-labelledby="new-circular" className="panel">
          <form className="circular-form" onSubmit={publish}>
            <h2 id="new-circular" className="panel-heading__title">
              New circular
            </h2>
            <SegmentedControl
              mode="toggle"
              size="sm"
              label="Category"
              value={category}
              onChange={pickCategory}
              options={[
                { value: 'company', label: 'Company circular' },
                { value: 'rules', label: 'Rules & regulations' },
              ]}
            />
            <Field label="Title" htmlFor="circular-title" size="sm">
              <input id="circular-title" name="title" type="text" className="input input--sm" placeholder="Shown as the headline in the app" />
            </Field>
            <div className="circular-form__pair">
              <Field label={company ? 'Circular no.' : 'Source'} htmlFor="circular-ref" size="sm">
                <input
                  id="circular-ref"
                  name="ref"
                  type="text"
                  className="input input--sm"
                  placeholder={company ? 'APL/QHSE/2026/22' : 'e.g. flag administration'}
                />
              </Field>
              <Field label="Audience" htmlFor="circular-audience" size="sm">
                <select id="circular-audience" name="audience" className="input input--sm">
                  {circularAudiences.map((a, i) => (
                    <option key={a.label} value={i}>
                      {a.label} ({a.count})
                    </option>
                  ))}
                </select>
              </Field>
            </div>
            <Field label="Summary for the app" htmlFor="circular-summary" size="sm">
              <textarea
                id="circular-summary"
                name="summary"
                rows={3}
                className="input input--sm"
                placeholder="Two or three lines crew can read on a phone"
              />
            </Field>
            <Field label="Full circular (PDF) or link" htmlFor="circular-link" size="sm">
              <input id="circular-link" name="link" type="url" className="input input--sm" placeholder="https:// or upload below" />
              <input type="file" accept="application/pdf" aria-label="Upload PDF" className="file-input circular-form__file" />
            </Field>
            <Checkbox label="Crew must acknowledge they have read it" checked={needAck} onChange={() => setNeedAck(!needAck)} />
            <Checkbox label="Send a push notification" checked={push} onChange={() => setPush(!push)} />
            {published.length > 0 && (
              <Notice size="sm">Published. It is now at the top of Circulars &amp; Rules in the crew app.</Notice>
            )}
            <Button type="submit">Publish to crew app</Button>
          </form>
        </Card>
      </SplitView>
    </>
  );
}
