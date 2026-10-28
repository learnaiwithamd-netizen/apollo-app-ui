/* Demo data for the crew app, signed in as Arjun Nair. Bracketed values are placeholders for real content. */
import type { IconName } from '../components/ui/Icon';
import type { DataItem } from '../components/ui/DataList';
import type { Tone } from '../lib/tone';
import { paths } from '../routes';

export const crewMember = {
  name: 'Arjun Nair',
  initials: 'AN',
  rank: 'Second Engineer',
  employeeId: 'APL-20417',
  lastLogin: '20 Oct, 13:06',
  unreadNotifications: 3,
};

export const nextJoining = {
  vessel: 'MV Ocean Meridian',
  vesselType: 'Bulk carrier',
  date: '06 Nov 2026',
  port: 'Singapore',
  daysToGo: 17,
  flight: { route: 'BOM → SIN', number: 'SA 423', departs: '05 Nov, 23:55', pnr: 'K7Q2LX' },
  readiness: [
    { label: 'Medical done', done: true },
    { label: 'Visa applied', done: false },
    { label: 'Ticket booked', done: true },
  ],
};

export interface ActionItem {
  title: string;
  meta: string;
  tone: Tone;
  icon: IconName;
  to: string;
}

export const actionsNeeded: ActionItem[] = [
  {
    title: 'Upload Yellow Fever certificate',
    meta: 'Missing · needed before joining',
    tone: 'bad',
    icon: 'upload',
    to: paths.crew.documents,
  },
  {
    title: 'Anti-bribery & ethics 2026',
    meta: 'Compliance training · due 31 Oct',
    tone: 'warn',
    icon: 'shield',
    to: paths.crew.training,
  },
  {
    title: 'Acknowledge: Revised drug & alcohol policy',
    meta: 'Company circular · read and confirm',
    tone: 'info',
    icon: 'megaphone',
    to: paths.crew.circulars,
  },
];

export const latestUpdates: { tag: string; tone: Tone; date: string; title: string }[] = [
  { tag: 'Company circular', tone: 'info', date: '18 Oct 2026', title: 'Revised drug & alcohol policy, effective 1 Nov 2026' },
  { tag: 'Rules & regulations', tone: 'sky', date: '15 Oct 2026', title: 'Fuel oil sampling: updated onboard procedure' },
];

/* Schedule */

export const contractSteps = ['Pre-joining', 'Training', 'Joining', 'Onboard'];
/** Index of the step the crew member is on. */
export const currentStep = 2;

export const scheduleTiles: { title: string; status: string; statusTone?: Tone; to: string; icon: IconName }[] = [
  { title: 'Pre-Joining', status: 'Available from 01 Nov', to: paths.crew.preJoining, icon: 'users' },
  { title: 'Training', status: '3 courses to complete', statusTone: 'warn', to: paths.crew.training, icon: 'training' },
  { title: 'Joining', status: '06 Nov · Singapore', statusTone: 'info', to: paths.crew.joining, icon: 'briefcase' },
  { title: 'Onboard', status: 'Last contract details', to: paths.crew.onboard, icon: 'clipboardCheck' },
];

export const mustView: { title: string; meta: string; to: string; icon: IconName }[] = [
  { title: 'Vacancies', meta: '6 open positions for your rank', to: paths.crew.vacancies, icon: 'userPlus' },
  { title: 'About us / Contact us', meta: 'Offices, crewing desk, 24x7 line', to: paths.crew.company, icon: 'link' },
  { title: 'Benefits', meta: 'What Apollo offers you and your family', to: paths.crew.benefits, icon: 'gift' },
];

/* Pre-joining */

export interface AvailabilityEntry {
  from: string;
  logged: string;
}

export const availabilityLog: AvailabilityEntry[] = [
  { from: '01 Nov 2026', logged: '12 Oct 2026' },
  { from: '20 Oct 2026', logged: '28 Sep 2026' },
  { from: '15 Oct 2026', logged: '02 Sep 2026' },
];

export const lastContact: DataItem[] = [
  { label: 'NRE', value: 'None recorded' },
  { label: 'RJB', value: '01 Nov 2026' },
  { label: 'Last contact', value: '12 Oct 2026' },
  { label: 'Contacted by', value: 'Crewing desk · phone call' },
];

