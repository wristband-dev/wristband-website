import { useState } from 'react';

const samples = [
  {
    id: 'login',
    label: 'Login',
    code: `// app/api/auth/login/route.ts
import { wristbandAuth } from '@/wristband';

export async function GET(req: Request) {
  return wristbandAuth.login(req);
}`,
  },
  {
    id: 'callback',
    label: 'Callback',
    code: `// app/api/auth/callback/route.ts
import { wristbandAuth } from '@/wristband';

export async function GET(req: Request) {
  const callbackResult = await wristbandAuth.callback(req);
  return wristbandAuth.createSession(callbackResult);
}`,
  },
  {
    id: 'logout',
    label: 'Logout',
    code: `// app/api/auth/logout/route.ts
import { wristbandAuth } from '@/wristband';

export async function GET(req: Request) {
  return wristbandAuth.logout(req);
}`,
  },
];

export default function CodeTabs() {
  const [active, setActive] = useState(0);
  const sample = samples[active];

  return (
    <div className="code-tabs">
      <div className="code-tablist" role="tablist">
        {samples.map((s, i) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={i === active}
            className={i === active ? 'active' : ''}
            onClick={() => setActive(i)}
          >
            {s.label}
          </button>
        ))}
      </div>
      <pre>
        <code>{sample.code}</code>
      </pre>
      <style>{`
        .code-tabs {
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.12);
          background: #121314;
        }
        .code-tablist {
          display: flex;
          gap: 0;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .code-tablist button {
          flex: 1;
          padding: 12px;
          background: transparent;
          border: 0;
          color: #aaa;
          font-weight: 600;
          font-size: 14px;
        }
        .code-tablist button.active {
          color: #00ffc1;
          box-shadow: inset 0 -2px 0 #00ffc1;
        }
        .code-tabs pre {
          margin: 0;
          padding: 24px;
          overflow-x: auto;
        }
        .code-tabs code {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 13px;
          color: #e8e8e8;
          white-space: pre;
        }
      `}</style>
    </div>
  );
}
