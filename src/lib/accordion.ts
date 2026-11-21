// Accordion behavior shared by every accordion on the site. Runs in the browser.
// Each page owns its own markup and styles. This file only opens and closes items,
// with Webflow's timing: 200ms, easing out when opening and easing in when closing.
//
// Markup contract:
// - The clickable row has `data-accordion-trigger`.
// - Inside it, a <button> with `aria-expanded` and `aria-controls` set to the answer's id.
// - While an item is open, the clickable row has the class `is-open`, for page styles
//   such as turning the arrow over or changing the heading color.
// - Answers render open, so they stay readable without JavaScript. To avoid a flash of
//   open answers, the page's CSS should give answers `height: 0` under `.js-reveal`
//   (BaseLayout adds that class before first paint).

const DURATION_MS = 200;
const EASE_OPEN = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'; // Webflow outQuad
const EASE_CLOSE = 'cubic-bezier(0.55, 0.085, 0.68, 0.53)'; // Webflow inQuad

function setUp(trigger: HTMLElement) {
  const button = trigger.querySelector<HTMLButtonElement>('button[aria-controls]');
  const panel = button && document.getElementById(button.getAttribute('aria-controls') ?? '');
  if (!button || !panel) return;

  panel.style.overflow = 'hidden';
  panel.style.height = '0px';
  button.setAttribute('aria-expanded', 'false');
  trigger.classList.remove('is-open');

  trigger.addEventListener('click', () => {
    const open = button.getAttribute('aria-expanded') !== 'true';
    button.setAttribute('aria-expanded', String(open));
    trigger.classList.toggle('is-open', open);

    const from = panel.getBoundingClientRect().height;
    const to = open ? panel.scrollHeight : 0;
    panel.getAnimations().forEach((animation) => animation.cancel());
    // An open answer keeps an automatic height, so it still fits if the window is resized.
    panel.style.height = open ? 'auto' : '0px';
    panel.animate([{ height: `${from}px` }, { height: `${to}px` }], {
      duration: DURATION_MS,
      easing: open ? EASE_OPEN : EASE_CLOSE,
    });
  });
}

/** Wires up every accordion item on the page that is not set up yet. */
export function initAccordions() {
  for (const trigger of document.querySelectorAll<HTMLElement>('[data-accordion-trigger]')) {
    if (trigger.dataset.accordionReady) continue;
    trigger.dataset.accordionReady = 'true';
    setUp(trigger);
  }
}
