/* Demo data for the shore-staff mobile app, signed in as Priya Sharma. */
import type { IconName } from '../components/ui/Icon';
import type { DataItem } from '../components/ui/DataList';
import type { Tone } from '../lib/tone';

export const staffMember = {
  firstName: 'Priya',
  name: 'Priya Sharma',
  initials: 'PS',
  role: 'Crewing executive · Engine ranks',
};

export const todayStats = [
  { value: '86', label: 'Available now' },
  { value: '24', label: 'Joining in 30 days' },
  { value: '11', label: 'Reliefs unplanned' },
  { value: '17', label: 'Certs expiring' },
];

export const upcomingJoiners: {
  initials: string;
  name: string;
  rank: string;
  vessel: string;
  date: string;
  status: string;
  tone: Tone;
}[] = [
  { initials: 'AN', name: 'Arjun Nair', rank: '2/E', vessel: 'MV Ocean Meridian', date: '06 Nov', status: '1 doc missing', tone: 'warn' },
  { initials: 'RF', name: 'Rohan Fernandes', rank: '3/E', vessel: 'MT Harbour Crest', date: '09 Nov', status: 'No flight', tone: 'bad' },
  { initials: 'SK', name: 'Sanjay Kulkarni', rank: 'C/E', vessel: 'MV Silver Strand', date: '14 Nov', status: 'Ready', tone: 'ok' },
  { initials: 'MD', name: 'Mohit Das', rank: 'Fitter', vessel: 'MV Ocean Meridian', date: '06 Nov', status: 'Ready', tone: 'ok' },
];

export const staffAlerts: { title: string; meta: string; icon: IconName; tone: Tone }[] = [
  {
    title: '7 crew have Basic Safety Training expiring within 60 days',
    meta: 'Assign refresher from the web console',
    icon: 'warning',
    tone: 'warn',
  },
  {
    title: 'Anti-bribery & ethics 2026: 62% complete',
    meta: 'Due 31 Oct · 48 crew not started',
    icon: 'shield',
    tone: 'info',
  },
];

/* Approvals */

export type ApprovalKind = 'docs' | 'avail' | 'claims';

export interface ApprovalRequest {
  id: string;
  initials: string;
  who: string;
  what: string;
  when: string;
  /** Uploaded file to preview, when there is one. */
  file?: string;
  fields: DataItem[];
}

export const approvalTabs: { id: ApprovalKind; label: string }[] = [
  { id: 'docs', label: 'Documents' },
  { id: 'avail', label: 'Availability' },
  { id: 'claims', label: 'Claims' },
];

export const approvals: Record<ApprovalKind, ApprovalRequest[]> = {
  docs: [
    {
      id: 'd1',
      initials: 'AN',
      who: 'Arjun Nair, 2/E',
      what: 'Visa, Singapore',
      when: '2 h ago',
      file: 'visa_sg.pdf',
      fields: [
        { label: 'Visa no.', value: 'ending 3310' },
        { label: 'Valid until', value: '05 Feb 2027' },
      ],
    },
    {
      id: 'd2',
      initials: 'MD',
      who: 'Mohit Das, Fitter',
      what: 'Yellow fever vaccination',
      when: '5 h ago',
      file: 'yf_card.jpg',
      fields: [
        { label: 'Certificate no.', value: 'ending 7724' },
        { label: 'Valid', value: 'Lifetime' },
      ],
    },
    {
      id: 'd3',
      initials: 'KR',
      who: 'Kiran Rao, Oiler',
      what: 'Passport (renewed)',
      when: 'Yesterday',
      file: 'passport.pdf',
      fields: [
        { label: 'Passport no.', value: 'ending 5108' },
        { label: 'Expires', value: '22 Sep 2036' },
      ],
    },
    {
      id: 'd4',
      initials: 'VS',
      who: 'Vikram Singh, 4/E',
      what: 'Advanced fire fighting',
      when: 'Yesterday',
      file: 'aff_cert.pdf',
      fields: [
        { label: 'Certificate no.', value: 'ending 0412' },
        { label: 'Expires', value: '30 Aug 2031' },
      ],
    },
    {
      id: 'd5',
      initials: 'AT',
      who: 'Anil Thomas, Motorman',
      what: 'Medical fitness (PEME)',
      when: '2 days ago',
      file: 'peme.pdf',
      fields: [
        { label: 'Clinic', value: '[Approved clinic]' },
        { label: 'Result', value: 'Fit, no restrictions' },
      ],
    },
  ],
  avail: [
    {
      id: 'a1',
      initials: 'RM',
      who: 'Ravi Menon, AB',
      what: 'Availability moved to 20 Nov',
      when: '3 h ago',
      fields: [
        { label: 'Previous', value: '05 Nov 2026' },
        { label: 'Reason given', value: 'Family function' },
      ],
    },
    {
      id: 'a2',
      initials: 'SP',
      who: 'Suresh Pillai, 3/O',
      what: 'Available from 01 Dec',
      when: 'Yesterday',
      fields: [
        { label: 'Last vessel', value: 'MT Saffron Bay' },
        { label: 'Signed off', value: '18 Aug 2026' },
      ],
    },
  ],
  claims: [
    {
      id: 'c1',
      initials: 'JD',
      who: 'Joseph D’Souza, Bosun',
      what: 'Excess baggage on sign-off',
      when: '4 h ago',
      file: 'receipt.jpg',
      fields: [
        { label: 'Amount', value: 'USD [amount]' },
        { label: 'Vessel', value: 'MV Eastern Tide' },
      ],
    },
  ],
};

/* Crew profile */

export const crewProfile = {
  name: 'Arjun Nair',
  initials: 'AN',
  subtitle: 'Second Engineer · CDC ending 0937',
  joining: 'Joining MV Ocean Meridian, 06 Nov · Singapore',
};

export type ReadinessState = 'ok' | 'warn' | 'bad';

export const joiningReadiness: { label: string; meta: string; state: ReadinessState; remindable?: boolean }[] = [
  { label: 'Medical', meta: 'Fit · examined 16 Oct', state: 'ok' },
  { label: 'Visa', meta: 'Uploaded, waiting for your approval', state: 'warn' },
  { label: 'Flight', meta: 'SA 423 · ticket issued', state: 'ok' },
  { label: 'Pre-joining courses', meta: '1 of 4 done · 2 booked', state: 'warn' },
  { label: 'Compliance training', meta: 'Anti-bribery & ethics not started', state: 'warn' },
  { label: 'Yellow fever certificate', meta: 'Missing', state: 'bad', remindable: true },
];

export const recentContracts = [
  { vessel: 'MV Coral Ridge', dates: 'Dec 2025 to Jun 2026', rank: '2/E' },
  { vessel: 'MV Northern Pelican', dates: 'Jan 2025 to Jul 2025', rank: '3/E' },
];
