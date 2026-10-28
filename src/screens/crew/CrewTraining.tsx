import { useId, useState } from 'react';
import { CrewTabBar } from '../../components/mobile/TabBar';
import { BackHeader, MobileScreen } from '../../components/mobile/MobileScreen';
import { ToggleGlyph } from '../../components/ui/Accordion';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Chip } from '../../components/ui/Chip';
import { FactGrid } from '../../components/ui/DataList';
import { SectionHeader } from '../../components/ui/Heading';
import { Icon } from '../../components/ui/Icon';
import { SegmentedControl } from '../../components/ui/SegmentedControl';
import { complianceCourses, courseStatusTone, preJoiningCourses } from '../../data/crew';
import { paths } from '../../routes';
import './CrewTraining.css';

type Tab = 'courses' | 'compliance';

export function CrewTraining() {
  const [tab, setTab] = useState<Tab>('courses');
  const doneCount = preJoiningCourses.filter((c) => c.tone === 'done').length;

  return (
    <MobileScreen
      nav={<CrewTabBar active="schedule" />}
      header={
        <BackHeader title="Training Schedule" backTo={paths.crew.schedule} backLabel="Schedule">
          <SegmentedControl
            label="Training type"
            value={tab}
            onChange={setTab}
            options={[
              { value: 'courses', label: 'Pre-joining courses' },
              { value: 'compliance', label: 'Company compliance' },
            ]}
          />
        </BackHeader>
      }
    >
      {tab === 'courses' ? (
        <>
          <a href="#" className="external-banner">
            <Icon name="external" size={22} />
            <span className="external-banner__text">
              <span className="external-banner__title">Competency Management System</span>
              <span>Opens the external training site</span>
            </span>
          </a>

          <SectionHeader
            title="Complete before joining"
            aside={`${doneCount} of ${preJoiningCourses.length} done`}
            className="training__heading"
          />

          {preJoiningCourses.map((course, i) => (
            <CourseCard key={course.title} course={course} defaultOpen={i === 0} />
          ))}
        </>
      ) : (
        <>
          <p className="training__intro">In-house courses assigned by the office. Each one opens on the external training site.</p>
          {complianceCourses.map((m) => (
            <Card as="article" key={m.title} className="compliance-card">
              <div className="compliance-card__top">
                <h3 className="compliance-card__title">{m.title}</h3>
                <Chip tone={courseStatusTone[m.tone]}>{m.status}</Chip>
              </div>
              <span className="compliance-card__meta">{m.meta}</span>
              {m.pending && (
                <Button href="#" size="md" iconAfter="external" iconSize={16} className="compliance-card__open">
                  Open course
                </Button>
              )}
            </Card>
          ))}
        </>
      )}
    </MobileScreen>
  );
}

function CourseCard({ course, defaultOpen }: { course: (typeof preJoiningCourses)[number]; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const bodyId = useId();

  return (
    <Card as="section" clip>
      <button
        type="button"
        className="course__head"
        aria-expanded={open}
        aria-controls={bodyId}
        onClick={() => setOpen(!open)}
      >
        <span className="course__text">
          <span className="course__title">{course.title}</span>
          <Chip tone={courseStatusTone[course.tone]}>{course.status}</Chip>
        </span>
        <ToggleGlyph open={open} className="course__toggle" />
      </button>
      {open && (
        <div id={bodyId} className="course__body">
          <FactGrid
            weight="medium"
            className="course__facts"
            items={[
              { label: 'Updated', value: course.updated },
              { label: 'Booked dates', value: course.booked },
              { label: 'Venue', value: course.venue },
              { label: 'Guest house', value: course.guestHouse },
            ]}
          />
        </div>
      )}
    </Card>
  );
}