/* Training */

export type CourseStatus = 'booked' | 'todo' | 'done' | 'overdue';

export const courseStatusTone: Record<CourseStatus, Tone> = {
  booked: 'info',
  todo: 'warn',
  done: 'ok',
  overdue: 'bad',
};

export const preJoiningCourses: {
  title: string;
  status: string;
  tone: CourseStatus;
  updated: string;
  booked: string;
  venue: string;
  guestHouse: string;
}[] = [
  {
    title: 'Bridge manoeuvring & engine control',
    status: 'Booked',
    tone: 'booked',
    updated: '14 Oct 2026',
    booked: '27 to 29 Oct 2026',
    venue: '[Training centre, Mumbai]',
    guestHouse: 'Not required',
  },
  {
    title: 'Machinery maintenance skills, Module III',
    status: 'To be booked',
    tone: 'todo',
    updated: '10 Oct 2026',
    booked: 'Awaiting slot',
    venue: 'To be confirmed',
    guestHouse: 'To be confirmed',
  },
  {
    title: 'ME engine operation & control system',
    status: 'Booked',
    tone: 'booked',
    updated: '12 Oct 2026',
    booked: '02 to 03 Nov 2026',
    venue: '[Training centre, Mumbai]',
    guestHouse: 'Booked, 2 nights',
  },
  {
    title: 'Machinery breakdown avoidance, campaign 2',
    status: 'Completed',
    tone: 'done',
    updated: '14 Sep 2026',
    booked: '11 to 12 Sep 2026',
    venue: '[Training centre, Mumbai]',
    guestHouse: 'Not required',
  },
];

export const complianceCourses: { title: string; status: string; tone: CourseStatus; meta: string; pending: boolean }[] = [
  { title: 'Anti-bribery & ethics 2026', status: 'Due 31 Oct', tone: 'todo', meta: 'Assigned 01 Oct · approx. 40 min', pending: true },
  { title: 'Drug & alcohol policy refresher', status: 'Due 15 Nov', tone: 'booked', meta: 'Assigned 18 Oct · approx. 20 min', pending: true },
  { title: 'Cyber security awareness onboard', status: 'Completed', tone: 'done', meta: 'Completed 02 Oct 2026', pending: false },
  { title: 'Anti-harassment & bullying prevention', status: 'Completed', tone: 'done', meta: 'Completed 21 Aug 2026', pending: false },
];

/* Joining */

export const joiningSections: {
  title: string;
  summary: string;
  icon: IconName;
  rows: DataItem[];
  cta?: { label: string; to?: string };
}[] = [
  {
    title: 'Joining schedule',
    summary: '06 Nov 2026 · Singapore',
    icon: 'calendar',
    rows: [
      { label: 'Expected joining', value: '06 Nov 2026, MV Ocean Meridian, Singapore' },
      { label: 'My expected wages', value: 'USD [amount] incl. sup. cert + loyalty bonus USD [amount]' },
      { label: 'Doctor for medical', value: '[Clinic name]' },
      { label: 'Doctor address', value: '[Clinic address]' },
      { label: 'Medical date', value: '16 Oct 2026 · Fit', tone: 'ok' },
      { label: 'Licence applied', value: '08 Oct 2026' },
      { label: 'Visa', value: 'Applied 15 Oct 2026', tone: 'warn' },
      { label: 'Ticket requested', value: '14 Oct 2026' },
    ],
  },
  {
    title: 'Planned vessel',
    summary: 'MV Ocean Meridian · Bulk carrier',
    icon: 'ship',
    rows: [
      { label: 'Vessel', value: 'MV Ocean Meridian' },
      { label: 'Type', value: 'Bulk carrier' },
      { label: 'Flag', value: '[Flag state]' },
      { label: 'Main engine', value: '[Make and model]' },
      { label: 'Relieving', value: '[Name], Second Engineer' },
      { label: 'Contract length', value: '6 months (+/- 1)' },
    ],
  },
  {
    title: 'Flight',
    summary: 'BOM → SIN · 05 Nov, 23:55',
    icon: 'plane',
    rows: [
      { label: 'Route', value: 'Mumbai (BOM) to Singapore (SIN)' },
      { label: 'Flight', value: 'SA 423 · Economy' },
      { label: 'PNR', value: 'K7Q2LX' },
      { label: 'Status', value: 'Ticket issued', tone: 'ok' },
    ],
    cta: { label: 'View full itinerary', to: paths.crew.flight },
  },
  {
    title: 'Port agent',
    summary: 'Meets you at arrivals',
    icon: 'pin',
    rows: [
      { label: 'Agency', value: '[Agency name], Singapore' },
      { label: 'Contact person', value: '[Name]' },
      { label: 'Phone', value: '[+65 0000 0000]' },
      { label: 'Meeting point', value: 'Arrival hall, after customs' },
    ],
    cta: { label: 'Call port agent' },
  },
  {
    title: 'Incident',
    summary: 'Nothing reported',
    icon: 'warning',
    rows: [
      { label: 'Reported', value: 'None for this joining' },
      { label: 'Use this for', value: 'Flight delay, missed connection, lost baggage, injury in transit' },
    ],
    cta: { label: 'Report an issue' },
  },
];

