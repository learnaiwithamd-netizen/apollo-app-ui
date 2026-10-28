/* Demo data for the shore staff web console. */
import type { DataItem } from '../components/ui/DataList';
import type { Tone } from '../lib/tone';

/* Crew planning */

export interface Relief {
  id: string;
  vessel: string;
  rank: string;
  relieving: string;
  due: string;
  port: string;
  /** Crew already planned for this relief. */
  planned?: string;
}

export const reliefsDue = 38;
export const reliefsUnplanned = 11;
export const availablePool = 86;

export const reliefs: Relief[] = [
  { id: 'r1', vessel: 'MT Harbour Crest', rank: 'Second Engineer', relieving: 'K. Iyer', due: '20 Nov', port: 'Fujairah' },
  { id: 'r2', vessel: 'MV Ocean Meridian', rank: 'Second Engineer', relieving: 'J. Thomas', due: '06 Nov', port: 'Singapore', planned: 'Arjun Nair' },
  { id: 'r3', vessel: 'MV Silver Strand', rank: 'Chief Engineer', relieving: 'P. Rao', due: '14 Nov', port: 'Singapore', planned: 'Sanjay Kulkarni' },
  { id: 'r4', vessel: 'MV Eastern Tide', rank: 'Third Officer', relieving: 'D. Kapoor', due: '28 Nov', port: 'Rotterdam' },
  { id: 'r5', vessel: 'MT Saffron Bay', rank: 'Fitter', relieving: 'S. Khan', due: '02 Dec', port: 'Houston' },
  { id: 'r6', vessel: 'MV Northern Pelican', rank: 'Electrical Officer', relieving: 'A. Joshi', due: '09 Dec', port: 'Santos', planned: '[Name]' },
];

export interface Candidate {
  name: string;
  rank: string;
  available: string;
  best?: boolean;
  tags: { label: string; tone: Tone }[];
}

/** Available crew matching each unplanned relief. */
export const candidatePool: Record<string, Candidate[]> = {
  r1: [
    {
      name: 'Rahul Bose',
      rank: '2/E',
      available: '10 Nov',
      best: true,
      tags: [
        { label: 'Tanker, 3 contracts', tone: 'ok' },
        { label: 'Documents complete', tone: 'ok' },
        { label: 'Courses done', tone: 'ok' },
      ],
    },
    {
      name: 'Nikhil Shetty',
      rank: '2/E',
      available: '18 Nov',
      tags: [
        { label: 'Tanker, 1 contract', tone: 'info' },
        { label: 'BST expires Dec', tone: 'warn' },
      ],
    },
    {
      name: 'Ajay Menon',
      rank: '3/E, promotion due',
      available: 'now',
      tags: [
        { label: 'Tanker, 2 contracts', tone: 'info' },
        { label: 'Needs CoC upgrade check', tone: 'warn' },
      ],
    },
  ],
  r4: [
    {
      name: 'Farhan Ali',
      rank: '3/O',
      available: 'now',
      best: true,
      tags: [
        { label: 'Container, 2 contracts', tone: 'ok' },
        { label: 'Documents complete', tone: 'ok' },
      ],
    },
    {
      name: 'Suresh Pillai',
      rank: '3/O',
      available: '01 Dec',
      tags: [
        { label: '3 days after relief', tone: 'warn' },
        { label: 'Bulk only', tone: 'info' },
      ],
    },
  ],
  r5: [
    {
      name: 'Mohan Lal',
      rank: 'Fitter',
      available: '25 Nov',
      best: true,
      tags: [
        { label: 'Tanker, 4 contracts', tone: 'ok' },
        { label: 'US visa valid', tone: 'ok' },
      ],
    },
    {
      name: 'Prakash Nair',
      rank: 'Fitter',
      available: 'now',
      tags: [{ label: 'No US visa', tone: 'warn' }],
    },
  ],
};

/* Flights & travel */

export type TravelStatus = 'open' | 'booked' | 'issued';

export interface TravelRequest {
  id: string;
  name: string;
  rank: string;
  vessel: string;
  kind: 'Joining' | 'Sign-off';
  route: string;
  date: string;
  /** Where and when the traveller must arrive. */
  reach: string;
  status: TravelStatus;
  facts?: DataItem[];
}

export const travelStatus: Record<TravelStatus, { label: string; tone: Tone }> = {
  open: { label: 'Not booked', tone: 'bad' },
  booked: { label: 'Booked, ticket pending', tone: 'info' },
  issued: { label: 'Ticket issued', tone: 'ok' },
};

