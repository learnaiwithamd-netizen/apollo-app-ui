import { useState } from 'react';
import { PanelHeading, ConsolePageHeader, SplitView } from '../../components/console/ConsoleLayout';
import { DataTable, RowButton, TableCard, type Column } from '../../components/console/DataTable';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Chip } from '../../components/ui/Chip';
import { FactGrid } from '../../components/ui/DataList';
import { Notice } from '../../components/ui/Feedback';
import { Checkbox, Field } from '../../components/ui/Form';
import { travelRequests, travelStatus, type TravelRequest } from '../../data/console';
import './ConsoleFlights.css';

export function ConsoleFlights() {
  const [selectedId, setSelectedId] = useState('t1');
  const [issued, setIssued] = useState<Record<string, boolean>>({});
  const [guaranteeLetter, setGuaranteeLetter] = useState(true);
  const [notify, setNotify] = useState(true);

  const rows = travelRequests.map((r) => (issued[r.id] ? { ...r, status: 'issued' as const } : r));
  const selected = rows.find((r) => r.id === selectedId) ?? rows[0];
  const openCount = rows.filter((r) => r.status === 'open').length;

  const columns: Column<TravelRequest>[] = [
    {
      header: 'Crew',
      width: '1.4fr',
      render: (r) => (
        <RowButton selected={r.id === selectedId} onSelect={() => setSelectedId(r.id)} title={r.name} subtitle={r.rank} />
      ),
    },
    { header: 'Vessel', width: '1.3fr', render: (r) => r.vessel },
    { header: 'Type', width: '0.8fr', render: (r) => r.kind },
    { header: 'Route', width: '1fr', render: (r) => <span className="flights__route">{r.route}</span> },
    { header: 'Travel date', width: '0.9fr', render: (r) => <span className="tabular">{r.date}</span> },
    {
      header: 'Status',
      width: '1.4fr',
      render: (r) => <Chip tone={travelStatus[r.status].tone}>{travelStatus[r.status].label}</Chip>,
    },
  ];

  return (
    <>
      <ConsolePageHeader
        title="Flights & travel"
        description="Book joining and sign-off travel. Issued tickets appear in the crew member's app straight away."
      />

      <SplitView asideBasis={360}>
        <TableCard title="Travel requests" titleId="travel-requests" meta={`${openCount} still to book`}>
          <DataTable columns={columns} rows={rows} rowKey={(r) => r.id} isSelected={(r) => r.id === selectedId} />
        </TableCard>

        <Card as="aside" aria-labelledby="booking" className="panel">
          <PanelHeading
            eyebrow={`${selected.kind} travel`}
            id="booking"
            title={`${selected.name} · ${selected.route}`}
            meta={`${selected.vessel} · must reach port by ${selected.reach}`}
          />

          {selected.status === 'open' ? (
            <form
              key={selected.id}
              className="booking-form"
              onSubmit={(e) => {
                e.preventDefault();
                setIssued({ ...issued, [selected.id]: true });
              }}
            >
              <div className="booking-form__grid">
                <Field label="Flight no." htmlFor="flight-no" size="sm">
                  <input id="flight-no" type="text" className="input input--sm" placeholder="e.g. SA 512" />
                </Field>
                <Field label="PNR" htmlFor="pnr" size="sm">
                  <input id="pnr" type="text" className="input input--sm" placeholder="6 characters" maxLength={6} />
                </Field>
                <Field label="Departs" htmlFor="departs" size="sm">
                  <input id="departs" type="text" className="input input--sm" placeholder={`${selected.date}, hh:mm`} />
                </Field>
                <Field label="Arrives (local)" htmlFor="arrives" size="sm">
                  <input id="arrives" type="text" className="input input--sm" placeholder="dd MMM, hh:mm" />
                </Field>
                <Field label="Fare" htmlFor="fare" size="sm">
                  <select id="fare" className="input input--sm">
                    <option>Marine fare, economy</option>
                    <option>Economy</option>
                  </select>
                </Field>
                <Field label="Baggage" htmlFor="baggage" size="sm">
                  <input id="baggage" type="text" className="input input--sm" placeholder="e.g. 40 kg" />
                </Field>
              </div>
              <Field label="E-ticket (PDF)" htmlFor="eticket" size="sm">
                <input id="eticket" type="file" accept="application/pdf" className="file-input" />
              </Field>
              <Checkbox
                label="Generate letter of guarantee for this sector"
                checked={guaranteeLetter}
                onChange={() => setGuaranteeLetter(!guaranteeLetter)}
              />
              <Checkbox label="Notify crew and port agent" checked={notify} onChange={() => setNotify(!notify)} />
              <Button type="submit">Issue ticket to crew</Button>
            </form>
          ) : (
            <div className="booking-done">
              <Notice title={travelStatus[selected.status].label}>
                {selected.name} can see the flight, PNR and journey timeline in the app.
              </Notice>
              <FactGrid
                tone="navy"
                className="booking-done__facts"
                items={
                  selected.facts ?? [
                    { label: 'Flight', value: 'As entered' },
                    { label: 'PNR', value: 'As entered' },
                    { label: 'Route', value: selected.route },
                    { label: 'Date', value: selected.date },
                  ]
                }
              />
              <Button variant="neutral" size="sm">
                Change booking
              </Button>
            </div>
          )}
        </Card>
      </SplitView>
    </>
  );
}