/* Flight */

export const joiningFlight = {
  vessel: 'MV Ocean Meridian',
  from: { code: 'BOM', city: 'Mumbai' },
  to: { code: 'SIN', city: 'Singapore' },
  duration: '5h 40m',
  departs: '05 Nov, 23:55',
  arrives: '06 Nov, 08:05',
  facts: [
    { label: 'Flight', value: 'SA 423' },
    { label: 'PNR', value: 'K7Q2LX' },
    { label: 'Class', value: 'Economy' },
    { label: 'Baggage', value: '40 kg' },
    { label: 'Seat', value: 'At check-in' },
    { label: 'Booked by', value: 'Travel desk' },
  ] satisfies DataItem[],
  journey: [
    { time: '20:55', what: 'Report at airport', where: 'Mumbai T2 · 3 hours before departure' },
    { time: '23:55', what: 'Depart Mumbai', where: 'Flight SA 423' },
    { time: '08:05', what: 'Arrive Singapore', where: 'Changi T3 · local time' },
    { time: '09:00', what: 'Met by port agent', where: 'Arrival hall, after customs' },
    { time: '13:30', what: 'Launch to vessel', where: 'Western anchorage · ETA on board 14:30' },
  ],
  handBaggage: [
    'Passport (valid 6+ months)',
    'CDC / Seaman’s book',
    'Letter of guarantee',
    'Visa or OK-to-board approval',
    'Medical fitness certificate',
  ],
};

/* Onboard */

export const lastContract = {
  vessel: 'MV Coral Ridge',
  signedOn: '08 Dec 2025',
  signedOff: '12 Jun 2026',
  seaTime: '6 m 4 d',
};

export interface OnboardDownload {
  title: string;
  meta: string;
  metaTone?: Tone;
  action: 'View' | 'PDF';
}

export interface OnboardPanel {
  id: string;
  label: string;
  icon: IconName;
  title: string;
  rows?: DataItem[];
  list?: OnboardDownload[];
  cta?: string;
}

