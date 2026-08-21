import { useEffect, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import {
  DEFAULT_FRAMEWORK_ID,
  ENDPOINT_IDS,
  type EndpointId,
  type SdkSample,
} from '../../data/sdk-matrix';
import { DotNetIcon, NestIcon, NextIcon, NodeIcon, PythonIcon } from './SdkMatrixIcons';
import './SdkMatrix.css';

export type HighlightedSample = SdkSample & { html: string };

export type HighlightedFramework = {
  id: string;
  name: string;
  samples: Record<EndpointId, HighlightedSample>;
};

type Props = {
  frameworks: HighlightedFramework[];
};

const ICONS: Record<string, (selected: boolean) => ReactNode> = {
  next: (selected) => <NextIcon selected={selected} />,
  express: (selected) => <NodeIcon selected={selected} />,
  django: (selected) => <PythonIcon selected={selected} />,
  nest: (selected) => <NestIcon selected={selected} />,
  dotnet: (selected) => <DotNetIcon selected={selected} />,
};

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const onChange = () => setMatches(media.matches);
    onChange();
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

function SdkMatrixWidget({ frameworks }: Props) {
  const [frameworkId, setFrameworkId] = useState(DEFAULT_FRAMEWORK_ID);
  const [endpoint, setEndpoint] = useState<EndpointId>('login');
  const compact = useMediaQuery('(max-width: 767px)');

  const framework = frameworks.find((item) => item.id === frameworkId) ?? frameworks[0];
  const sample = framework.samples[endpoint];

  return (
    <div className="sdk-matrix">
      <div className="sdk-matrix-rail" role="tablist" aria-label="SDK frameworks" aria-orientation="vertical">
        {frameworks.map((item) => {
          const selected = item.id === framework.id;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              className={selected ? 'sdk-matrix-fw is-selected' : 'sdk-matrix-fw'}
              aria-selected={selected}
              aria-label={item.name}
              onClick={() => setFrameworkId(item.id)}
            >
              {ICONS[item.id]?.(selected)}
            </button>
          );
        })}
      </div>

      <div className="sdk-matrix-main">
        <div className="sdk-matrix-tabs" role="tablist" aria-label="Auth endpoints">
          {ENDPOINT_IDS.map((id) => {
            const selected = id === endpoint;
            const label = compact
              ? framework.samples[id].name.replace(' Endpoint', '')
              : framework.samples[id].name;
            return (
              <button
                key={id}
                type="button"
                role="tab"
                className={selected ? 'sdk-matrix-tab is-selected' : 'sdk-matrix-tab'}
                aria-selected={selected}
                onClick={() => setEndpoint(id)}
              >
                {label}
              </button>
            );
          })}
        </div>
        <div
          className="sdk-matrix-code"
          role="tabpanel"
          aria-label={sample.name}
          dangerouslySetInnerHTML={{ __html: sample.html }}
        />
      </div>
    </div>
  );
}

export default function SdkMatrix({ frameworks }: Props) {
  const [target, setTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setTarget(document.getElementById('wristband-sdk-matrix'));
  }, []);

  if (!target) return null;
  return createPortal(<SdkMatrixWidget frameworks={frameworks} />, target);
}
