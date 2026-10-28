import { useState } from 'react';
import { CrewTabBar } from '../../components/mobile/TabBar';
import { MobileScreen, TitleHeader } from '../../components/mobile/MobileScreen';
import { Button } from '../../components/ui/Button';
import { ListGroup, ListRow } from '../../components/ui/Card';
import { Chip } from '../../components/ui/Chip';
import { BottomSheet } from '../../components/ui/Feedback';
import { Field } from '../../components/ui/Form';
import { Eyebrow } from '../../components/ui/Heading';
import { Icon } from '../../components/ui/Icon';
import { IconTile } from '../../components/ui/IconTile';
import { cx } from '../../lib/cx';
import type { Tone } from '../../lib/tone';
import { documentGroups, documentTypes, type DocStatus } from '../../data/crew';
import './CrewDocuments.css';

const statusChip: Record<Exclude<DocStatus, 'missing'>, { label: string; tone: Tone }> = {
  valid: { label: 'Valid', tone: 'ok' },
  expiring: { label: 'Expires soon', tone: 'warn' },
  review: { label: 'In review', tone: 'info' },
};

interface UploadTarget {
  /** Document being replaced, or null for a new upload. */
  id: string | null;
  type: string;
}

export function CrewDocuments() {
  const [sheet, setSheet] = useState<UploadTarget | null>(null);
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});

  const groups = documentGroups.map((g) => ({
    ...g,
    docs: g.docs.map((d) =>
      submitted[d.id] ? { ...d, status: 'review' as const, meta: 'Uploaded just now · awaiting verification' } : d,
    ),
  }));
  const all = groups.flatMap((g) => g.docs);
  const counts = {
    valid: all.filter((d) => d.status === 'valid').length,
    attention: all.filter((d) => d.status === 'expiring' || d.status === 'review').length,
    missing: all.filter((d) => d.status === 'missing').length,
  };

  const submit = () => {
    if (sheet?.id) setSubmitted({ ...submitted, [sheet.id]: true });
    setSheet(null);
  };

  return (
    <MobileScreen
      gap={18}
      nav={<CrewTabBar active="documents" />}
      header={
        <TitleHeader
          title="Documents"
          action={
            <Button size="md" icon="plus" className="documents__add" onClick={() => setSheet({ id: null, type: 'Select type' })}>
              Add
            </Button>
          }
        >
          <div className="doc-counts">
            <DocCount tone="ok" value={counts.valid} label="Valid" />
            <DocCount tone="warn" value={counts.attention} label="Expiring / review" />
            <DocCount tone="bad" value={counts.missing} label="Missing" />
          </div>
        </TitleHeader>
      }
      overlay={
        sheet && (
          <BottomSheet title="Upload document" onClose={() => setSheet(null)}>
            <UploadForm target={sheet} onSubmit={submit} />
          </BottomSheet>
        )
      }
    >
      {groups.map((g) => (
        <section key={g.name} className="documents__group">
          <Eyebrow>{g.name}</Eyebrow>
          <ListGroup>
            {g.docs.map((d) => (
              <ListRow
                key={d.id}
                leading={<IconTile icon={d.icon} />}
                title={d.name}
                meta={d.meta}
                trailing={
                  d.status === 'missing' ? (
                    <Button
                      variant="danger"
                      size="sm"
                      icon="upload"
                      iconSize={16}
                      onClick={() => setSheet({ id: d.id, type: d.name })}
                    >
                      Upload
                    </Button>
                  ) : (
                    <Chip tone={statusChip[d.status].tone} className="documents__chip">
                      {statusChip[d.status].label}
                    </Chip>
                  )
                }
              />
            ))}
          </ListGroup>
        </section>
      ))}
      <p className="documents__note">
        Uploads go to the crewing office for verification. You will get a notification once a document is approved.
      </p>
    </MobileScreen>
  );
}

function DocCount({ tone, value, label }: { tone: Tone; value: number; label: string }) {
  return (
    <div className={cx('doc-count', `doc-count--${tone}`)}>
      <span className="doc-count__value">{value}</span>
      <span className="doc-count__label">{label}</span>
    </div>
  );
}

function UploadForm({ target, onSubmit }: { target: UploadTarget; onSubmit: () => void }) {
  const types = documentTypes.includes(target.type) ? documentTypes : [target.type, ...documentTypes];
  return (
    <form
      className="upload-form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <Field label="Document type" htmlFor="doc-type">
        <select id="doc-type" className="input" defaultValue={target.type}>
          {types.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </Field>
      <div className="upload-form__pair">
        <Field label="Certificate no." htmlFor="doc-number">
          <input id="doc-number" type="text" className="input" placeholder="As printed" />
        </Field>
        <Field label="Expiry date" htmlFor="doc-expiry">
          <input id="doc-expiry" type="text" className="input" placeholder="DD MMM YYYY" />
        </Field>
      </div>
      <div className="upload-form__pair">
        <button type="button" className="upload-drop">
          <Icon name="camera" size={22} />
          Scan with camera
        </button>
        <label className="upload-drop">
          <Icon name="file" size={22} />
          Choose PDF or photo
          <input type="file" accept="application/pdf,image/*" className="visually-hidden" />
        </label>
      </div>
      <Button type="submit" size="hero" block>
        Submit for verification
      </Button>
    </form>
  );
}
