import { Navigate, Route, Routes } from 'react-router-dom';
import { ConsoleLayout } from './components/console/ConsoleLayout';
import { MobileFrame } from './components/mobile/MobileFrame';
import { SignIn } from './screens/SignIn';
import { CrewCirculars } from './screens/crew/CrewCirculars';
import { CrewCompany } from './screens/crew/CrewCompany';
import { CrewDocuments } from './screens/crew/CrewDocuments';
import { CrewFlight } from './screens/crew/CrewFlight';
import { CrewHome } from './screens/crew/CrewHome';
import { CrewJoining } from './screens/crew/CrewJoining';
import { CrewOnboard } from './screens/crew/CrewOnboard';
import { CrewPreJoining } from './screens/crew/CrewPreJoining';
import { CrewProfile } from './screens/crew/CrewProfile';
import { CrewSchedule } from './screens/crew/CrewSchedule';
import { CrewServiceRecord } from './screens/crew/CrewServiceRecord';
import { CrewTalentMatrix } from './screens/crew/CrewTalentMatrix';
import { CrewTraining } from './screens/crew/CrewTraining';
import { CrewVacancies } from './screens/crew/CrewVacancies';
import { StaffApprovals } from './screens/staff/StaffApprovals';
import { StaffCrew } from './screens/staff/StaffCrew';
import { StaffHome } from './screens/staff/StaffHome';
import { ConsoleCirculars } from './screens/console/ConsoleCirculars';
import { ConsoleFlights } from './screens/console/ConsoleFlights';
import { ConsolePlanning } from './screens/console/ConsolePlanning';
import { ConsoleTraining } from './screens/console/ConsoleTraining';
import { paths } from './routes';

export function App() {
  return (
    <Routes>
      <Route element={<MobileFrame />}>
        <Route path={paths.signIn} element={<SignIn />} />

        <Route path={paths.crew.home} element={<CrewHome />} />
        <Route path={paths.crew.schedule} element={<CrewSchedule />} />
        <Route path={paths.crew.preJoining} element={<CrewPreJoining />} />
        <Route path={paths.crew.training} element={<CrewTraining />} />
        <Route path={paths.crew.joining} element={<CrewJoining />} />
        <Route path={paths.crew.flight} element={<CrewFlight />} />
        <Route path={paths.crew.onboard} element={<CrewOnboard />} />
        <Route path={paths.crew.vacancies} element={<CrewVacancies />} />
        <Route path={paths.crew.company} element={<CrewCompany />} />
        <Route path={paths.crew.documents} element={<CrewDocuments />} />
        <Route path={paths.crew.circulars} element={<CrewCirculars />} />
        <Route path={paths.crew.profile} element={<CrewProfile />} />
        <Route path={paths.crew.talentMatrix} element={<CrewTalentMatrix />} />
        <Route path={paths.crew.serviceRecord} element={<CrewServiceRecord />} />

        <Route path={paths.staff.home} element={<StaffHome />} />
        <Route path={paths.staff.approvals} element={<StaffApprovals />} />
        <Route path={paths.staff.crew} element={<StaffCrew />} />
      </Route>

      <Route path="/console" element={<ConsoleLayout />}>
        <Route index element={<Navigate to={paths.console.planning} replace />} />
        <Route path={paths.console.planning} element={<ConsolePlanning />} />
        <Route path={paths.console.flights} element={<ConsoleFlights />} />
        <Route path={paths.console.training} element={<ConsoleTraining />} />
        <Route path={paths.console.circulars} element={<ConsoleCirculars />} />
      </Route>

      <Route path="*" element={<Navigate to={paths.signIn} replace />} />
    </Routes>
  );
}
