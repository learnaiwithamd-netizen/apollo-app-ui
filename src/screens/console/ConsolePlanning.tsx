import { useState } from 'react';
import { ConsolePageHeader, KpiTile, PanelHeading, SplitView } from '../../components/console/ConsoleLayout';
import { DataTable, RowButton, TableCard, type Column } from '../../components/console/DataTable';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Chip } from '../../components/ui/Chip';
import { Notice } from '../../components/ui/Feedback';
import { availablePool, candidatePool, reliefs, reliefsDue, reliefsUnplanned, type Relief } from '../../data/console';
import { paths } from '../../routes';
import './ConsolePlanning.css';

export function ConsolePlanning() {
  const [selectedId, setSelectedId] = useState('r1');
  const [assigned, setAssigned] = useState<Record<string, string>>({});

  const plannedFor = (r: Relief) => assigned[r.id] ?? r.planned;
  const selected = reliefs.find((r) => r.id === selectedId) ?? reliefs[0];
  const selectedPlanned = plannedFor(selected);
  const candidates = candidatePool[selected.id] ?? [];
  const unplanned = reliefsUnplanned - Object.keys(assigned).length;

  const columns: Column<Relief>[] = [
    {
      header: 'Vessel',
      width: '1.4fr',
      render: (r) => <RowButton selected={r.id === selectedId} onSelect={() => setSelectedId(r.id)} title={r.vessel} />,
    },
    { header: 'Rank', width: '1.3fr', render: (r) => r.rank },
    { header: 'Relieving', width: '1fr', render: (r) => <span className="text-muted">{r.relieving}</span> },
    { header: 'Due', width: '0.6fr', render: (r) => <span className="tabular">{r.due}</span> },
    { header: 'Port', width: '0.9fr', render: (r) => r.port },
    {
      header: 'Planned crew',
      width: '1.2fr',
      render: (r) => {
        const name = plannedFor(r);
        return <Chip tone={name ? 'ok' : 'bad'}>{name ?? 'Unplanned'}</Chip>;
      },
    },
  ];

  return (
    <>
      <ConsolePageHeader
        title="Crew planning"
        description="Match the available pool to upcoming reliefs and assign crew to vessels."
        actions={
          <div className="filters">
            <label className="filter">
              Department
              <select defaultValue="All ranks">
                <option>All ranks</option>
                <option>Engine</option>
                <option>Deck</option>
                <option>Galley</option>
              </select>
            </label>
            <label className="filter">
              Period
              <select defaultValue="Next 60 days">
                <option>Next 60 days</option>
                <option>Next 30 days</option>
                <option>Next 90 days</option>
              </select>
            </label>
          </div>
        }
      />

      <div className="kpi-grid">
        <KpiTile label="Reliefs due in 60 days" value={reliefsDue} tone="navy" />
        <KpiTile label="Planned" value={reliefsDue - unplanned} tone="ok" />
        <KpiTile label="Unplanned" value={unplanned} tone="bad" />
        <KpiTile label="Available in pool" value={availablePool} tone="blue" />
      </div>

      <SplitView asideBasis={340}>
        <TableCard
          title="Upcoming reliefs"
          titleId="reliefs"
          meta={`Next ${reliefs.length} of ${reliefsDue} · select a vessel to see matching crew`}
        >
          <DataTable columns={columns} rows={reliefs} rowKey={(r) => r.id} isSelected={(r) => r.id === selectedId} />
        </TableCard>

        <Card as="aside" aria-labelledby="relief-match" className="panel">
          <PanelHeading
            eyebrow="Relief"
            id="relief-match"
            title={`${selected.vessel} · ${selected.rank}`}
            meta={`Due ${selected.due} at ${selected.port} · relieving ${selected.relieving}`}
          />

          {selectedPlanned ? (
            <Notice title={`${selectedPlanned} is planned for this relief`}>
              <span>The crew member sees the vessel and joining date in their app. Next step: book travel.</span>
              <Button to={paths.console.flights} variant="success" size="sm" className="planning__book">
                Book flight
              </Button>
            </Notice>
          ) : (
            <div className="candidates">
              <h3 className="candidates__title">Available crew who match</h3>
              {candidates.map((c) => (
                <article key={c.name} className="candidate">
                  <div className="candidate__top">
                    <div className="candidate__who">
                      <span className="candidate__name">{c.name}</span>
                      <span className="candidate__meta">
                        {c.rank} · available {c.available}
                      </span>
                    </div>
                    {c.best && (
                      <Chip tone="sky" strong>
                        Best match
                      </Chip>
                    )}
                  </div>
                  <div className="candidate__tags">
                    {c.tags.map((t) => (
                      <Chip key={t.label} tone={t.tone}>
                        {t.label}
                      </Chip>
                    ))}
                  </div>
                  <Button size="sm" block onClick={() => setAssigned({ ...assigned, [selected.id]: c.name })}>
                    Assign to {selected.vessel}
                  </Button>
                </article>
              ))}
            </div>
          )}
        </Card>
      </SplitView>
    </>
  );
}
