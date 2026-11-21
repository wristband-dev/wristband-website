import { useRef, useState, type TouchEvent } from 'react';
import kaiRusso from '../../assets/testimonials/kai-russo.jpg';
import intesarMohammed from '../../assets/testimonials/intesar-mohammed.jpeg';
import nithinMummaneni from '../../assets/testimonials/nithin-mummaneni.webp';
import chrisLawson from '../../assets/testimonials/chris-lawson.jpeg';
import arrowLeft from '../../assets/home/arrow-left.svg';
import arrowRight from '../../assets/home/arrow-right.svg';
import './Testimonials.css';

// The home page's testimonial slider. Matches live Webflow: one quote at a time, arrows on both sides,
// a 500ms slide that keeps going the same way when it wraps from the last quote to the first.
// Every quote is in the HTML. Swiping works on touch screens.

type ImageSource = { src: string; width: number; height: number };

interface Testimonial {
  /** The quote in three parts: text before the highlight, the highlighted phrase, text after it. */
  quote: [string, string, string];
  name: string;
  title: string;
  image: ImageSource;
  alt: string;
}

const testimonials: Testimonial[] = [
  {
    quote: [
      'Switching over from a competing auth provider to Wristband was a breeze! We were ',
      'up and running in an afternoon',
      ' with all the bells and whistles. And their support is outstanding whenever we have any questions. By trusting the folks at Wristband with the security of our app, we\u2019re able to spend more time building the product we love and advancing our mission!',
    ],
    name: 'Kai Russo',
    title: 'Founding Engineer at CuroWork',
    image: kaiRusso,
    alt: 'kai-russo-curowork',
  },
  {
    quote: [
      'As an API automation platform for startups and enterprises alike, security is critical for us. We rely on Wristband to handle all ',
      'machine authentication and authorization across our microservices',
      ", ensuring each service remains secure. Their low-code platform delivers enterprise-grade security effortlessly, and we're looking forward to moving our user authentication to them, too.",
    ],
    name: 'Intesar Mohammed',
    title: 'Co-Founder & CEO at PerfAI',
    image: intesarMohammed,
    alt: 'intesar-mohammed-perfai',
  },
  {
    quote: [
      "We serve enterprise customers, so having reliable and scalable authentication is non-negotiable. Wristband's multi-tenant auth was exactly what we needed. Their hands-on support guided us through a quick and smooth integration, and ",
      'onboarding new customers is easy',
      '. We highly recommend Wristband to anyone looking for an authentication solution that just works.',
    ],
    name: 'Nithin Mummaneni',
    title: 'Founder and CEO at Infinity Loop',
    image: nithinMummaneni,
    alt: 'nithin-infinity-loop',
  },
  {
    quote: [
      'Wristband has been our ideal authentication partner to support our customers quickly. Their B2B multi-tenant auth system is secure, easy to integrate, and affordable. The ',
      'flexibility and robust security have streamlined our operations',
      ', and their responsive support is amazing. We highly recommend Wristband for any business needing a dependable, cost-effective authentication solution.',
    ],
    name: 'Chris Lawson',
    title: 'Co-Founder and Engineering Lead at GreenSight',
    image: chrisLawson,
    alt: 'chris-lawson-greensight',
  },
];

const SLIDE_MS = 500;
const SWIPE_MIN_PX = 40;
const count = testimonials.length;

/**
 * Where each quote sits relative to the visible one, in slide widths: 0 is showing, 1 is next to the right,
 * -1 is just off to the left. The range runs from -1 to count - 2, so both neighbors are always in place.
 */
function offsetsFor(current: number) {
  return testimonials.map((_, index) => ((index - current + count + 1) % count) - 1);
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const previousOffsets = useRef(offsetsFor(0));
  const touchStartX = useRef<number | null>(null);

  const offsets = offsetsFor(current);
  // Only quotes moving one place animate. Quotes that jump from one end to the other move while off screen.
  const animates = offsets.map((offset, index) => Math.abs(offset - previousOffsets.current[index]) === 1);
  previousOffsets.current = offsets;

  const go = (step: number) => setCurrent((index) => (index + step + count) % count);

  const onTouchStart = (event: TouchEvent) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (event: TouchEvent) => {
    if (touchStartX.current === null) return;
    const distance = (event.changedTouches[0]?.clientX ?? touchStartX.current) - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(distance) >= SWIPE_MIN_PX) go(distance < 0 ? 1 : -1);
  };

  return (
    <div className="testimonials" role="region" aria-roledescription="carousel" aria-label="Customer testimonials">
      <div className="testimonials__mask" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        {testimonials.map((testimonial, index) => (
          <div
            key={testimonial.name}
            className="testimonials__slide"
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${count}`}
            aria-hidden={index !== current}
            style={{
              transform: `translateX(${(offsets[index] - index) * 100}%)`,
              transition: animates[index] ? `transform ${SLIDE_MS}ms ease` : 'none',
            }}
          >
            <div className="testimonials__photo">
              <div className="testimonials__photo-frame">
                <img
                  className="testimonials__photo-image"
                  src={testimonial.image.src}
                  width={120}
                  height={Math.round((120 * testimonial.image.height) / testimonial.image.width)}
                  alt={testimonial.alt}
                  loading="lazy"
                />
              </div>
            </div>
            <p className="testimonials__quote">
              <span className="testimonials__mark testimonials__mark--open">{'\u201c'}</span>
              {testimonial.quote[0]}
              <span className="testimonials__highlight">{testimonial.quote[1]}</span>
              {testimonial.quote[2]}
              <span className="testimonials__mark testimonials__mark--close">{'\u201d'}</span>
            </p>
            <div className="testimonials__name">{testimonial.name}</div>
            <div className="testimonials__title">{testimonial.title}</div>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="testimonials__arrow testimonials__arrow--previous"
        aria-label="Previous testimonial"
        onClick={() => go(-1)}
      >
        <span className="testimonials__arrow-circle">
          <img src={arrowLeft.src} width={12} alt="" />
        </span>
      </button>
      <button
        type="button"
        className="testimonials__arrow testimonials__arrow--next"
        aria-label="Next testimonial"
        onClick={() => go(1)}
      >
        <span className="testimonials__arrow-circle">
          <img src={arrowRight.src} width={12} alt="" />
        </span>
      </button>
    </div>
  );
}
