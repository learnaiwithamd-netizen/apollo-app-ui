import { useSearchParams } from 'react-router-dom';
import logo from '../../assets/apollo-logo.png';
import { CrewTabBar } from '../../components/mobile/TabBar';
import { BackHeader, MobileScreen } from '../../components/mobile/MobileScreen';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Eyebrow } from '../../components/ui/Heading';
import { Icon } from '../../components/ui/Icon';
import { IconTile } from '../../components/ui/IconTile';
import { SegmentedControl } from '../../components/ui/SegmentedControl';
import { benefits, offices } from '../../data/crew';
import { paths } from '../../routes';
import './CrewCompany.css';

type Tab = 'about' | 'benefits';

export function CrewCompany() {
  const [params, setParams] = useSearchParams();
  const tab: Tab = params.get('tab') === 'benefits' ? 'benefits' : 'about';

  return (
    <MobileScreen
      gap={14}
      nav={<CrewTabBar active="schedule" />}
      header={
        <BackHeader title="Apollo" backTo={paths.crew.schedule} backLabel="Schedule">
          <SegmentedControl
            label="Section"
            value={tab}
            onChange={(t) => setParams(t === 'benefits' ? { tab: t } : {}, { replace: true })}
            options={[
              { value: 'about', label: 'About & contact' },
              { value: 'benefits', label: 'Benefits' },
            ]}
          />
        </BackHeader>
      }
    >
      {tab === 'about' ? (
        <>
          <Card as="section" className="about-card">
            <img src={logo} alt="Apollo" width={148} height={45} className="about-card__logo" />
            <p className="about-card__text">
              [Two or three lines about Apollo: fleet size, vessel types managed, years in operation and where the crewing
              offices are.]
            </p>
            <a href="#" className="about-card__link">
              Visit website
              <Icon name="external" size={16} strokeWidth={2} />
            </a>
          </Card>

          <a href="#" className="emergency-line">
            <span aria-hidden="true" className="emergency-line__icon">
              <Icon name="phone" size={22} strokeWidth={1.9} />
            </span>
            <span className="emergency-line__text">
              <span className="emergency-line__title">24x7 emergency line</span>
              <span className="emergency-line__number">[+00 0000 000 000]</span>
            </span>
            <span className="emergency-line__call">Call</span>
          </a>

          <section className="offices">
            <Eyebrow>Offices</Eyebrow>
            {offices.map((o) => (
              <Card as="article" key={o.name} className="office">
                <div className="office__text">
                  <h3 className="office__name">{o.name}</h3>
                  <span className="office__address">{o.address}</span>
                </div>
                <div className="office__actions">
                  <Button href="#" variant="soft" size="md" icon="phone" iconSize={16} className="office__action">
                    Call
                  </Button>
                  <Button href="#" variant="soft" size="md" icon="mail" iconSize={16} className="office__action">
                    Email
                  </Button>
                </div>
              </Card>
            ))}
          </section>
        </>
      ) : (
        <ul className="benefits">
          {benefits.map((b) => (
            <li key={b.title} className="card benefit">
              <IconTile icon={b.icon} tone="sky" />
              <span className="benefit__text">
                <span className="benefit__title">{b.title}</span>
                <span className="benefit__body">{b.text}</span>
              </span>
            </li>
          ))}
        </ul>
      )}
    </MobileScreen>
  );
}