export const onboardPanels: OnboardPanel[] = [
  {
    id: 'general',
    label: 'General Details',
    icon: 'info',
    title: 'General details',
    rows: [
      { label: 'Vessel', value: 'MV Coral Ridge' },
      { label: 'Rank', value: 'Second Engineer' },
      { label: 'Sign-on port', value: 'Fujairah' },
      { label: 'Sign-off port', value: 'Singapore' },
      { label: 'Master', value: '[Name]' },
      { label: 'Chief Engineer', value: '[Name]' },
    ],
  },
  {
    id: 'flight',
    label: 'Flight Details',
    icon: 'plane',
    title: 'Flight details',
    rows: [
      { label: 'Sign-off flight', value: 'SIN to BOM, 13 Jun 2026' },
      { label: 'Flight', value: 'SA 422 · Economy' },
      { label: 'PNR', value: 'H3M9PA' },
      { label: 'Status', value: 'Completed' },
    ],
  },
  {
    id: 'allotment',
    label: 'My Allotment',
    icon: 'wallet',
    title: 'My allotment',
    rows: [
      { label: 'Allottee', value: '[Name], spouse' },
      { label: 'Bank', value: '[Bank], account ending 42' },
      { label: 'Monthly amount', value: 'USD [amount]' },
      { label: 'Last remitted', value: '30 May 2026' },
    ],
    cta: 'Request allotment change',
  },
  {
    id: 'claim',
    label: 'My Claim',
    icon: 'fileAdd',
    title: 'My claims',
    list: [
      { title: 'Medical expense, Fujairah', meta: 'Approved · USD [amount]', metaTone: 'ok', action: 'View' },
      { title: 'Excess baggage on sign-off', meta: 'Under review', metaTone: 'warn', action: 'View' },
    ],
    cta: 'Submit a new claim',
  },
  {
    id: 'salary',
    label: 'My Salary Slip',
    icon: 'receipt',
    title: 'My salary slips',
    list: [
      { title: 'June 2026 (final)', meta: 'Paid 25 Jun 2026', action: 'PDF' },
      { title: 'May 2026', meta: 'Paid 31 May 2026', action: 'PDF' },
      { title: 'April 2026', meta: 'Paid 30 Apr 2026', action: 'PDF' },
    ],
  },
  {
    id: 'sfr',
    label: 'My SFR Report',
    icon: 'barChart',
    title: 'My SFR report',
    list: [{ title: 'MV Coral Ridge, 2025 to 2026', meta: 'Issued 14 Jun 2026', action: 'PDF' }],
  },
];

/* Documents */

export type DocStatus = 'valid' | 'expiring' | 'review' | 'missing';

export interface CrewDocument {
  id: string;
  name: string;
  meta: string;
  icon: IconName;
  status: DocStatus;
}

export const documentGroups: { name: string; docs: CrewDocument[] }[] = [
  {
    name: 'Identity & travel',
    docs: [
      { id: 'pp', name: 'Passport', meta: 'No. ending 4821 · expires 14 Mar 2031', icon: 'idCard', status: 'valid' },
      { id: 'cdc', name: 'CDC / Seaman’s book', meta: 'No. ending 0937 · expires 02 Aug 2029', icon: 'book', status: 'valid' },
      { id: 'visa', name: 'Visa, Singapore', meta: 'Applied 15 Oct 2026', icon: 'globe', status: 'review' },
    ],
  },
  {
    name: 'Certificates (STCW)',
    docs: [
      { id: 'coc', name: 'CoC, Second Engineer', meta: 'Expires 19 Jan 2028', icon: 'award', status: 'valid' },
      { id: 'bst', name: 'Basic safety training', meta: 'Expires 04 Dec 2026 · 45 days left', icon: 'award', status: 'expiring' },
      { id: 'aff', name: 'Advanced fire fighting', meta: 'Expires 11 May 2029', icon: 'award', status: 'valid' },
    ],
  },
  {
    name: 'Medical',
    docs: [
      { id: 'peme', name: 'Medical fitness (PEME)', meta: 'Issued 16 Oct 2026 · valid 2 years', icon: 'medical', status: 'valid' },
      { id: 'yf', name: 'Yellow fever vaccination', meta: 'Needed before joining', icon: 'medical', status: 'missing' },
    ],
  },
];

export const documentTypes = ['Passport', 'CDC / Seaman’s book', 'STCW certificate', 'Medical certificate', 'Visa'];

/* Circulars */

export interface Circular {
  id: string;
  tag: string;
  ref: string;
  date: string;
  title: string;
  summary: string;
  unread: boolean;
  /** Crew must confirm they have read it. */
  requiresAck: boolean;
  acknowledged?: boolean;
}

