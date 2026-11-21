import { useEffect, useRef, useState } from 'react';
import step1Desktop from '../../assets/home/steps/step-1-desktop.svg';
import step1Mobile from '../../assets/home/steps/step-1-mobile.svg';
import step2Desktop from '../../assets/home/steps/step-2-desktop.svg';
import step2Mobile from '../../assets/home/steps/step-2-mobile.svg';
import step3Desktop from '../../assets/home/steps/step-3-desktop.svg';
import step3Mobile from '../../assets/home/steps/step-3-mobile.svg';
import step4Desktop from '../../assets/home/steps/step-4-desktop.svg';
import step4Mobile from '../../assets/home/steps/step-4-mobile.svg';
import step5Desktop from '../../assets/home/steps/step-5-desktop.svg';
import step5Mobile from '../../assets/home/steps/step-5-mobile.svg';
import step6Desktop from '../../assets/home/steps/step-6-desktop.svg';
import step6Mobile from '../../assets/home/steps/step-6-mobile.svg';
import calloutA from '../../assets/home/steps/callout-a.png';
import calloutB from '../../assets/home/steps/callout-b.png';
import calloutC from '../../assets/home/steps/callout-c.png';
import './HowItWorks.css';

// The home page's How It Works tabs. Matches live Webflow: six step tabs, each with a diagram and three callouts.
// Every step is in the HTML, like Webflow, and only the current one shows.
// Switching fades the old step out over 100ms, then the new one in over 300ms.

type ImageSource = { src: string; width: number; height: number };

interface Step {
  title: string;
  desktop: ImageSource;
  mobile: ImageSource;
  callouts: [string, string, string];
  /** Steps 5 and 6 put the callouts beside the diagram on desktop. */
  calloutsBeside?: boolean;
}

const steps: Step[] = [
  {
    title: 'Redirect to Wristband hosted login pages',
    desktop: step1Desktop,
    mobile: step1Mobile,
    callouts: [
      'Use Wristband\u2019s SDKS to implement a login endpoint which redirects to Wristband\u2019s hosted login pages.',
      'If the tenant is known upfront, the login endpoint can redirect to the tenant\u2019s login page using the tenant\u2019s vanity domain.',
      'If the tenant is not known, the login endpoint redirects to the tenant discovery page so users can find their tenant.',
    ],
  },
  {
    title: 'Handle Wristband callback requests',
    desktop: step2Desktop,
    mobile: step2Mobile,
    callouts: [
      'After the user authenticates, Wristband redirects to your application callback endpoint with an authorization code.',
      'Use Wristband\u2019s SDKs to exchange the authorization code for tokens, then use the access token to retrieve the user\u2019s claims.',
      'Create a session for the authenticated user and redirect back to your application\u2019s home page or deep link.',
    ],
  },
  {
    title: 'Verify authenticated state (frontend)',
    desktop: step3Desktop,
    mobile: step3Mobile,
    callouts: [
      'Load the auth context by retrieving the user\u2019s session data. \u00a0In this example the session data is pulled from a session cookie.',
      'Use the auth context to verify that only authenticated users can access your application\u2019s protected routes.',
      "To protect your application's APIs, set up logic to verify the session cookie before processing the request.",
    ],
  },
  {
    title: 'Verify authenticated state (backend)',
    desktop: step4Desktop,
    mobile: step4Mobile,
    callouts: [
      'Use the access token associated with the user\u2019s session in order to make authenticated calls to your backend APIs.',
      'Verify the validity of the access token using the public signing keys Wristband generated for your application.',
      'If the access token associated to the session has expired, use the session\u2019s refresh token to get a new access token from Wristband.',
    ],
  },
  {
    title: 'Use Wristband\u2019s APIs to manage users from your app',
    desktop: step5Desktop,
    mobile: step5Mobile,
    calloutsBeside: true,
    callouts: [
      'Use Wristband\u2019s APIs to update a user\u2019s profile attributes and also change their password.',
      'Allow users to change their emails securely by using Wristband\u2019s change email flow.',
      'Wristband\u2019s APIs can also be used to let users enroll in MFA.',
    ],
  },
  {
    title: 'Use Wristband\u2019s APIs to manage tenants from your app',
    desktop: step6Desktop,
    mobile: step6Mobile,
    calloutsBeside: true,
    callouts: [
      'Use Wristband\u2019s APIs to query existing tenant users and also invite new users.',
      'Allow tenant admins to configure their identity providers so their users can log in with SSO.',
      'Wristband\u2019s APIs can also be used to configure security policies such as MFA for individual tenants.',
    ],
  },
];

