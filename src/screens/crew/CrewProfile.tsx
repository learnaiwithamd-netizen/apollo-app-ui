import { Link } from 'react-router-dom';
import { CrewTabBar } from '../../components/mobile/TabBar';
import { BackHeader, MobileScreen } from '../../components/mobile/MobileScreen';
import { Accordion } from '../../components/ui/Accordion';
import { Avatar } from '../../components/ui/Avatar';
import { ListGroup, ListRow } from '../../components/ui/Card';
import { KeyValueList } from '../../components/ui/DataList';
import { Eyebrow } from '../../components/ui/Heading';
import { Icon } from '../../components/ui/Icon';
import { IconTile } from '../../components/ui/IconTile';
import { crewMember, lastContract, lastVesselEarnings, profileMenu } from '../../data/crew';
import { paths } from '../../routes';
import './CrewProfile.css';

export function CrewProfile() {
  return (
    <MobileScreen
      gap={16}
      nav={<CrewTabBar active="home" />}
      header={<BackHeader title="My Profile" backTo={paths.crew.home} backLabel="Home" />}
    >
      <a href="#" className="profile-card">
        <Avatar initials={crewMember.initials} size={56} tone="sky" />
        <span className="profile-card__text">
          <span className="profile-card__name">{crewMember.name}</span>
          <span className="profile-card__role">
            {crewMember.rank} · ID {crewMember.employeeId}
          </span>
          <span className="profile-card__hint">Personal details, next of kin, bank</span>
        </span>
        <Icon name="chevronRight" size={20} strokeWidth={2} />
      </a>

      <Accordion
        title="Earnings on last vessel"
        summary={`${lastContract.vessel} · Dec 2025 to Jun 2026`}
        icon="wallet"
        iconTone="sky"
        titleSize="md"
        bodyClassName="earnings"
      >
        <KeyValueList items={lastVesselEarnings} split />
        <Link to={paths.crew.onboard} className="earnings__link">
          View salary slips
          <Icon name="chevronRight" size={16} strokeWidth={2} />
        </Link>
      </Accordion>

      {profileMenu.map((group) => (
        <section key={group.name} className="profile-menu">
          <Eyebrow className="profile-menu__label">{group.name}</Eyebrow>
          <ListGroup size="menu">
            {group.items.map((item) => (
              <ListRow
                key={item.label}
                {...(item.to ? { to: item.to } : { href: '#' })}
                className={item.danger ? 'profile-menu__danger' : undefined}
                leading={
                  <IconTile icon={item.icon} tone={item.danger ? 'bad' : 'sky'} size="sm" round iconSize={18} strokeWidth={1.9} />
                }
                title={item.label}
                meta={item.meta}
              />
            ))}
          </ListGroup>
        </section>
      ))}

      <p className="profile__version">Apollo Crew app · version 1.0</p>
    </MobileScreen>
  );
}