export const companyCirculars: Circular[] = [
  {
    id: 'c1',
    tag: 'Policy',
    ref: 'Circular APL/HR/2026/14',
    date: '18 Oct 2026',
    title: 'Revised drug & alcohol policy, effective 1 Nov 2026',
    summary:
      'Random testing frequency onboard is increasing and the permitted limits have been revised. All crew joining after 1 Nov must confirm they have read the updated policy.',
    unread: true,
    requiresAck: true,
  },
  {
    id: 'c2',
    tag: 'Travel',
    ref: 'Circular APL/CR/2026/09',
    date: '09 Oct 2026',
    title: 'Updated travel and per-diem guidelines for joining crew',
    summary: 'New guidance on reporting times, excess baggage approvals and per-diem claims for delays during joining travel.',
    unread: true,
    requiresAck: false,
  },
  {
    id: 'c3',
    tag: 'Safety',
    ref: 'Circular APL/QHSE/2026/21',
    date: '01 Oct 2026',
    title: 'Fatigue management: hours of rest reminders',
    summary: 'A reminder of minimum rest hour requirements and how to record them correctly in the onboard system.',
    unread: false,
    requiresAck: false,
    acknowledged: true,
  },
];

export const ruleUpdates: Circular[] = [
  {
    id: 'r1',
    tag: 'Regulation',
    ref: 'Source: flag administration notice',
    date: '15 Oct 2026',
    title: 'Fuel oil sampling: updated onboard procedure',
    summary: 'Summary of the change and what engine crew need to do differently when drawing and storing fuel samples.',
    unread: true,
    requiresAck: false,
  },
  {
    id: 'r2',
    tag: 'Port State Control',
    ref: 'Source: regional PSC campaign',
    date: '28 Sep 2026',
    title: 'Focused inspection campaign on ballast water records',
    summary: 'What inspectors will check during the campaign period and the common deficiencies to avoid.',
    unread: false,
    requiresAck: false,
  },
  {
    id: 'r3',
    tag: 'Certification',
    ref: 'Source: maritime administration',
    date: '12 Sep 2026',
    title: 'Revalidation of certificates of competency: what you need',
    summary: 'Documents and sea-time evidence needed to revalidate a CoC, and how long processing takes.',
    unread: false,
    requiresAck: false,
  },
];

/* Vacancies */

export type VesselType = 'Bulk' | 'Tanker' | 'Container';

export const vacancies: { id: number; rank: string; vessel: string; type: VesselType; when: string; contract: string }[] = [
  { id: 1, rank: 'Second Engineer', vessel: 'MV Silver Strand', type: 'Bulk', when: 'Dec 2026', contract: '6 months' },
  { id: 2, rank: 'Second Engineer', vessel: 'MT Harbour Crest', type: 'Tanker', when: 'Jan 2027', contract: '5 months' },
  { id: 3, rank: 'Second Engineer', vessel: 'Vessel to be confirmed', type: 'Container', when: 'Jan 2027', contract: '6 months' },
  { id: 4, rank: 'Second Engineer', vessel: 'MV Northern Pelican', type: 'Bulk', when: 'Feb 2027', contract: '6 months' },
  { id: 5, rank: 'Second Engineer', vessel: 'MT Saffron Bay', type: 'Tanker', when: 'Feb 2027', contract: '4 months' },
  { id: 6, rank: 'Second Engineer', vessel: 'MV Eastern Tide', type: 'Container', when: 'Mar 2027', contract: '6 months' },
];

/* About & benefits */

export const offices = [
  { name: 'Crewing office, [City]', address: '[Street address, city, postcode]' },
  { name: 'Head office, [City]', address: '[Street address, city, postcode]' },
];

export const benefits: { title: string; text: string; icon: IconName }[] = [
  { title: 'Loyalty bonus', text: 'Paid when you rejoin within [X] days of sign-off. [Amount by rank]', icon: 'award' },
  { title: 'Medical cover for your family', text: '[Who is covered, the sum insured and how to claim]', icon: 'medical' },
  { title: 'Training sponsorship', text: '[Courses and CoC upgrades the company pays for]', icon: 'training' },
  { title: 'Children’s education support', text: '[Scholarship or allowance details]', icon: 'users' },
  { title: 'Onboard connectivity', text: '[Data allowance per month onboard]', icon: 'globe' },
];

/* Profile */

export const lastVesselEarnings: DataItem[] = [
  { label: 'Basic wages', value: 'USD [amount]' },
  { label: 'Fixed overtime', value: 'USD [amount]' },
  { label: 'Leave pay', value: 'USD [amount]' },
  { label: 'Bonus and allowances', value: 'USD [amount]' },
  { label: 'Total for the contract', value: 'USD [amount]', emphasis: true },
];

