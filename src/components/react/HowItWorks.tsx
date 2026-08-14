import { useState } from 'react';

const steps = [
  {
    id: 1,
    title: 'Redirect to Wristband hosted login pages',
    desktop: '/images/steps/step-1-desktop.svg',
    mobile: '/images/steps/step-1-mobile.svg',
    points: [
      'Use Wristband’s SDKs to implement a login endpoint which redirects to Wristband’s hosted login pages.',
      'If the tenant is known upfront, the login endpoint can redirect to the tenant’s login page using the tenant’s vanity domain.',
      'If the tenant is not known, the login endpoint redirects to the tenant discovery page so users can find their tenant.',
    ],
  },
  {
    id: 2,
    title: 'Handle Wristband callback requests',
    desktop: '/images/steps/step-2-desktop.svg',
    mobile: '/images/steps/step-2-mobile.svg',
    points: [
      'After the user authenticates, Wristband redirects to your application callback endpoint with an authorization code.',
      'Use Wristband’s SDKs to exchange the authorization code for tokens, then use the access token to retrieve the user’s claims.',
      'Create a session for the authenticated user and redirect back to your application’s home page or deep link.',
    ],
  },
  {
    id: 3,
    title: 'Verify authenticated state (frontend)',
    desktop: '/images/steps/step-3-desktop.svg',
    mobile: '/images/steps/step-3-mobile.svg',
    points: [
      'Load the auth context by retrieving the user’s session data. In this example the session data is pulled from a session cookie.',
      'Use the auth context to verify that only authenticated users can access your application’s protected routes.',
      'To protect your application’s APIs, set up logic to verify the session cookie before processing the request.',
    ],
  },
  {
    id: 4,
    title: 'Verify authenticated state (backend)',
    desktop: '/images/steps/step-4-desktop.svg',
    mobile: '/images/steps/step-4-mobile.svg',
    points: [
      'Use the access token associated with the user’s session in order to make authenticated calls to your backend APIs.',
      'Verify the validity of the access token using the public signing keys Wristband generated for your application.',
      'If the access token associated to the session has expired, use the session’s refresh token to get a new access token from Wristband.',
    ],
  },
  {
    id: 5,
    title: 'Use Wristband’s APIs to manage users from your app',
    desktop: '/images/steps/step-5-desktop.svg',
    mobile: '/images/steps/step-5-mobile.svg',
    points: [
      'Use Wristband’s APIs to update a user’s profile attributes and also change their password.',
      'Allow users to change their emails securely by using Wristband’s change email flow.',
      'Wristband’s APIs can also be used to let users enroll in MFA.',
    ],
  },
  {
    id: 6,
    title: 'Use Wristband’s APIs to manage tenants from your app',
    desktop: '/images/steps/step-6-desktop.svg',
    mobile: '/images/steps/step-6-mobile.svg',
    points: [
      'Use Wristband’s APIs to query existing tenant users and also invite new users.',
      'Allow tenant admins to configure their identity providers so their users can log in with SSO.',
      'Wristband’s APIs can also be used to configure security policies such as MFA for individual tenants.',
    ],
  },
];

const icons = ['/images/icons/step-a.png', '/images/icons/step-b.png', '/images/icons/step-c.png'];

export default function HowItWorks() {
  const [active, setActive] = useState(0);
  const step = steps[active];

  return (
    <div className="hiw">
      <div className="hiw-tabs" role="tablist" aria-label="How it works steps">
        {steps.map((s, i) => (
          <button
            key={s.id}
            role="tab"
            aria-selected={i === active}
            className={i === active ? 'hiw-tab active' : 'hiw-tab'}
            onClick={() => setActive(i)}
            type="button"
          >
            Step {s.id}
          </button>
        ))}
      </div>

      <div className="hiw-panel" role="tabpanel">
        <div className="hiw-copy">
          <p className="hiw-num">{String(step.id).padStart(2, '0')}</p>
          <h3>{step.title}</h3>
          <ul>
            {step.points.map((point, i) => (
              <li key={point}>
                <img src={icons[i]} alt="" width={28} height={28} />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="hiw-media">
          <img className="desktop-only" src={step.desktop} alt={`Step ${step.id} diagram`} />
          <img className="mobile-only" src={step.mobile} alt={`Step ${step.id} diagram`} />
        </div>
      </div>

      <style>{`
        .hiw-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          justify-content: center;
          margin-bottom: 40px;
        }
        .hiw-tab {
          border: 1px solid #e8e8ed;
          background: #fff;
          border-radius: 999px;
          padding: 10px 18px;
          font-size: 14px;
          font-weight: 600;
          color: #0c0c0c;
        }
        .hiw-tab.active {
          background: #3635c0;
          border-color: #3635c0;
          color: #fff;
        }
        .hiw-panel {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 40px;
          align-items: center;
          background: #fff;
          border: 1px solid #e8e8ed;
          border-radius: 16px;
          padding: 32px;
        }
        .hiw-num {
          font-size: 3rem;
          font-weight: 800;
          color: #00ffc1;
          line-height: 1;
          margin-bottom: 8px;
        }
        .hiw-copy h3 {
          font-size: 1.5rem;
          margin-bottom: 20px;
        }
        .hiw-copy ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .hiw-copy li {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          font-size: 0.95rem;
          color: #333;
        }
        .hiw-copy li img {
          flex-shrink: 0;
          margin-top: 2px;
        }
        .hiw-media img {
          width: 100%;
        }
        .mobile-only { display: none; }
        @media (max-width: 900px) {
          .hiw-panel { grid-template-columns: 1fr; }
          .desktop-only { display: none; }
          .mobile-only { display: block; }
        }
      `}</style>
    </div>
  );
}