export const travelRequests: TravelRequest[] = [
  {
    id: 't1',
    name: 'Rohan Fernandes',
    rank: 'Third Engineer',
    vessel: 'MT Harbour Crest',
    kind: 'Joining',
    route: 'BOM → DXB',
    date: '08 Nov',
    reach: '09 Nov, Fujairah',
    status: 'open',
  },
  {
    id: 't2',
    name: 'J. Thomas',
    rank: 'Second Engineer',
    vessel: 'MV Ocean Meridian',
    kind: 'Sign-off',
    route: 'SIN → COK',
    date: '07 Nov',
    reach: 'home, 07 Nov',
    status: 'open',
  },
  {
    id: 't3',
    name: 'Arjun Nair',
    rank: 'Second Engineer',
    vessel: 'MV Ocean Meridian',
    kind: 'Joining',
    route: 'BOM → SIN',
    date: '05 Nov',
    reach: '06 Nov, Singapore',
    status: 'issued',
    facts: [
      { label: 'Flight', value: 'SA 423' },
      { label: 'PNR', value: 'K7Q2LX' },
      { label: 'Departs', value: '05 Nov, 23:55' },
      { label: 'Arrives', value: '06 Nov, 08:05' },
    ],
  },
  {
    id: 't4',
    name: 'Mohit Das',
    rank: 'Fitter',
    vessel: 'MV Ocean Meridian',
    kind: 'Joining',
    route: 'CCU → SIN',
    date: '05 Nov',
    reach: '06 Nov, Singapore',
    status: 'booked',
    facts: [
      { label: 'Flight', value: 'SA 318' },
      { label: 'PNR', value: 'R2D8WE' },
      { label: 'Departs', value: '05 Nov, 22:40' },
      { label: 'Ticket', value: 'Awaiting issue' },
    ],
  },
  {
    id: 't5',
    name: 'Sanjay Kulkarni',
    rank: 'Chief Engineer',
    vessel: 'MV Silver Strand',
    kind: 'Joining',
    route: 'MAA → SIN',
    date: '13 Nov',
    reach: '14 Nov, Singapore',
    status: 'issued',
    facts: [
      { label: 'Flight', value: 'SA 245' },
      { label: 'PNR', value: 'M4T7ZN' },
      { label: 'Departs', value: '13 Nov, 23:20' },
      { label: 'Arrives', value: '14 Nov, 06:05' },
    ],
  },
];

/* Training */

export type CourseType = 'Compliance' | 'Pre-joining' | 'STCW refresher';

export const courseTypeTone: Record<CourseType, Tone> = {
  Compliance: 'info',
  'Pre-joining': 'sky',
  'STCW refresher': 'warn',
};

export const courseLibrary: {
  id: string;
  title: string;
  url: string;
  type: CourseType;
  audience: string;
  done: number;
  of: number;
  due: string;
}[] = [
  { id: 'k1', title: 'Anti-bribery & ethics 2026', url: 'learn.[provider].com/ethics-2026', type: 'Compliance', audience: 'All crew', done: 194, of: 312, due: 'due 31 Oct' },
  { id: 'k2', title: 'Drug & alcohol policy refresher', url: 'learn.[provider].com/da-2026', type: 'Compliance', audience: 'All crew', done: 56, of: 312, due: 'due 15 Nov' },
  { id: 'k3', title: 'Cyber security awareness onboard', url: 'learn.[provider].com/cyber', type: 'Compliance', audience: 'Officers', done: 128, of: 141, due: 'rolling, 30 days' },
  { id: 'k4', title: 'ME engine operation & control system', url: '[training centre booking link]', type: 'Pre-joining', audience: 'Engineers', done: 9, of: 23, due: 'before joining' },
  { id: 'k5', title: 'Bridge manoeuvring & engine control', url: '[training centre booking link]', type: 'Pre-joining', audience: 'Senior officers', done: 6, of: 14, due: 'before joining' },
  { id: 'k6', title: 'Basic safety training refresher', url: '[approved institute link]', type: 'STCW refresher', audience: 'Expiring in 90 days', done: 2, of: 17, due: 'before expiry' },
];

export const assignAudiences = [
  { id: 'all', label: 'All active crew', count: 312 },
  { id: 'rank', label: 'By rank: Engineers', count: 74 },
  { id: 'vessel', label: 'By vessel: MV Ocean Meridian', count: 21 },
  { id: 'joiners', label: 'Joiners in next 30 days', count: 24 },
];

/* Circulars */

export type CircularCategory = 'Company circular' | 'Rules & regulations';

export const circularCategoryTone: Record<CircularCategory, Tone> = {
  'Company circular': 'info',
  'Rules & regulations': 'sky',
};

export interface PublishedCircular {
  id: string;
  title: string;
  ref: string;
  date: string;
  category: CircularCategory;
  audience: string;
  /** Acknowledgement counts; absent when the circular is for information only. */
  ack?: { done: number; of: number };
}

export const publishedCirculars: PublishedCircular[] = [
  { id: 'p1', title: 'Revised drug & alcohol policy, effective 1 Nov 2026', ref: 'APL/HR/2026/14', date: '18 Oct', category: 'Company circular', audience: 'All crew', ack: { done: 141, of: 312 } },
  { id: 'p2', title: 'Fuel oil sampling: updated onboard procedure', ref: 'Flag notice', date: '15 Oct', category: 'Rules & regulations', audience: 'Engine ranks' },
  { id: 'p3', title: 'Updated travel and per-diem guidelines', ref: 'APL/CR/2026/09', date: '09 Oct', category: 'Company circular', audience: 'All crew' },
  { id: 'p4', title: 'Fatigue management: hours of rest reminders', ref: 'APL/QHSE/2026/21', date: '01 Oct', category: 'Company circular', audience: 'All crew', ack: { done: 288, of: 312 } },
  { id: 'p5', title: 'Focused inspection campaign on ballast water records', ref: 'PSC campaign', date: '28 Sep', category: 'Rules & regulations', audience: 'Officers' },
];

export const circularAudiences = [
  { label: 'All crew', count: 312 },
  { label: 'Officers', count: 141 },
  { label: 'Engine ranks', count: 74 },
  { label: 'Tanker fleet', count: 96 },
];
