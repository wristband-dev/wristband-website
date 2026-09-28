import { useEffect, useState } from 'react';
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

const ICONS: Record<string, React.ComponentType<{ selected: boolean }>> = {
  next: NextIcon,
  express: NodeIcon,
  django: PythonIcon,
  nest: NestIcon,
  dotnet: DotNetIcon,
};

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false); 

  useEffect(() => {
    const media = window.matchMedia(query);
    const onChange = () => setMatches(media.matches);
    
    setMatches(media.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

export default function SdkMatrix({ frameworks }: Props) {
  if (!frameworks || frameworks.length === 0) return null;

  const [frameworkId, setFrameworkId] = useState(DEFAULT_FRAMEWORK_ID);
  const [endpoint, setEndpoint] = useState<EndpointId>('login');
  const compact = useMediaQuery('(max-width: 767px)');

  const framework = frameworks.find((item) => item.id === frameworkId) ?? frameworks[0];
  const sample = framework?.samples?.[endpoint];

  return (
    <div className="sdk-matrix">
      <div className="sdk-matrix-rail" role="tablist" aria-label="SDK frameworks" aria-orientation="vertical">
        {frameworks.map((item) => {
          const selected = item.id === framework.id;
          const IconComponent = ICONS[item.id];

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
              {IconComponent && <IconComponent selected={selected} />}
            </button>
          );
        })}
      </div>

      <div className="sdk-matrix-main">
        <div className="sdk-matrix-tabs" role="tablist" aria-label="Auth endpoints">
          {ENDPOINT_IDS.map((id) => {
            const selected = id === endpoint;
            
            const currentSample = framework?.samples?.[id];
            const label = currentSample
              ? (compact ? currentSample.name.replace(' Endpoint', '') : currentSample.name)
              : id;

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
          aria-label={sample?.name ?? 'Code sample'}
          dangerouslySetInnerHTML={{ __html: sample?.html ?? '' }}
        />
      </div>
    </div>
  );
}
