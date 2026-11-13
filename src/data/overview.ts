/*
 * Copy for the leadership overview page (/overview).
 * Every claim maps to a screen in the demo. Bracketed values are placeholders
 * to fill before the page is sent. No figures here are measured results.
 */
import type { IconName } from '../components/ui/Icon';
import type { Tone } from '../lib/tone';
import { paths } from '../routes';

export const hero = {
  eyebrow: 'Apollo Maritime · crew and shore staff app',
  /** Rendered as "Every crew change, under <em>control</em>." */
  headlineLead: 'Every crew change, under',
  headlineAccent: 'control',
  subtext:
    'Apollo puts seafarers, crewing teams and management on one system. Documents, training, flights and circulars move from request to ready, without being chased by phone or email.',
};

export const problem = {
  title: 'Crew changes depend on many small steps',
  lead: 'A visa, a refresher course, a flight, a signature. Each one is tracked somewhere different, and one missing piece can hold up a joining.',
  points: [
    {
      who: 'Crewing teams',
      text: 'chase missing documents, re-type ticket details and find out about expiring certificates late.',
    },
    {
      who: 'Seafarers',
      text: 'don’t know whether they’re ready to join until someone calls them, and company circulars reach them unevenly.',
    },
    {
      who: 'Management',
      text: 'can’t see crew readiness and compliance across the fleet in one place until something goes wrong.',
    },
  ],
};

export interface Persona {
  icon: IconName;
  tone: Tone;
  who: string;
  example: string;
  job: string;
  gives: string;
  to: string;
  linkLabel: string;
}

export const personas: Persona[] = [
  {
    icon: 'ship',
    tone: 'sky',
    who: 'Seafarer',
    example: 'e.g. Second Engineer',
    job: 'Get ready to join on time and keep a professional record.',
    gives: 'Schedule, documents, flight, pay slips and allotment in one app.',
    to: paths.crew.home,
    linkLabel: 'Open the crew app',
  },
  {
    icon: 'clipboardCheck',
    tone: 'info',
    who: 'Crewing executive',
    example: 'e.g. engine ranks',
    job: 'Fill every relief with a ready, compliant crew member.',
    gives: 'One approvals queue, joining readiness at a glance, and flights sent straight to the crew app.',
    to: paths.staff.home,
    linkLabel: 'Open the shore staff app',
  },
  {
    icon: 'dashboard',
    tone: 'ok',
    who: 'Management',
    example: 'Fleet and crewing leadership',
    job: 'Keep ships crewed, compliant and on schedule.',
    gives: 'Crew planning across the fleet, training completion, and proof that circulars were acknowledged.',
    to: paths.console.planning,
    linkLabel: 'Open the web console',
  },
];

export interface JourneyStage {
  step: string;
  feeling: string;
  today: string;
  apollo: string;
  to: string;
}

export const journey: JourneyStage[] = [
  {
    step: 'Pre-joining',
    feeling: 'Anxious',
    today: '“Has my paperwork been accepted?”',
    apollo: 'Upload documents and see each one as approved, in review or expiring.',
    to: paths.crew.preJoining,
  },
  {
    step: 'Training',
    feeling: 'Unsure',
    today: '“Which courses are mandatory for me?”',
    apollo: 'Courses assigned by rank with due dates. The crewing team sees completion.',
    to: paths.crew.training,
  },
  {
    step: 'Joining',
    feeling: 'Stressed',
    today: '“My travel details arrived last minute.”',
    apollo: 'The ticket appears in the app as soon as it’s issued.',
    to: paths.crew.joining,
  },
  {
    step: 'Onboard',
    feeling: 'Disconnected',
    today: '“I lose touch with the office at sea.”',
    apollo: 'Circulars, pay slips and claims stay in their pocket.',
    to: paths.crew.onboard,
  },
];

export interface CareCard {
  icon: IconName;
  tone: Tone;
  title: string;
  text: string;
  to: string;
}

export const care = {
  title: 'Care beyond the contract',
  lead: 'Apollo looks after the person, not just the posting.',
  cards: [
    {
      icon: 'wallet',
      tone: 'info',
      title: 'Career and pay',
      text: 'Sea time, service record, skills profile, expected wages, salary slips and allotment, all in the seafarer’s pocket.',
      to: paths.crew.profile,
    },
    {
      icon: 'medical',
      tone: 'bad',
      title: 'Health',
      text: 'Medical fitness and vaccinations tracked before joining, clinic details, medical claims, and family cover set out clearly.',
      to: paths.crew.documents,
    },
    {
      icon: 'message',
      tone: 'sky',
      title: 'Voice',
      text: 'Debriefing, appraisals and SFR reports, so every contract ends with a conversation.',
      to: paths.crew.onboard,
    },
    {
      icon: 'training',
      tone: 'ok',
      title: 'Learning',
      text: 'Courses matched to rank, with due dates, tracked until they’re done.',
      to: paths.crew.training,
    },
  ] satisfies CareCard[],
};

export const value = {
  title: 'Where the value is',
  lead: 'Apollo is mainly a painkiller: it fixes readiness and compliance. It also creates gains for crew, such as a service record, a skills profile, open vacancies and clear benefits, which help keep good seafarers.',
  ranked: [
    { title: 'Less risk', text: 'Certificate expiry alerts, training completion and acknowledged circulars.' },
    { title: 'Time saved', text: 'One approvals queue, and flights that reach the crew app without re-typing.' },
    { title: 'Crew retention and wellbeing', text: 'Seafarers expect a welfare app. Apollo’s shares one record with shore operations.' },
    { title: 'Readiness', text: 'The available crew pool matched to upcoming reliefs.' },
    { title: 'Openness with crew', text: 'Seafarers see their schedule, pay and documents.' },
    { title: 'Less anxiety', text: 'Crew know where they stand before they’re asked.' },
  ],
};

export const pilotMetrics = {
  title: 'What we’ll measure in the pilot',
  lead: 'Baselines are taken at the start of the pilot so leadership sees the change, not a promise. Five measures show results within the 30 days. Two need longer and are tracked after the pilot.',
  /** `afterPilot`: needs more than the 30-day pilot to show a change. */
  metrics: [
    { icon: 'clock', label: 'Days from vacancy to ready-to-join' },
    { icon: 'award', label: 'Certificates that expire without being flagged' },
    { icon: 'megaphone', label: 'Share of crew who acknowledge circulars' },
    { icon: 'inbox', label: 'Time to turn around an approval' },
    { icon: 'message', label: 'Contracts with a completed debriefing' },
    { icon: 'warning', label: 'Unplanned reliefs per month', afterPilot: true },
    { icon: 'users', label: 'Crew rejoin rate', afterPilot: true },
  ] satisfies { icon: IconName; label: string; afterPilot?: boolean }[],
};

export const rollout = {
  title: 'How we roll it out',
  steps: [
    { title: 'Pilot', text: 'The tanker fleet uses Apollo for 30 days, crew and shore together.' },
    { title: 'Measure', text: 'Compare each pilot measure against its baseline and collect crew and staff feedback.' },
    { title: 'Decide', text: 'Leadership decides on a fleet-wide rollout based on the results.' },
  ],
};

export const closing = {
  title: 'See it working',
  text: 'Sign in as a seafarer or as shore staff. Everything in the demo is sample data.',
  contact: {
    lead: 'To book a walkthrough, contact',
    name: 'Abhishek',
    email: 'official@scalitech.in',
    phone: '+91 89616 79407',
    phoneHref: 'tel:+918961679407',
  },
};