const calloutIcons = [
  { image: calloutA, alt: 'step a icon' },
  { image: calloutB, alt: 'step b icon' },
  { image: calloutC, alt: 'step c icon' },
];

const FADE_OUT_MS = 100;
const FADE_IN_MS = 300;

function Callouts({ step, className }: { step: Step; className: string }) {
  return (
    <div className={className}>
      {step.callouts.map((text, index) => (
        <div className="hiw__callout" key={text}>
          <img
            src={calloutIcons[index].image.src}
            width={calloutIcons[index].image.width}
            height={calloutIcons[index].image.height}
            alt={calloutIcons[index].alt}
            loading="lazy"
          />
          <p className="hiw__callout-text">{text}</p>
        </div>
      ))}
    </div>
  );
}

export default function HowItWorks() {
  const [current, setCurrent] = useState(0);
  // 'out': the current step is fading out. 'in-start': the new step is showing at opacity 0. 'idle': fully shown.
  const [phase, setPhase] = useState<'idle' | 'out' | 'in-start'>('idle');
  const pending = useRef<number | null>(null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  useEffect(() => {
    if (phase !== 'in-start') return;
    // Let the new step paint at opacity 0 before fading it in.
    const frame = requestAnimationFrame(() => requestAnimationFrame(() => setPhase('idle')));
    return () => cancelAnimationFrame(frame);
  }, [phase]);

  const select = (index: number) => {
    if (index === (pending.current ?? current)) return;
    pending.current = index;
    window.clearTimeout(timer.current);
    setPhase('out');
    timer.current = window.setTimeout(() => {
      setCurrent(index);
      pending.current = null;
      setPhase('in-start');
    }, FADE_OUT_MS);
  };

  const paneStyle = (index: number) => {
    if (index !== current) return undefined;
    if (phase === 'out') return { opacity: 0, transition: `opacity ${FADE_OUT_MS}ms ease` };
    if (phase === 'in-start') return { opacity: 0, transition: 'none' };
    return { opacity: 1, transition: `opacity ${FADE_IN_MS}ms ease` };
  };

  return (
    <div className="hiw">
      <div className="hiw__menu" role="tablist" aria-label="How it works steps">
        {steps.map((step, index) => {
          const selected = index === (pending.current ?? current);
          return (
            <button
              key={step.title}
              type="button"
              role="tab"
              id={`hiw-tab-${index + 1}`}
              aria-controls={`hiw-pane-${index + 1}`}
              aria-selected={selected}
              aria-label={`Step ${index + 1}`}
              tabIndex={selected ? 0 : -1}
              className={[
                'hiw__tab',
                index === 0 ? 'hiw__tab--first' : 'hiw__tab--step',
                selected ? 'is-current' : '',
              ].join(' ')}
              onClick={() => select(index)}
            >
              <span className="hiw__tab-label">Step {index + 1}</span>
            </button>
          );
        })}
      </div>
      <div className="hiw__panes">
        {steps.map((step, index) => {
          const number = String(index + 1).padStart(2, '0');
          return (
            <div
              key={step.title}
              id={`hiw-pane-${index + 1}`}
              role="tabpanel"
              aria-labelledby={`hiw-tab-${index + 1}`}
              className={`hiw__pane hiw__pane--step-${index + 1}`}
              hidden={index !== current}
              style={paneStyle(index)}
            >
              <div className="hiw__heading">
                <h2 className="hiw__number">{number}</h2>
                <div className="hiw__title">{step.title}</div>
              </div>
              <div className="hiw__figure">
                <img
                  className="hiw__diagram hiw__diagram--desktop"
                  src={step.desktop.src}
                  width={step.desktop.width}
                  height={step.desktop.height}
                  alt={`desktop auth step ${number}`}
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
                {step.calloutsBeside && <Callouts step={step} className="hiw__callouts hiw__callouts--beside" />}
                {/* No width or height, like live Webflow, so the diagram fills its 360px cap. */}
                <img
                  className="hiw__diagram hiw__diagram--mobile"
                  src={step.mobile.src}
                  alt={`mobile auth step ${number}`}
                  loading="lazy"
                />
              </div>
              <Callouts
                step={step}
                className={step.calloutsBeside ? 'hiw__callouts hiw__callouts--below-tablet' : 'hiw__callouts'}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
