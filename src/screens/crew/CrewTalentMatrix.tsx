import { Link } from 'react-router-dom';
import { CrewTabBar } from '../../components/mobile/TabBar';
import { BackHeader, MobileScreen } from '../../components/mobile/MobileScreen';
import { Card } from '../../components/ui/Card';
import { ProgressBar } from '../../components/ui/Feedback';
import { Icon } from '../../components/ui/Icon';
import { talentGrade, talentSections } from '../../data/crew';
import { paths } from '../../routes';
import './CrewTalentMatrix.css';

export function CrewTalentMatrix() {
  const sections = talentSections.map((s) => ({ ...s, score: s.rows.reduce((t, r) => t + r.points, 0) }));

  return (
    <MobileScreen
      gap={14}
      nav={<CrewTabBar active="home" />}
      header={<BackHeader title="My Talent Matrix" backTo={paths.crew.profile} backLabel="My Profile" />}
    >
      <section aria-label="Overall talent" className="talent-overall">
        <div className="talent-overall__top">
          <span className="talent-overall__grade">{talentGrade.grade}</span>
          <div className="talent-overall__text">
            <span className="talent-overall__muted">Overall talent grade</span>
            <span className="talent-overall__points">
              {talentGrade.points} <span className="talent-overall__of">/ 100 points</span>
            </span>
            <span className="talent-overall__muted">Updated {talentGrade.updated}</span>
          </div>
        </div>
        <div className="talent-overall__sections">
          {sections.map((s) => (
            <div key={s.name} className="talent-mini">
              <span className="talent-mini__name">{s.name}</span>
              <span className="talent-mini__score">
                {s.score} <span className="talent-mini__max">/ {s.max}</span>
              </span>
              <ProgressBar value={s.score / s.max} onDark />
            </div>
          ))}
        </div>
      </section>

      {sections.map((s) => (
        <Card as="section" clip key={s.name} aria-labelledby={`talent-${s.name}`}>
          <div className="talent-section__head">
            <h2 id={`talent-${s.name}`} className="talent-section__title">
              {s.name}
            </h2>
            <span className="talent-section__weight">Weightage {s.weight}</span>
          </div>
          <table className="talent-table">
            <colgroup>
              <col />
              <col className="talent-table__value-col" />
              <col className="talent-table__points-col" />
            </colgroup>
            <thead>
              <tr>
                <th scope="col">Criteria</th>
                <th scope="col">Your value</th>
                <th scope="col" className="talent-table__points">
                  Points
                </th>
              </tr>
            </thead>
            <tbody>
              {s.rows.map((r) => (
                <tr key={r.criterion}>
                  <td className="talent-table__criterion">{r.criterion}</td>
                  <td className="talent-table__value">{r.value}</td>
                  <td className="talent-table__points">
                    {r.points} / {r.outOf}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th scope="row" colSpan={2}>
                  Total {s.name.toLowerCase()}
                </th>
                <td className="talent-table__points">
                  {s.score} / {s.max}
                </td>
              </tr>
            </tfoot>
          </table>
        </Card>
      ))}

      <Link to={paths.crew.training} className="talent-tip">
        <Icon name="lightbulb" size={22} className="talent-tip__icon" />
        <span>Finish your 2 open competency tasks to add up to 3 points before your next review.</span>
      </Link>
    </MobileScreen>
  );
}
