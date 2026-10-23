import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/apollo-logo.png';
import { Button } from '../components/ui/Button';
import { Field } from '../components/ui/Form';
import { SegmentedControl } from '../components/ui/SegmentedControl';
import { paths } from '../routes';
import './SignIn.css';

type Role = 'crew' | 'staff';

export function SignIn() {
  const [role, setRole] = useState<Role>('crew');
  const navigate = useNavigate();
  const crew = role === 'crew';

  const submit = (e: FormEvent) => {
    e.preventDefault();
    navigate(crew ? paths.crew.home : paths.staff.home);
  };

  return (
    <div className="sign-in">
      <svg aria-hidden="true" className="sign-in__waves" viewBox="0 0 390 260" preserveAspectRatio="none">
        <path d="M0 120 C 110 60, 250 70, 390 20 L390 260 L0 260 Z" fill="var(--c-sky)" />
        <path d="M0 160 C 130 95, 260 120, 390 70 L390 260 L0 260 Z" fill="var(--c-blue)" />
        <path d="M0 200 C 140 150, 270 175, 390 130 L390 260 L0 260 Z" fill="var(--c-navy)" />
      </svg>

      <div className="sign-in__brand">
        <img src={logo} alt="Apollo" width={177} height={54} />
        <p className="sign-in__tagline">Crew &amp; Shore Staff</p>
      </div>

      <form className="sign-in__form" onSubmit={submit}>
        <SegmentedControl
          mode="toggle"
          size="lg"
          label="I am signing in as"
          value={role}
          onChange={setRole}
          options={[
            { value: 'crew', label: 'Seafarer' },
            { value: 'staff', label: 'Shore staff' },
          ]}
        />

        <Field label={crew ? 'CDC number or Employee ID' : 'Staff email'} htmlFor="uid">
          <input
            id="uid"
            className="input input--lg"
            type={crew ? 'text' : 'email'}
            autoComplete="username"
            placeholder={crew ? 'e.g. MUM 123456' : 'name@company.com'}
          />
        </Field>

        <Field label="Password" htmlFor="pw" aside={<a href="#">Forgot password?</a>}>
          <input id="pw" className="input input--lg" type="password" autoComplete="current-password" placeholder="Enter password" />
        </Field>

        <Button type="submit" size="hero" block className="sign-in__submit">
          Sign in
        </Button>

        {!crew && (
          <p className="sign-in__hint">
            Planning on a desktop? <Link to={paths.console.planning}>Open the web console</Link>
          </p>
        )}
      </form>

      <p className="sign-in__help">Need help signing in? Call the crewing desk</p>
    </div>
  );
}
