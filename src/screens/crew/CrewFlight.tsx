import { CrewTabBar } from '../../components/mobile/TabBar';
import { BackHeader, MobileScreen } from '../../components/mobile/MobileScreen';
import { Button } from '../../components/ui/Button';
import { Pill } from '../../components/ui/Chip';
import { FactGrid } from '../../components/ui/DataList';
import { SectionHeader } from '../../components/ui/Heading';
import { Icon } from '../../components/ui/Icon';
import { joiningFlight as flight } from '../../data/crew';
import { paths } from '../../routes';
import './CrewFlight.css';

export function CrewFlight() {
  return (
    <MobileScreen
      gap={16}
      nav={<CrewTabBar active="schedule" />}
      header={<BackHeader title="Flight Details" backTo={paths.crew.joining} backLabel="Joining Schedule" />}
    >
      <section aria-label="Ticket" className="card ticket">
        <div className="ticket__top">
          <div className="ticket__row">
            <span className="ticket__muted">Joining travel · {flight.vessel}</span>
            <Pill tone="success">Ticket issued</Pill>
          </div>
          <div className="ticket__route">
            <div className="ticket__place">
              <span className="ticket__code">{flight.from.code}</span>
              <span className="ticket__muted">{flight.from.city}</span>
            </div>
            <div className="ticket__duration">
              <Icon name="plane" size={26} strokeWidth={1.7} />
              <span className="ticket__muted ticket__small">{flight.duration}</span>
            </div>
            <div className="ticket__place ticket__place--end">
              <span className="ticket__code">{flight.to.code}</span>
              <span className="ticket__muted">{flight.to.city}</span>
            </div>
          </div>
          <FactGrid
            tone="on-dark"
            size="lg"
            className="ticket__times"
            items={[
              { label: 'Departs', value: flight.departs },
              { label: 'Arrives (local)', value: flight.arrives },
            ]}
          />
        </div>
        <div aria-hidden="true" className="ticket__tear" />
        <FactGrid columns={3} tone="navy" className="ticket__facts" items={flight.facts} />
        <div className="ticket__actions">
          <Button href="#" icon="download">
            E-ticket
          </Button>
          <Button href="#" variant="outline" icon="download">
            Guarantee letter
          </Button>
        </div>
      </section>

      <section aria-labelledby="journey" className="flight__section">
        <SectionHeader id="journey" title="Your journey to the vessel" />
        <ol className="card journey">
          {flight.journey.map((step) => (
            <li key={step.time + step.what} className="journey__step">
              <span className="journey__time">{step.time}</span>
              <span aria-hidden="true" className="journey__marker">
                <span className="journey__dot" />
                <span className="journey__line" />
              </span>
              <span className="journey__text">
                <span className="journey__what">{step.what}</span>
                <span className="journey__where">{step.where}</span>
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="carry" className="flight__section">
        <SectionHeader id="carry" title="Carry in hand baggage" />
        <ul className="card checklist">
          {flight.handBaggage.map((item) => (
            <li key={item} className="checklist__item">
              <Icon name="check" size={18} strokeWidth={2.4} className="checklist__icon" />
              {item}
            </li>
          ))}
        </ul>
      </section>
    </MobileScreen>
  );
}