export const profileMenu: {
  name: string;
  items: { label: string; meta?: string; to?: string; icon: IconName; danger?: boolean }[];
}[] = [
  {
    name: 'Career',
    items: [
      { label: 'Talent Matrix', meta: 'Overall grade A · 78 points', to: paths.crew.talentMatrix, icon: 'matrix' },
      { label: 'Service Record', meta: '5 contracts · 2 y 6 m sea time', to: paths.crew.serviceRecord, icon: 'list' },
      { label: 'Appraisals', icon: 'star' },
      { label: 'Debriefing', icon: 'message' },
    ],
  },
  {
    name: 'Records',
    items: [
      { label: 'Incidents', icon: 'incident' },
      { label: 'My Visits', icon: 'pin' },
      { label: 'Applications', icon: 'document' },
      { label: 'My Event Gallery', icon: 'image' },
    ],
  },
  {
    name: 'Account',
    items: [
      { label: 'Identity Card', icon: 'idCard' },
      { label: 'Change Password', icon: 'lock' },
      { label: 'Sign Out', to: paths.signIn, icon: 'signOut', danger: true },
    ],
  },
];

/* Talent matrix */

export const talentGrade = { grade: 'A', points: 78, updated: '30 Sep 2026' };

export const talentSections: {
  name: string;
  weight: string;
  max: number;
  rows: { criterion: string; value: string; points: number; outOf: number }[];
}[] = [
  {
    name: 'Experience',
    weight: '10%',
    max: 10,
    rows: [
      { criterion: 'Experience in current rank', value: '6 months', points: 1, outOf: 3 },
      { criterion: 'Service with Apollo', value: '3.4 years', points: 3, outOf: 4 },
      { criterion: 'Time on this ship type', value: '1.6 years', points: 2, outOf: 3 },
    ],
  },
  {
    name: 'Potential',
    weight: '30%',
    max: 30,
    rows: [
      { criterion: 'Competency assessment (CBT)', value: '74%', points: 7, outOf: 10 },
      { criterion: 'Competency tasks completed', value: '3 of 5', points: 5, outOf: 8 },
      { criterion: 'Simulator assessment (BTM / EEM)', value: 'Passed', points: 6, outOf: 6 },
      { criterion: 'Training attended, last 12 months', value: '2 courses', points: 4, outOf: 6 },
    ],
  },
  {
    name: 'Performance',
    weight: '60%',
    max: 60,
    rows: [
      { criterion: 'Appraisal rating, last 2 contracts', value: '4.2 of 5', points: 25, outOf: 30 },
      { criterion: 'Recommended for re-hire', value: 'Yes', points: 15, outOf: 15 },
      { criterion: 'Incident-free contracts', value: '2 of 3', points: 10, outOf: 15 },
    ],
  },
];

/* Service record */

export const seaServiceSummary = [
  { value: '2 y 6 m', label: 'Total sea time' },
  { value: '4', label: 'Contracts with Apollo' },
  { value: '6 m', label: 'As Second Engineer' },
];

export const serviceRecord = [
  { vessel: 'MV Coral Ridge', company: 'Apollo', type: 'Bulk carrier', rank: '2/E', on: '08 Dec 2025', off: '12 Jun 2026', length: '6 m 4 d' },
  { vessel: 'MV Northern Pelican', company: 'Apollo', type: 'Bulk carrier', rank: '3/E', on: '14 Jan 2025', off: '22 Jul 2025', length: '6 m 8 d' },
  { vessel: 'MT Harbour Crest', company: 'Apollo', type: 'Oil tanker', rank: '3/E', on: '03 Mar 2024', off: '18 Aug 2024', length: '5 m 15 d' },
  { vessel: 'MV Silver Strand', company: 'Apollo', type: 'Bulk carrier', rank: '4/E', on: '10 Jun 2023', off: '05 Jan 2024', length: '6 m 26 d' },
  { vessel: '[Vessel name]', company: '[Previous employer]', type: 'Container', rank: '4/E', on: '02 Feb 2022', off: '28 Jul 2022', length: '5 m 26 d' },
];
