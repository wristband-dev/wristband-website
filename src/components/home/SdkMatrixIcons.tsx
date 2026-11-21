type IconProps = { selected: boolean };

type IconFile = { src: string; width: number; height: number };

const ICON_DIR = '/images/sdk-matrix';

// Both versions are rendered so the selected one is already loaded when a framework is clicked.
// Each icon is shown 44px wide with its own aspect ratio, matching the live Webflow matrix.
function FrameworkIcon({ selected, icon, selectedIcon }: IconProps & { icon: IconFile; selectedIcon: IconFile }) {
  return (
    <>
      {[icon, selectedIcon].map((file) => (
        <img
          key={file.src}
          src={file.src}
          width={file.width}
          height={file.height}
          alt=""
          aria-hidden="true"
          hidden={(file === selectedIcon) !== selected}
          style={{ width: 44, height: 'auto' }}
        />
      ))}
    </>
  );
}

export function NextIcon({ selected }: IconProps) {
  return (
    <FrameworkIcon
      selected={selected}
      icon={{ src: `${ICON_DIR}/nextjs.svg`, width: 50, height: 50 }}
      selectedIcon={{ src: `${ICON_DIR}/nextjs-selected.svg`, width: 50, height: 50 }}
    />
  );
}

export function NodeIcon({ selected }: IconProps) {
  return (
    <FrameworkIcon
      selected={selected}
      icon={{ src: `${ICON_DIR}/express.svg`, width: 50, height: 54 }}
      selectedIcon={{ src: `${ICON_DIR}/express-selected.svg`, width: 50, height: 54 }}
    />
  );
}

export function PythonIcon({ selected }: IconProps) {
  return (
    <FrameworkIcon
      selected={selected}
      icon={{ src: `${ICON_DIR}/python.svg`, width: 44, height: 45 }}
      selectedIcon={{ src: `${ICON_DIR}/python-selected.svg`, width: 45, height: 45 }}
    />
  );
}

export function NestIcon({ selected }: IconProps) {
  return (
    <FrameworkIcon
      selected={selected}
      icon={{ src: `${ICON_DIR}/nestjs.svg`, width: 24, height: 24 }}
      selectedIcon={{ src: `${ICON_DIR}/nestjs-selected.svg`, width: 24, height: 24 }}
    />
  );
}

export function DotNetIcon({ selected }: IconProps) {
  return (
    <FrameworkIcon
      selected={selected}
      icon={{ src: `${ICON_DIR}/dotnet.svg`, width: 50, height: 47 }}
      selectedIcon={{ src: `${ICON_DIR}/dotnet-selected.svg`, width: 50, height: 47 }}
    />
  );
}
