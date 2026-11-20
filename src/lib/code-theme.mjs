// Syntax highlighting colors for code blocks, matching the dark code blocks in the Wristband docs portal (ReadMe).
// Colors were sampled from docs pages. Used by `markdown.shikiConfig` in astro.config.mjs.
//
// The docs portal colors each language a little differently, so rules are grouped:
// shared rules first, then one group per language. A language's rules end their scopes with
// its suffix (for example `.shell`), which makes them win over the shared rules for that language only.
// To match another language, sample its colors from a docs page and add a group for it.

const color = {
  background: '#2e2f30',
  text: '#ffffff',
  lavender: '#d1b4ec',
  blue: '#89aaf9',
  coral: '#e0787b',
  green: '#cae697',
  grayViolet: '#9091af',
  yellow: '#f7cc7a',
};

// Shared rules, sampled from a JavaScript/TypeScript example (expressjs-add-session-middleware).
const sharedRules = [
  { settings: { foreground: color.text } },
  {
    scope: ['comment', 'punctuation.definition.comment'],
    settings: { foreground: color.grayViolet },
  },
  {
    scope: ['keyword', 'storage', 'storage.type', 'storage.modifier', 'variable.language', 'meta.object-literal.key'],
    settings: { foreground: color.lavender },
  },
  {
    scope: ['string', 'punctuation.definition.string', 'constant.other.symbol'],
    settings: { foreground: color.green },
  },
  {
    scope: ['entity.name.function', 'support.function', 'meta.function-call entity.name.function'],
    settings: { foreground: color.coral },
  },
  {
    scope: [
      'variable',
      'variable.other.readwrite',
      'variable.other.constant',
      'entity.name.type',
      'entity.name.class',
      'support.class',
      'support.type',
      'constant.numeric',
      'constant.language',
    ],
    settings: { foreground: color.blue },
  },
  {
    scope: ['punctuation', 'meta.brace', 'keyword.operator'],
    settings: { foreground: color.text },
  },
];

// Shell (bash, sh, zsh), sampled from an install command (express install-auth-sdk):
// the command name is yellow and everything after it is plain text.
const shellRules = [
  {
    scope: ['entity.name.command.shell', 'support.function.builtin.shell'],
    settings: { foreground: color.yellow },
  },
  {
    scope: [
      'string.unquoted.argument.shell',
      'source.shell string.unquoted.argument',
      'source.shell constant.other.option',
      'constant.other.option.dash.shell',
      'constant.numeric.integer.shell',
    ],
    settings: { foreground: color.text },
  },
];

/** @type {import('shiki').ThemeRegistration} */
export const codeTheme = {
  name: 'wristband-docs',
  type: 'dark',
  colors: {
    'editor.background': color.background,
    'editor.foreground': color.text,
  },
  tokenColors: [...sharedRules, ...shellRules],
};
