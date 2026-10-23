import { useId, useState } from 'react';
import { StaffTabBar } from '../../components/mobile/TabBar';
import { MobileScreen, TitleHeader } from '../../components/mobile/MobileScreen';
import { Avatar } from '../../components/ui/Avatar';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Chip } from '../../components/ui/Chip';
import { FactGrid } from '../../components/ui/DataList';
import { Icon } from '../../components/ui/Icon';
import { ChoiceChips } from '../../components/ui/SegmentedControl';
import { approvals, approvalTabs, type ApprovalKind, type ApprovalRequest } from '../../data/staff';
import './StaffApprovals.css';

type Decision = 'approved' | 'declined';

export function StaffApprovals() {
  const [tab, setTab] = useState<ApprovalKind>('docs');
  const [openId, setOpenId] = useState<string | null>('d1');
  const [decisions, setDecisions] = useState<Record<string, Decision>>({});

  const pendingIn = (kind: ApprovalKind) => approvals[kind].filter((a) => !decisions[a.id]).length;
  const remaining = approvalTabs.reduce((n, t) => n + pendingIn(t.id), 0);

  const decide = (id: string, decision: Decision) => {
    setDecisions({ ...decisions, [id]: decision });
    setOpenId(null);
  };

  return (
    <MobileScreen
      gap={10}
      nav={<StaffTabBar active="approvals" />}
      header={
        <TitleHeader title="Approvals" meta={`${remaining} pending`}>
          <ChoiceChips
            mode="tabs"
            label="Approval type"
            value={tab}
            onChange={(t) => {
              setTab(t);
              setOpenId(null);
            }}
            options={approvalTabs.map((t) => ({ value: t.id, label: t.label, count: pendingIn(t.id) }))}
          />
        </TitleHeader>
      }
    >
      {approvals[tab].map((request) => (
        <ApprovalCard
          key={request.id}
          request={request}
          queryInsteadOfReject={tab === 'avail'}
          decision={decisions[request.id]}
          open={openId === request.id}
          onToggle={() => setOpenId(openId === request.id ? null : request.id)}
          onDecide={(d) => decide(request.id, d)}
        />
      ))}
    </MobileScreen>
  );
}

interface ApprovalCardProps {
  request: ApprovalRequest;
  /** Availability updates are queried with the crew member rather than rejected. */
  queryInsteadOfReject: boolean;
  decision?: Decision;
  open: boolean;
  onToggle: () => void;
  onDecide: (decision: Decision) => void;
}

function ApprovalCard({ request: r, queryInsteadOfReject, decision, open, onToggle, onDecide }: ApprovalCardProps) {
  const bodyId = useId();
  const declineLabel = queryInsteadOfReject ? 'Query' : 'Reject';
  const showBody = open && !decision;

  return (
    <Card as="article" clip>
      <button
        type="button"
        className="approval__head"
        aria-expanded={showBody}
        aria-controls={bodyId}
        onClick={onToggle}
        disabled={!!decision}
      >
        <Avatar initials={r.initials} size={40} />
        <span className="approval__text">
          <span className="approval__what">{r.what}</span>
          <span className="approval__who">
            {r.who} · {r.when}
          </span>
        </span>
        {decision ? (
          <Chip tone={decision === 'approved' ? 'ok' : 'bad'}>
            {decision === 'approved' ? 'Approved' : queryInsteadOfReject ? 'Queried' : 'Rejected'}
          </Chip>
        ) : (
          <Icon name={open ? 'chevronUp' : 'chevronDown'} size={20} strokeWidth={2} className="approval__chevron" />
        )}
      </button>
      {showBody && (
        <div id={bodyId} className="approval__body">
          {r.file && (
            <div role="img" aria-label="Uploaded file preview" className="approval__preview">
              <Icon name="file" size={30} strokeWidth={1.6} />
              <span>{r.file} · tap to zoom</span>
            </div>
          )}
          <FactGrid items={r.fields} />
          <div className="approval__actions">
            <Button variant="danger-outline" onClick={() => onDecide('declined')}>
              {declineLabel}
            </Button>
            <Button onClick={() => onDecide('approved')}>Approve</Button>
          </div>
        </div>
      )}
    </Card>
  );
}
