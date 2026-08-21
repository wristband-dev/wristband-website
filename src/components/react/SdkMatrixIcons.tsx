type IconProps = { selected: boolean };

const size = { width: 32, height: 32 };

export function NextIcon({ selected }: IconProps) {
  const fill = selected ? '#111' : '#fff';
  return (
    <svg viewBox="0 0 24 24" {...size} aria-hidden="true">
      <circle cx="12" cy="12" r="11.25" fill={fill} />
      <path
        d="M9.1 7.2h2.05l3.7 6.55V7.2H17v9.6h-2.02L11.2 10.1v6.7H9.1V7.2Z"
        fill={selected ? '#06FFC1' : '#111'}
      />
    </svg>
  );
}

export function NodeIcon({ selected }: IconProps) {
  const color = selected ? '#111' : '#8CC84B';
  return (
    <svg viewBox="0 0 32 36" width="28" height="32" aria-hidden="true">
      <path
        d="M16 2.2 29 9.6v16.8L16 33.8 3 26.4V9.6L16 2.2Z"
        fill="none"
        stroke={color}
        strokeWidth="1.85"
        strokeLinejoin="round"
      />
      <text
        x="16"
        y="22.5"
        textAnchor="middle"
        fill={color}
        fontFamily="Inter, Helvetica, Arial, sans-serif"
        fontSize="11"
        fontWeight="700"
      >
        JS
      </text>
    </svg>
  );
}

export function PythonIcon({ selected }: IconProps) {
  if (selected) {
    return (
      <svg viewBox="0 0 44 45" {...size} aria-hidden="true">
        <path
          fill="#111"
          d="M22.2 4c-7.6 0-7.1 3.3-7.1 3.3l.01 3.4h7.25v1H11.3S4 11.5 4 22.1s6.1 10.5 6.1 10.5h3.6v-5s-.2-6.1 6-6.1h10.4s5.8.1 5.8-5.6V7.8S37.2 4 22.2 4Zm-4.1 2.2a1.8 1.8 0 1 1 0 3.6 1.8 1.8 0 0 1 0-3.6Z"
        />
        <path
          fill="#111"
          d="M21.8 41c7.6 0 7.1-3.3 7.1-3.3l-.01-3.4h-7.25v-1h11.05S40 33.5 40 22.9s-6.1-10.5-6.1-10.5h-3.6v5s.2 6.1-6 6.1H13.9s-5.8-.1-5.8 5.6v7.1S6.8 41 21.8 41Zm4.1-2.2a1.8 1.8 0 1 1 0-3.6 1.8 1.8 0 0 1 0 3.6Z"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 44 45" {...size} aria-hidden="true">
      <path
        fill="#3776AB"
        d="M22.2 4c-7.6 0-7.1 3.3-7.1 3.3l.01 3.4h7.25v1H11.3S4 11.5 4 22.1s6.1 10.5 6.1 10.5h3.6v-5s-.2-6.1 6-6.1h10.4s5.8.1 5.8-5.6V7.8S37.2 4 22.2 4Zm-4.1 2.2a1.8 1.8 0 1 1 0 3.6 1.8 1.8 0 0 1 0-3.6Z"
      />
      <path
        fill="#FFD43B"
        d="M21.8 41c7.6 0 7.1-3.3 7.1-3.3l-.01-3.4h-7.25v-1h11.05S40 33.5 40 22.9s-6.1-10.5-6.1-10.5h-3.6v5s.2 6.1-6 6.1H13.9s-5.8-.1-5.8 5.6v7.1S6.8 41 21.8 41Zm4.1-2.2a1.8 1.8 0 1 1 0-3.6 1.8 1.8 0 0 1 0 3.6Z"
      />
    </svg>
  );
}

export function NestIcon({ selected }: IconProps) {
  const fill = selected ? '#111' : '#E0234E';
  return (
    <svg viewBox="0 0 24 24" {...size} aria-hidden="true">
      <path
        fill={fill}
        d="M18.08 2.37c-.3 1.02-.7 1.96-1.2 2.83C15.3 3.4 13.4 2.4 11.1 2.4 6.3 2.4 2.4 6.5 2.4 11.6c0 4.3 2.8 8 6.7 9.3-.15-.7-.2-1.45-.14-2.22.14-1.7.86-3.3 2.03-4.55-1.1.34-1.9 1.3-2.05 2.48-.06.5-.04 1 .08 1.47 1.5-1.8 3.7-2.9 6.08-2.9.5 0 1 .05 1.47.14 1.7-1.55 2.7-3.8 2.7-6.25 0-1.55-.42-3-.16-4.7.1-.62.28-1.22.52-1.8.15.55.24 1.12.24 1.7 0 .2 0 .4-.02.6 1.02-1.15 1.66-2.6 1.78-4.2C20.3 3.3 19.3 2.6 18.08 2.37Z"
      />
    </svg>
  );
}

export function DotNetIcon({ selected }: IconProps) {
  return (
    <svg viewBox="0 0 48 20" width="40" height="18" aria-hidden="true">
      <text
        x="24"
        y="15"
        textAnchor="middle"
        fontFamily="Inter, Helvetica, Arial, sans-serif"
        fontSize="13"
        fontWeight="700"
        fill={selected ? '#111' : '#fff'}
      >
        .NET
      </text>
    </svg>
  );
}
